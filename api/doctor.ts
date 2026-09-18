// Vercel Serverless Function: POST /api/doctor & /api/ai/doctor
import { GoogleGenAI } from '@google/genai';

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      genAIClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build-vercel',
          },
        },
      });
    }
  }
  return genAIClient;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { category = 'human', symptoms, imageBase64, mimeType = 'image/jpeg', language = 'english' } = req.body || {};

  if (!symptoms && !imageBase64) {
    res.status(400).json({ error: 'Either symptoms description or an image is required.' });
    return;
  }

  const ai = getGenAI();

  if (ai) {
    try {
      const prompt = `You are the expert Multi-Species Diagnostic & Care Assistant for WOMENE AI Doctor.
Diagnostic Category: ${category} (Allowed: human, animal, bird, plant, crop, soil).
Language: ${language}.
Symptoms / Query: ${symptoms || 'Visual examination only'}

Provide a structured 5-Path analysis in JSON format:
{
  "conditionName": "Brief likely condition or finding",
  "severity": "mild" | "moderate" | "urgent",
  "modernMedicine": "Evidence-based allopathic / standard protocol",
  "genericMeds": "Low-cost Jan Aushadhi or generic options",
  "homeRemedies": "Natural household / traditional relief",
  "ayurvedaOrEvm": "Ayurveda / Ethno-Veterinary / Organic input",
  "agronomyOrDiet": "Dietary, lifestyle or soil/crop management step",
  "disclaimer": "Informational triage only. Consult certified professional."
}`;

      let parts: any[] = [{ text: prompt }];

      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
        parts.push({
          inlineData: {
            mimeType,
            data: cleanBase64,
          },
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: parts,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.status(200).json({
        success: true,
        category,
        analysis: parsed,
      });
      return;
    } catch (err: any) {
      console.warn('AI Doctor Vercel function fallback:', err?.message);
    }
  }

  // Graceful structured fallback
  res.status(200).json({
    success: true,
    category,
    analysis: {
      conditionName: `Primary Assessment for ${category}`,
      severity: 'moderate',
      modernMedicine: 'Consult primary healthcare provider or local veterinary/agri extension officer.',
      genericMeds: 'Available at government Jan Aushadhi Kendras or local cooperative stores.',
      homeRemedies: 'Rest, hydration, and observation for 24-48 hours.',
      ayurvedaOrEvm: 'Herbal supportive care and traditional decoction (Kashayam / EVM).',
      agronomyOrDiet: 'Nutritious light diet, clean drinking water, and safe isolation if contagious.',
      disclaimer: 'Informational analysis. In emergency, call 108/112 or local hospital immediately.',
    },
  });
}
