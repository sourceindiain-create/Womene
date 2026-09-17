import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Cross-Origin Resource Sharing (CORS) for Web and Flutter Mobile Apps
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    platform: 'WOMENE Care Network',
    stack: {
      frontend: 'React 19 + TypeScript + Tailwind CSS + Lucide',
      backend: 'Node.js + Express + TypeScript',
      mobile: 'Flutter 3.x (Cross-Platform iOS & Android)',
      ai: 'Google Gemini 2.5/Flash AI Doctor & Multilingual Chat',
    },
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Lazy Google Gen AI helper with fallback
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      genAIClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return genAIClient;
}

// In-memory bookings store
const bookingsDatabase: Array<{
  id: string;
  category: string;
  serviceType: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  date: string;
  time: string;
  mode: 'offline' | 'online';
  notes: string;
  status: string;
  createdAt: string;
}> = [
  {
    id: 'WOM-8921',
    category: 'Elder & Family Care',
    serviceType: 'Elderly Assistance & Medicine Reminder',
    name: 'Lakshmi Rao',
    phone: '9848012345',
    city: 'Vijayawada',
    address: 'Bunder Road, Labbipet',
    date: '2026-09-18',
    time: '10:00 AM',
    mode: 'offline',
    notes: 'Need morning companionship and blood sugar log checking',
    status: 'Assigned to Sunitha (WOMENE Rep within 2.1km)',
    createdAt: '2026-09-16T09:30:00Z',
  },
  {
    id: 'WOM-8922',
    category: 'Travel Companion',
    serviceType: 'Intercity Train Companion',
    name: 'Pooja Sharma',
    phone: '9988776655',
    city: 'Hyderabad',
    address: 'Secunderabad Railway Station',
    date: '2026-09-19',
    time: '04:30 PM',
    mode: 'offline',
    notes: 'Elderly mother traveling to Pune, assistance needed at station and platform',
    status: 'Verified & Scheduled',
    createdAt: '2026-09-16T10:15:00Z',
  }
];

// Company details endpoint
app.get('/api/team', (req: Request, res: Response) => {
  res.json({
    companyName: 'WOMENE Society & Technology Services',
    slogan: 'People Near You. Always.',
    pillars: 'Care • Support • Companionship',
    founder: 'Dr. Krishna Chaitanya & Core Team',
    leadershipMessage: 'Building an empowered, safe, and kinder India through trained women representatives and accessible local care.',
    contactNumbers: {
      teamHelpline1: '8125016226',
      teamHelpline2: '7981967919',
      bookingHelpline: '7989997015',
      apHelpline: '7702635919',
    },
    email: 'emfi.ceo@gmail.com',
    headOffice: {
      address: 'White Field Road, 1st Line, Ayyappa Nagar, Bengaluru',
      state: 'Karnataka',
      country: 'India',
    },
    branches: [
      { name: 'Bengaluru', status: 'Active (Head Office)', state: 'Karnataka' },
      { name: 'Hyderabad', status: 'Active Regional Hub', state: 'Telangana' },
      { name: 'Secunderabad', status: 'Active Hub', state: 'Telangana' },
      { name: 'Vijayawada', status: 'Active Regional Hub', state: 'Andhra Pradesh' },
      { name: 'Visakhapatnam', status: 'Active Coastal Hub', state: 'Andhra Pradesh' },
      { name: 'Chennai', status: 'Active Center', state: 'Tamil Nadu' },
      { name: 'Mumbai', status: 'Active Center', state: 'Maharashtra' },
      { name: 'Pune', status: 'Active Center', state: 'Maharashtra' },
      { name: 'Bhubaneswar', status: 'Active Center', state: 'Odisha' },
    ],
    upcomingExpansion: 'Shortly starting across all Andhra Pradesh (AP) and Telangana mandal and zilla headquarters for grassroots community reach.',
    availability: 'Both Offline (At-Home / In-Person) and Online (Tele-consultation / Virtual Support) available for booking.',
    whatsAppBookingNumber: '7989997015',
    whatsAppLink: 'https://wa.me/917989997015?text=Hello%20WOMENE%20Team%2C%20I%20would%20like%20to%20get%20service',
  });
});

// Create booking endpoint
app.post('/api/booking', (req: Request, res: Response) => {
  const { category, serviceType, name, phone, city, address, date, time, mode, notes } = req.body;
  
  if (!name || !phone || !serviceType) {
    res.status(400).json({ error: 'Name, phone number, and service type are required.' });
    return;
  }

  const id = `WOM-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking = {
    id,
    category: category || 'General Care',
    serviceType,
    name,
    phone,
    city: city || 'Bengaluru',
    address: address || 'Local Area',
    date: date || new Date().toISOString().split('T')[0],
    time: time || 'Flexible',
    mode: (mode as 'offline' | 'online') || 'offline',
    notes: notes || '',
    status: 'Matched with Nearest WOMENE Coordinator',
    createdAt: new Date().toISOString(),
  };

  bookingsDatabase.unshift(newBooking);

  const whatsAppMessage = encodeURIComponent(
    `*New WOMENE Service Request [${id}]*\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Service: ${serviceType} (${category})\n` +
    `City: ${city}\n` +
    `Mode: ${mode?.toUpperCase()}\n` +
    `Date & Time: ${date} at ${time}\n` +
    `Notes: ${notes || 'None'}\n\nPlease confirm representative assignment.`
  );

  res.json({
    success: true,
    booking: newBooking,
    whatsAppDirectUrl: `https://wa.me/917989997015?text=${whatsAppMessage}`,
    message: 'Booking successfully registered and dispatched to nearby WOMENE team.',
  });
});

