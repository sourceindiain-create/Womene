// Vercel Serverless Function: POST /api/chat & /api/ai/chat
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

  const { message, language = 'english' } = req.body || {};
  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const ai = getGenAI();

  if (ai) {
    try {
      const prompt = `You are the empathetic, helpful, and culturally respectful AI Assistant for WOMENE (Women-Led Community Care & Human-Support Network).
Motto: "People Near You. Always."
Services: Elder care, Food services, Travel companion, Baby care, Personal care, Village marketplace, Multi-Species AI Doctor (human, animal, bird, plant, crop, soil).
Official Helpline: 7989997015 (WhatsApp/Call).
Language requested: ${language}.
User question: ${message}
Reply helpfully, warmly, concisely, and with practical guidance.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.status(200).json({
        reply: response.text || 'Thank you for reaching out to WOMENE. How may we assist you today?',
        source: 'Gemini 2.5 Serverless Engine',
      });
      return;
    } catch (err: any) {
      console.warn('Vercel Gemini invocation failed, returning fallback:', err?.message);
    }
  }

  // Graceful fallback when GEMINI_API_KEY is not configured
  const isTelugu = language === 'te' || language === 'telugu';
  const isHindi = language === 'hi' || language === 'hindi';

  const fallback = isTelugu
    ? 'నమస్కారం! WOMENE సేవలకు స్వాగతం. మేము వృద్ధుల సంరక్షణ, ఇంటి భోజనం, ప్రయాణ తోడు, శిశు సంరక్షణ మరియు ఉచిత AI డాక్టర్ సేవలను అందిస్తున్నాము. బుకింగ్ కోసం వాట్సాప్ 7989997015 కు సంప్రదించవచ్చు.'
    : isHindi
    ? 'नमस्ते! WOMENE में आपका स्वागत है। हम बुजुर्गों की देखभाल, घर का शुद्ध भोजन, यात्रा साथी और बहु-प्रजाति AI डॉक्टर सेवाएं प्रदान करते हैं। बुकिंग हेतु व्हाट्सएप 7989997015 पर संपर्क करें।'
    : 'Hello! Welcome to WOMENE - People Near You. Always. We provide elder care, home-cooked meal subscriptions, travel companionship, and 24/7 AI health support. For direct booking, reach our helpline at +91 79899 97015.';

  res.status(200).json({
    reply: fallback,
    source: 'WOMENE Knowledge Engine',
  });
}
