// Vercel Serverless Function: GET /api/services
export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
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
}