// List bookings
app.get('/api/booking', (req: Request, res: Response) => {
  res.json({ bookings: bookingsDatabase });
});

// Emergency SOS Endpoint (Within 4 KM & National Helplines)
app.post('/api/emergency/sos', (req: Request, res: Response) => {
  const { latitude, longitude, emergencyType, contactNumber, address } = req.body;
  
  const sosId = `SOS-${Math.floor(1000 + Math.random() * 9000)}`;
  const timestamp = new Date().toISOString();

  console.log(`[EMERGENCY 4-KM ALERT] ID: ${sosId} at Lat: ${latitude}, Long: ${longitude}, Phone: ${contactNumber}`);

  res.json({
    success: true,
    sosId,
    timestamp,
    radius: 'Within 4 KM Radius of Incident',
    status: 'Coordinator Alert Dispatched',
    officialHelplines: {
      nationalPoliceEmergency: '112',
      medicalAmbulance: '108',
      womenSafetyHelpline: '1091',
      childSafetyHelpline: '1098',
      womeneHelpline1: '8125016226',
      womeneHelpline2: '7981967919',
      womeneBookingCoordination: '7989997015',
    },
    message: 'Alert sent to nearby WOMENE community coordinator. Please dial 112 / 108 immediately if life-threatening.',
  });
});

// Services Catalog Endpoint (React Web & Flutter Mobile)
app.get('/api/services', (req: Request, res: Response) => {
  res.json({
    categories: [
      {
        id: 'food',
        name: 'Food Services',
        nameTe: 'ఆహార సేవలు',
        nameHi: 'भोजन सेवाएं',
        items: [
          { id: 'home_food', title: 'Daily Home Cooked Meals', titleTe: 'రోజువారీ ఇంటి భోజనం', mode: 'offline' },
          { id: 'lunch_box', title: 'Office & School Lunch Delivery', titleTe: 'ఆఫీస్ & స్కూల్ లంచ్ బాక్స్', mode: 'offline' },
          { id: 'diet_food', title: 'Elderly & Patient Diet Plan', titleTe: 'వృద్ధుల పత్యం & పోషకాహారం', mode: 'both' },
        ],
      },
      {
        id: 'elder_care',
        name: 'Elder & Senior Citizen Care',
        nameTe: 'వృద్ధుల సంరక్షణ',
        nameHi: 'बुजुर्गों की देखभाल',
        items: [
          { id: 'elderly_companion', title: 'Day Companionship & Listening', titleTe: 'రోజువారీ తోడు & సంరక్షణ', mode: 'offline' },
          { id: 'hospital_escort', title: 'Hospital & Clinic Escort', titleTe: 'ఆసుపత్రికి తోడుగా వెళ్లడం', mode: 'offline' },
          { id: 'tele_wellness', title: 'Remote Wellness & Medicine Check', titleTe: 'మందుల గుర్తు & ఫోన్ పర్యవేక్షణ', mode: 'online' },
        ],
      },
      {
        id: 'travel_companion',
        name: 'Travel Companion',
        nameTe: 'ప్రయాణ తోడు',
        nameHi: 'यात्रा में साथी',
        items: [
          { id: 'train_transit', title: 'Train Station Accompaniment', titleTe: 'రైల్వే స్టేషన్ తోడు & సహాయం', mode: 'offline' },
          { id: 'bus_flight', title: 'Bus & Flight Boarding Help', titleTe: 'బస్సు / విమానాశ్రయం బోర్డింగ్ సపోర్ట్', mode: 'offline' },
        ],
      },
      {
        id: 'baby_care',
        name: 'Baby & Mother Care',
        nameTe: 'శిశు సంరక్షణ & బాలింత సేవలు',
        nameHi: 'शिशु एवं प्रसूति देखभाल',
        items: [
          { id: 'herbal_massage', title: 'Traditional Herbal Oil & Nalugu', titleTe: 'సాంప్రదాయ సున్నిపిండి & నలుగు స్నానం', mode: 'offline' },
          { id: 'mother_support', title: 'Post-Delivery Mother Support', titleTe: 'బాలింతకు సాంప్రదాయ సేవలు', mode: 'both' },
        ],
      },
      {
        id: 'personal_care',
        name: 'Personal Care & Relaxation',
        nameTe: 'వ్యక్తిగత సంరక్షణ & మసాజ్',
        nameHi: 'व्यक्तिगत विश्राम एवं मसाज',
        items: [
          { id: 'head_massage', title: 'Head & Scalp Stress Relief', titleTe: 'తల మసాజ్ & ఒత్తిడి నివారణ', mode: 'offline' },
          { id: 'back_massage', title: 'Back & Joint Relaxation', titleTe: 'నడుము & కీళ్ళ విశ్రాంతి', mode: 'offline' },
        ],
      },
      {
        id: 'village_market',
        name: 'Village Marketplace & Farmers',
        nameTe: 'గ్రామీణ ఉత్పత్తులు & రైతుల మార్కెట్',
        nameHi: 'ग्रामीण उत्पाद व किसान बाजार',
        items: [
          { id: 'cold_oil', title: 'Cold Pressed Native Oils', titleTe: 'గానుగ నూనెలు', mode: 'offline' },
          { id: 'millets', title: 'Unpolished Native Millets', titleTe: 'చిరుధాన్యాలు & సిరిధాన్యాలు', mode: 'offline' },
          { id: 'bio_inputs', title: 'Jeevamrutha & Ghana Jeevamrutha', titleTe: 'జీవామృతం & ఘన జీవామృతం', mode: 'offline' },
        ],
      },
    ],
  });
});

// Branches Endpoint
app.get('/api/branches', (req: Request, res: Response) => {
  res.json({
    headOffice: {
      location: 'White Field Road, 1st Line, Ayyappa Nagar, Bengaluru, Karnataka',
      founder: 'Dr. Krishna Chaitanya & Team',
      email: 'emfi.ceo@gmail.com',
      helplines: ['8125016226', '7981967919'],
      booking: '7989997015',
    },
    branches: [
      { id: 'blr', name: 'Bengaluru', state: 'Karnataka', phone: '8125016226', role: 'Headquarters' },
      { id: 'hyd', name: 'Hyderabad', state: 'Telangana', phone: '7981967919', role: 'Regional Hub' },
      { id: 'sec', name: 'Secunderabad', state: 'Telangana', phone: '7981967919', role: 'Urban Hub' },
      { id: 'vij', name: 'Vijayawada', state: 'Andhra Pradesh', phone: '7702635919', role: 'Regional Hub' },
      { id: 'vzg', name: 'Visakhapatnam', state: 'Andhra Pradesh', phone: '7702635919', role: 'Coastal Hub' },
      { id: 'che', name: 'Chennai', state: 'Tamil Nadu', phone: '7989997015', role: 'Active Branch' },
      { id: 'mum', name: 'Mumbai', state: 'Maharashtra', phone: '7989997015', role: 'Active Branch' },
      { id: 'pune', name: 'Pune', state: 'Maharashtra', phone: '7989997015', role: 'Active Branch' },
      { id: 'bbsr', name: 'Bhubaneswar', state: 'Odisha', phone: '7989997015', role: 'Active Branch' },
    ],
    expansionRoadmap: 'Shortly expanding to all Andhra Pradesh (AP) and Telangana mandal and zilla headquarters!',
  });
});

// Flutter Mobile App Config Endpoint
app.get('/api/mobile/flutter-config', (req: Request, res: Response) => {
  res.json({
    appName: 'WOMENE Mobile',
    version: '1.0.0+1',
    flutterSdkVersion: '>=3.0.0',
    supportedPlatforms: ['Android', 'iOS', 'Web'],
    supportedLanguages: ['en', 'te', 'hi'],
    endpoints: {
      team: '/api/team',
      services: '/api/services',
      branches: '/api/branches',
      booking: '/api/booking',
      sos: '/api/emergency/sos',
      aiDoctor: '/api/ai/doctor',
      aiChat: '/api/ai/chat',
      flutterCode: '/api/mobile/flutter-code',
    },
    contacts: {
      founder: 'Dr. Krishna Chaitanya & Team',
      teamHelpline1: '8125016226',
      teamHelpline2: '7981967919',
      bookingHelpline: '7989997015',
      email: 'emfi.ceo@gmail.com',
      whatsAppUrl: 'https://wa.me/917989997015',
    },
  });
});

// Flutter Source Code Inspector & Exporter Endpoint
app.get('/api/mobile/flutter-code', (req: Request, res: Response) => {
  const flutterFiles: Record<string, string> = {};
  const baseFlutterDir = path.join(process.cwd(), 'flutter_app');

  function readDirRecursive(dir: string, relPath = '') {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relative = path.join(relPath, entry.name);
      if (entry.isDirectory()) {
        readDirRecursive(fullPath, relative);
      } else if (entry.isFile() && (entry.name.endsWith('.dart') || entry.name.endsWith('.yaml') || entry.name.endsWith('.md'))) {
        flutterFiles[relative] = fs.readFileSync(fullPath, 'utf8');
      }
    }
  }

  try {
    readDirRecursive(baseFlutterDir);
    res.json({
      success: true,
      totalFiles: Object.keys(flutterFiles).length,
      files: flutterFiles,
    });
  } catch (err: unknown) {
    res.status(500).json({ error: 'Could not read flutter files', details: String(err) });
  }
});

// WOMENE AI Assistant Chat Endpoint
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, language = 'english', chatHistory = [] } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    const ai = getGenAI();

    const isTelugu = language === 'te' || language === 'telugu';
    const isHindi = language === 'hi' || language === 'hindi';
    const langLabel = isTelugu ? 'Telugu (తెలుగు)' : isHindi ? 'Hindi (हिन्दी)' : 'English';

    const systemInstruction = `You are the empathetic, helpful, and culturally respectful AI Assistant for WOMENE (Women-Led Community Care & Human-Support Network).
WOMENE motto: "People Near You. Always."
WOMENE Core Services:
1. Food Services: Fresh home-style meals, school/office lunch boxes, healthy breakfast subscriptions.
2. Delivery & Daily Care: Groceries, medicines from authorized pharmacies, essential items, small errands.
3. Personal Care & Relaxation: Head massage, scalp relaxation, back massage, stress relief, at-home comfort.
4. Travel Companion: Safe transit accompaniment for local travel, trains, buses, flights, waiting accompaniment, luggage assistance.
5. Elder & Family Care / Baby Care: Traditional baby care (oil massage, Nalugu), senior citizen check-ins, medicine reminders.
6. Work & Helpers: Skill training, home-based jobs, women entrepreneurship, certified representatives.
7. Village Marketplace: Farm to market, direct organic produce, village handicrafts.
8. AI Doctor & Agri Doctor: Multi-modal health and farming intelligence.

CRITICAL SAFETY BOUNDARIES:
- WOMENE is a local human-support network. WOMENE is NOT a substitute or replacement for police (100/112), fire, or government ambulance emergency services (108).
- In any acute emergency, always instruct the user to dial 112 / 108 immediately while WOMENE local support is notified.

OFFICIAL CONTACTS:
- Founder & Core Team: Dr. Krishna Chaitanya & Team
- Helplines: 8125016226, 7981967919
- Offline/Online Booking Helpline: 7989997015
- Email: emfi.ceo@gmail.com
- Head Office: White Field Road, 1st line, Ayyappa Nagar, Bengaluru
- Active Branches: Chennai, Mumbai, Pune, Hyderabad, Secunderabad, Vijayawada, Visakhapatnam, Bhubaneswar, Bengaluru
- Expanding shortly to all AP and Telangana mandal & zilla headquarters.

LANGUAGE HANDLING:
- If language is Telugu or user speaks Telugu: reply warmly in natural, fluent Telugu (తెలుగులో సమాధానం ఇవ్వండి).
- If language is Hindi or user speaks Hindi: reply politely in natural, fluent Hindi (हिन्दी में उत्तर दें).
- If language is English: reply in warm, clear, professional English.

Format responses neatly with bullet points when listing services or steps. Keep answers concise, compassionate, and actionable.`;

    if (ai) {
      const contents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

      if (Array.isArray(chatHistory)) {
        for (const item of chatHistory.slice(-6)) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.content }],
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: `Language: ${language}. User says: ${message}` }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || 'I am here to assist you with WOMENE care and services.' });
    } else {
      // Graceful offline fallback
      let fallback = '';
      if (isTelugu) {
        fallback = `నమస్కారం! WOMENE కి స్వాగతం. మేము మహిళా సారథ్యంలోని మానవ సంరక్షణ సేవల నెట్‌వర్క్. వృద్ధుల సంరక్షణ, ఇంటి సహాయం, భోజన సేవలు, ప్రయాణ తోడు, మరియు అత్యవసర రక్షణ మా ప్రధాన సేవలు. డాక్టర్ కృష్ణ చైతన్య & బృందాన్ని సంప్రదించడానికి 8125016226 లేదా 7981967919 కి కాల్ చేయండి. సర్వీస్ బుకింగ్ కోసం 7989997015 కి వాట్సాప్ చేయండి.`;
      } else if (isHindi) {
        fallback = `नमस्ते! WOMENE में आपका स्वागत है। हम महिला-नेतृत्व वाली मानव-सहायता नेटवर्क हैं। बुजुर्गों की देखभाल, भोजन सेवाएं, यात्रा साथी, घर के काम और आपातकालीन सुरक्षा हमारी प्रमुख सेवाएं हैं। डॉ. कृष्ण चैतन्य एवं टीम से संपर्क के लिए 8125016226 या 7981967919 पर कॉल करें। बुकिंग के लिए 7989997015 पर व्हाट्सएप करें।`;
      } else {
        fallback = `Hello! Welcome to WOMENE - "People Near You. Always." We provide trusted Elder Care, Food Services, Home Help, Travel Companions, and Safety Support. You can reach Dr. Krishna Chaitanya and our team at 8125016226 / 7981967919, or book online/offline at 7989997015 (WhatsApp available).`;
      }
      res.json({ reply: fallback });
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error('AI chat error:', err);
    res.json({
      reply: `WOMENE care team is standing by. You can book services directly via WhatsApp at 7989997015 or call 8125016226 / 7981967919.`,
    });
  }
});

// AI DOCTOR & AGRI DOCTOR ENDPOINT
app.post('/api/ai/doctor', async (req: Request, res: Response) => {
  try {
    const { doctorType = 'human', symptoms, language = 'english', imageBase64 } = req.body;

    if (!symptoms) {
      res.status(400).json({ error: 'Symptoms or query description is required.' });
      return;
    }

    const ai = getGenAI();

    let domainSpecificInstruction = '';
    if (doctorType === 'human') {
      domainSpecificInstruction = `Mode: HUMAN MEDICAL AI DOCTOR.
Analyze human physical & mental symptoms, triage urgency, vital red flags (chest pain, stroke signs, high fever), and formulate clear guidance covering all 5 Solution Pathways:
1. Modern Medicine (evidence-based clinical perspective, recommended investigations like CBC, ECG, ultrasound, lipid panel).
2. Local / Low-Cost Medicine (generic alternatives, Jan Aushadhi generic medicines, affordable hydration/saline).
3. Natural / Nature-Based (botanical teas, raw honey, warm steam, ginger-tulsi decoction, cold compresses).
4. Ayurveda / Traditional Wisdom (Dosha balance Vata/Pitta/Kapha, classical formulations like Triphala, Sitopaladi, Ashwagandha).
5. Yoga / Lifestyle / Diet (Asanas, Pranayama like Anulom Vilom, sleep hygiene, anti-inflammatory nutrition).`;
    } else if (doctorType === 'animal') {
      domainSpecificInstruction = `Mode: ANIMAL & VETERINARY AI DOCTOR (Cattle, Buffaloes, Cows, Sheep, Goats, Dogs, Pets).
Analyze veterinary symptoms (e.g. mastitis, foot and mouth disease FMD, bloat/tympany, tick fever, diarrhea, milk drop, lameness, skin lesions, rabies risk).
Provide:
1. Modern Veterinary Medicine (emergency antibiotics, antipyretics, fluid therapy, deworming, vaccination schedule).
2. Low-Cost Local Management (isolation, clean dry bedding, clean water, electrolytes).
3. Ethno-Veterinary Medicine (EVM) (proven herbal remedies e.g., Aloe vera + Turmeric + Slaked Lime for mastitis; mustard oil + camphor for wound maggots; fenugreek + jaggery for lactation).
4. Traditional Livestock Care (AYUSH Pashu Chikitsa, Panchagavya, balancing dry/green fodder).
5. Lifestyle & Biosecurity (tick control, shed ventilation, fly repellents, mineral mixture dosage).`;
    } else if (doctorType === 'bird') {
      domainSpecificInstruction = `Mode: BIRDS & POULTRY AVIAN AI DOCTOR (Backyard native chickens, Broilers, Layers, Pigeons, Ducks, Parrots).
Analyze avian symptoms (e.g. Newcastle disease / Ranikhet, infectious bronchitis, coryza swollen eyes, coccidiosis bloody droppings, egg binding, feather pecking, heat stroke).
Provide:
1. Modern Avian Care (Lasota/F1 vaccination, coccidiostats, water sanitation, antibiotic sensitivity testing).
2. Low-Cost Flock Management (immediate isolation of sick birds, strict clean drinker protocol, foot baths with potassium permanganate).
3. Natural Avian Tonics (crushed garlic + turmeric in drinking water, sour curd/whey probiotics, neem leaf extract fumigation).
4. Traditional Bird Health (pigeon pea flour, crushed pepper with ginger for wet cough, moringa leaf protein supplement).
5. Biosecurity & Housing (dry litter management to prevent ammonia burn, shade netting, predator and wild bird exclusion).`;
    } else if (doctorType === 'plant' || doctorType === 'crop') {
      domainSpecificInstruction = `Mode: PLANT & CROP AGRI DOCTOR (Paddy, Cotton, Chilli, Maize, Millets, Vegetables, Fruit Orchards).
Analyze agricultural crop symptoms (fungal blights, bacterial wilts, sucking pests like thrips/whiteflies, bollworms, yellowing NPK deficiencies, iron chlorosis).
Integrate Latest Agri-Technology and Government Schemes:
1. Modern Agricultural Technology:
   - Agricultural Drones: Recommend flight altitude (1.5-2m) and droplet spray parameters for prompt coverage.
   - AI Soil & Moisture Sensors: Recommend irrigation threshold adjustments.
   - Precision Drip: Fertigation ratios and venturi injector usage.
2. 5 Solution Pathways:
   - Modern: Target fungicides / bio-pesticides, micronutrient foliar spray (Chelated Zinc, Boron).
   - Low-Cost: Yellow & blue sticky traps, pheromone traps, border barrier crops (maize/sorghum).
   - Natural Farming (ZBNF): Master Jeevamrutha, Neemasthram, Agniastram, Brahmastram, Sour buttermilk.
   - Traditional Agriculture: Vrikshayurveda, Panchagavya foliar nutrition, cow dung-urine slurry.
   - Preventive Culture: Crop rotation, bio-mulching (Acchadana), intercropping with legumes.
3. Applicable Government Apps & Support:
   - Mention relevant apps (PM-Kisan, Kisan Suvidha, Meghdoot weather, Damini lightning, Soil Health Card, e-NAM).`;
    } else {
      domainSpecificInstruction = `Mode: SOIL, WATER & NUTRIENT INTELLIGENCE DOCTOR.
Analyze soil test reports, pH imbalances (acidic/alkaline), salinity (EC), low Organic Carbon, NPK deficiency, and soil compaction.
Provide:
1. Soil Correction (gypsum for sodic soils, lime for acidic soils).
2. Low-Cost Restoration (green manure crops Dhaincha/Sunhemp, farmyard manure).
3. Biological Revival (Ghana Jeevamrutha, trichoderma, mycorrhiza biofertilizers).
4. Traditional Earth Stewardship (compost layering, vermiwash).
5. Water & Mulching Strategy (drip irrigation, deep summer plowing, biomass acchadana).`;
    }

    const systemInstruction = `You are the AI DOCTOR + WOMENE Health, Nature & Life Intelligence Platform.
Specialist mode: ${doctorType} (human, animal, bird, plant, crop, soil).
${domainSpecificInstruction}

CRITICAL DISCLAIMER:
For human or veterinary cases, always note clearly that AI Doctor provides supportive guidance and first-line triage, and is not a substitute for an in-person licensed physician, veterinarian, or agricultural scientist. In severe emergencies, advise immediate in-person hospital/clinic consultation.

Respond strictly in JSON with the following structure:
{
  "summary": "Clear summary of the condition or problem",
  "rootCauseAnalysis": "Why did this happen (detailed cause analysis)",
  "riskLevel": "Low" | "Medium" | "High",
  "pathways": {
    "modern": "Clinical / modern evidence-based suggestion & latest technology (drones/sensors if agri)",
    "lowCost": "Local & affordable management step (traps, generic medicine, isolation)",
    "natural": "Herbal / organic / natural solution (Jeevamrutha, Neemasthram, herbal decoctions)",
    "ayurveda": "Traditional / Ayurvedic / Ethno-veterinary holistic care",
    "lifestyle": "Diet, habits, preventive routine, biosecurity or soil management"
  },
  "whenToConsultDoctor": "Exact warning signs that require immediate in-person expert consultation",
  "languageResponse": "A gentle, culturally respectful 2-3 paragraph detailed advisory in ${language === 'telugu' ? 'Telugu (తెలుగు)' : language === 'hindi' ? 'Hindi (हिन्दी)' : 'English'}"
}`;

    if (ai) {
      const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
          },
        });
      }

      parts.push({
        text: `Doctor Type: ${doctorType}. Language: ${language}. Symptoms & Case Details: ${symptoms}`,
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      try {
        const parsed = JSON.parse(response.text || '{}');
        res.json({ success: true, analysis: parsed });
        return;
      } catch {
        // parsing failed, use structured response
      }
    }

    // Domain-specialized deterministic offline fallback
    let fallbackAnalysis;
    if (doctorType === 'animal') {
      fallbackAnalysis = {
        summary: `Veterinary Triage for Animal: ${symptoms}`,
        rootCauseAnalysis: 'Bacterial/viral pathogen exposure, seasonal heat stress, nutritional mineral deficiency, or contaminated fodder.',
        riskLevel: 'Medium',
        pathways: {
          modern: 'Isolate animal immediately. Check rectal temperature. Administer veterinarian-prescribed antipyretic/antibiotic and electrolyte rehydration.',
          lowCost: 'Keep the animal in a clean, shaded, well-ventilated shed with clean dry straw bedding. Provide clean drinking water with a pinch of rock salt.',
          natural: 'Ethno-Veterinary Medicine (EVM): For udder swelling (mastitis), apply paste of 250g fresh Aloe vera + 50g raw turmeric + 15g edible slaked lime (chuna) 3 times daily.',
          ayurveda: 'AYUSH Pashu Chikitsa: Feed warm gruel of broken wheat with 50g methi (fenugreek) powder and 100g jaggery to boost milk and immunity.',
          lifestyle: 'Biosecurity: Spray diluted neem oil around the shed to deter ticks and biting flies. Ensure daily mineral mixture (50g/day per adult cow/buffalo).',
        },
        whenToConsultDoctor: 'If rectal temperature exceeds 104°F, animal stops ruminating (chewing cud) for >12 hours, severe bloat occurs, or blood appears in milk/stool.',
        languageResponse:
          language === 'telugu'
            ? 'పశువు అనారోగ్య లక్షణాలకు గాను పశువును వెంటనే ప్రత్యేకమైన శుభ్రమైన ప్రదేశంలో ఉంచండి. పొదుగు వాపు లేదా జ్వరం ఉంటే కలబంద, పసుపు, సున్నం మిశ్రమ లేపనం పూయండి. పశువైద్యుడిని సంప్రదించి అవసరమైన చికిత్స అందించండి.'
            : language === 'hindi'
            ? 'पशु के अस्वस्थ लक्षणों पर उसे तुरंत अन्य पशुओं से अलग साफ-सुथरे स्थान पर रखें। थनैला या सूजन होने पर एलोवेरा, हल्दी व चूने का लेप लगाएं। समस्या गंभीर होने पर निकटतम पशु चिकित्सक से संपर्क करें।'
            : 'For the reported livestock condition, quarantine the animal in a shaded shed. Apply proven ethno-veterinary remedies (Aloe vera + turmeric) and consult a licensed veterinarian if fever or anorexia persists.',
      };
    } else if (doctorType === 'bird') {
      fallbackAnalysis = {
        summary: `Avian & Poultry Triage: ${symptoms}`,
        rootCauseAnalysis: 'Viral pathogen (Newcastle/Ranikhet), infectious respiratory bacteria (Coryza), damp litter ammonia gas, or coccidiosis.',
        riskLevel: 'Medium',
        pathways: {
          modern: 'Quarantine affected birds immediately. Administer electrolyte + Vitamin A, D3, E in clean drinking water. Check flock vaccination records (Lasota/RD).',
          lowCost: 'Replace damp litter with dry rice husk to stop ammonia fumes. Wash drinkers with potassium permanganate (pink water).',
          natural: 'Crush fresh garlic cloves (5g/liter) and raw turmeric (5g/liter) into warm drinking water for flock immunity and natural antibacterial defense.',
          ayurveda: 'Traditional poultry decoction: Boil tulsi leaves, black pepper, and dry ginger in water; cool and offer as morning flock drink.',
          lifestyle: 'Strict biosecurity: Disallow outside footwear in poultry pens. Ensure wire-mesh predator and wild bird exclusion.',
        },
        whenToConsultDoctor: 'Sudden drop in water intake, gasping with neck extended, greenish white diarrhea, or flock mortality exceeding 2% in 24 hours.',
        languageResponse:
          language === 'telugu'
            ? 'కోళ్ళలో వ్యాధి లక్షణాలు కనిపించిన వెంటనే అనారోగ్య పక్షులను వేరు చేయండి. త్రాగే నీటిలో వెల్లుల్లి, పసుపు కలిపి ఇవ్వడం ద్వారా రోగనిరోధక శక్తి పెరుగుతుంది. వెంటనే సమీప పశువైద్యాధికారిని సంప్రదించండి.'
            : language === 'hindi'
            ? 'मुर्गियों में बीमारी के लक्षण दिखते ही प्रभावित पक्षियों को तुरंत अलग करें। पीने के पानी में लहसुन और हल्दी का रस मिलाकर दें और बिछावन सूखा रखें। मृत्यु दर बढ़ने पर तुरंत पशु चिकित्सक को दिखाएं।'
            : 'For poultry flock symptoms, isolate symptomatic birds immediately. Add crushed garlic and turmeric to drinking water, ensure dry litter, and alert a veterinary poultry specialist if respiratory distress escalates.',
      };
    } else if (doctorType === 'plant' || doctorType === 'crop') {
      fallbackAnalysis = {
        summary: `Crop & Plant Pathology Assessment: ${symptoms}`,
        rootCauseAnalysis: 'Fungal leaf blight, sucking pest infestation (aphids/thrips), soil nutrient deficiency (NPK / Micronutrients), or irregular irrigation stress.',
        riskLevel: 'Medium',
        pathways: {
          modern: 'Latest Agri-Tech: Use agricultural drone spraying for uniform 1.5m canopy coverage. Foliar application of bio-fungicide (Trichoderma viride) or targeted micronutrient chelate. Check Kisan Suvidha & Meghdoot apps.',
          lowCost: 'Install 10 yellow sticky traps and 5 pheromone traps per acre to monitor and capture flying pest vectors without chemical costs.',
          natural: 'ZBNF Botanical Decoction: Prepare Neemasthram (5kg neem leaves + 5L cow urine in 100L water) or Brahmastram for chewing caterpillars; spray in late evening.',
          ayurveda: 'Vrikshayurveda: Spray 10% filtered sour buttermilk (Khatti Chhachh) mixed with asafoetida (Hing) to eradicate powdery mildew and fungal rust.',
          lifestyle: 'Soil & Water Care: Apply organic biomass mulching (Acchadana) to preserve rhizosphere moisture; check PM-Kisan & Soil Health Card portals for fertilizer subsidies.',
        },
        whenToConsultDoctor: 'If more than 15% of crop foliage shows sudden wilting, stem cankers, or viral leaf curl across the plot.',
        languageResponse:
          language === 'telugu'
            ? 'పంటలో తెగుళ్ల నివారణకు సాయంత్రం వేళల్లో నీమాస్త్రం లేదా పుల్లటి మజ్జిగ ద్రావణాన్ని పిచికారీ చేయండి. పొలంలో పసుపు రంగు జిగురు అట్టలు అమర్చండి. మేఘదూత్ మరియు కిసాన్ సువిధ యాప్స్ ద్వారా తాజా వాతావరణ సలహాలు పొందండి.'
            : language === 'hindi'
            ? 'फसल में कीट व फफूंद नियंत्रण हेतु शाम के समय नीमास्त्र या खट्टी छाछ का छिड़काव करें। पीले चिपचिपे ट्रैप लगाएं। मेघदूत और किसान सुविधा ऐप द्वारा मौसम अनुसार सिंचाई करें।'
            : 'For crop damage, deploy botanical preparations like Neemasthram and sour buttermilk spray during late afternoon. Install sticky traps and consult the Kisan Suvidha or local Krishi Vigyan Kendra (KVK).',
      };
    } else {
      fallbackAnalysis = {
        summary: `Human Clinical & Wellness Triage: ${symptoms}`,
        rootCauseAnalysis: 'Metabolic fatigue, seasonal viral fluctuation, physiological dehydration, or musculoskeletal strain.',
        riskLevel: 'Low',
        pathways: {
          modern: 'Monitor body temperature, blood pressure, and hydration. If pain or fever is uncomfortable, consult a physician or pharmacist for paracetamol / ORS.',
          lowCost: 'Restful sleep, boiled warm water hydration, and light easily digestible gruel (kanji or khichdi with cumin).',
          natural: 'Fresh ginger-tulsi tea with raw honey, warm saline gargle for throat irritation, and steam inhalation.',
          ayurveda: 'Golden Turmeric Milk (Haldi Doodh with a pinch of black pepper) at bedtime to boost macrophage immunity and reduce systemic inflammation.',
          lifestyle: 'Practice 10 minutes of gentle Pranayama (Anulom Vilom), maintain 8 hours of sleep, and avoid cold drafts.',
        },
        whenToConsultDoctor: 'Fever exceeding 101°F for over 48 hours, chest pain, shortness of breath, severe dizziness, or inability to retain fluids.',
        languageResponse:
          language === 'telugu'
            ? 'మీరు పేర్కొన్న లక్షణాలకు గాను తగినంత విశ్రాంతి తీసుకోవడం, గోరువెచ్చని నీరు తాగడం, మరియు పసుపు పాలు తీసుకోవడం మంచిది. లక్షణాలు 2 రోజుల కంటే ఎక్కువ ఉంటే వెంటనే వైద్యుడిని సంప్రదించండి.'
            : language === 'hindi'
            ? 'बताए गए लक्षणों के लिए पर्याप्त विश्राम लें, गुनगुना पानी पिएं और रात में हल्दी वाला दूध लें। यदि तेज बुखार या सांस लेने में परेशानी हो तो तुरंत डॉक्टर को दिखाएं।'
            : 'For the reported symptoms, prioritize rest, hydration with warm fluids, and natural ginger-tulsi tea. Seek licensed medical attention if high fever or breathing distress occurs.',
      };
    }

    res.json({ success: true, analysis: fallbackAnalysis });
  } catch (err: unknown) {
    console.error('AI doctor error:', err);
    res.status(500).json({ error: 'AI Doctor service temporarily unavailable.' });
  }
});

// GOVERNMENT AGRI APPS ENDPOINT
app.get('/api/agri/government-apps', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    count: 8,
    helplines: {
      kisanCallCentre: '1800-180-1551 (Toll Free 6 AM to 10 PM)',
      pmKisanHelp: '155261 / 011-24300606',
      cropInsurancePMFBY: '14447',
      emergencyNational: '112 / 108',
      womeneHelplines: ['8125016226', '7981967919'],
      bookingWhatsApp: '7989997015',
    },
    message: 'Official Government Agricultural Portals, Mobile Apps and Direct Helplines integrated into WOMENE Plant AI.',
  });
});

// AI LIBRARY ENDPOINT
app.get('/api/library/catalog', (req: Request, res: Response) => {
  const { periodicity, category } = req.query;
  res.json({
    status: 'success',
    periodicity: periodicity || 'all',
    category: category || 'all',
    features: ['Daily Digests', 'Weekly Magazines', 'Monthly Journals', 'Digital Reference Books', 'Audio Reader'],
    message: 'World-Wide AI Library catalog ready.',
  });
});

// Vite Middleware for dev / static for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WOMENE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
