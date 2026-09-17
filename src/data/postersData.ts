export interface PosterItem {
  id: string;
  title: string;
  subtitle: string;
  teluguTitle: string;
  hindiTitle: string;
  themeColor: string;
  badge: string;
  keyPoints: string[];
  sections: Array<{ name: string; desc: string }>;
}

export const postersData: PosterItem[] = [
  {
    id: 'poster-1',
    title: 'WOMENE: Care • Support • Companionship',
    teluguTitle: 'WOMENE: సంరక్షణ • మద్దతు • సహచర్యం',
    hindiTitle: 'WOMENE: देखभाल • सहयोग • साथ',
    subtitle: 'Women-Led Service Initiative for Brighter Lives across Andhra Pradesh, Telangana & South India',
    themeColor: 'from-purple-900 via-pink-800 to-purple-950',
    badge: 'Official Launch Poster #1',
    keyPoints: [
      'Food Services: Home-style meals, school & office lunch boxes, meal subscriptions',
      'Delivery & Daily Care: Groceries, medicine pickup via authorized pharmacies, household errands',
      'Personal Care & Relaxation: Head massage, scalp relaxation, back massage, stress relief at home',
      'Travel Companion: Local & intercity transit support, companion for waiting times and luggage',
      'Helpline numbers: 7702635919 / 7989997015 (Service Area: Andhra Pradesh & pan-India)'
    ],
    sections: [
      { name: 'Trained & Verified Women Representatives', desc: 'Background checked, certified, and compassionate' },
      { name: 'Safe & Reliable Services', desc: 'Real-time support, transparent coordination, and safety tracking' },
      { name: 'For All Age Groups & All Genders', desc: 'Respectful and compassionate care for children, elders, women, and families' },
      { name: 'Community Driven, Women Led', desc: 'Empowering local women while elevating community quality of life' },
    ]
  },
  {
    id: 'poster-2',
    title: 'WOMENE 17-Pillar Comprehensive Ecosystem',
    teluguTitle: 'WOMENE 17 ప్రధాన విభాగాలు',
    hindiTitle: 'WOMENE 17 प्रमुख स्तंभ',
    subtitle: 'A Caring, Connected and Self-Reliant India with 17 Integrated Support Pillars',
    themeColor: 'from-purple-950 via-indigo-900 to-pink-900',
    badge: 'Master Platform Architecture',
    keyPoints: [
      '1. Emergency SOS: Live location sharing, 4 km nearby responders, police/ambulance integration',
      '2. Safety & Security: Child safety, elder support, legal helpline, mental support',
      '3. Food Services: Nutritious food for healthier lives, emergency food packs',
      '4. Travel Companion: Intercity & 2-wheeler travel, check-in alerts, family sharing',
      '5. Baby Care: Nalugu & bath services, traditional oil massage, mother guidance',
      '6. Personal Care & Wellness: Acupressure, yoga & meditation, mind wellness',
      '7. Dating & Social Companionship: Safe, respectful social meetups and friendships',
      '8. Medicine & Healthcare: Hospital escort, emergency medicine logistics, health tracking',
      '9. Delivery & Logistics: Essential door-to-door items delivery',
      '10. AI Doctor: Symptom analysis, health reports, Ayurveda & modern advice',
      '12. Work & Learn: Home-based freelance work, gig support, AI & digital skills',
      '13. Village & Marketplace: Farm to market, direct to customer, plant to wealth',
      '15. Senior Citizens: Voice support, medicine alerts, simple large-button interface',
      '16. Safety & Trust Engine: Verified members, ratings, 24/7 monitoring'
    ],
    sections: [
      { name: 'Impact Milestone', desc: '10,000+ Lives Supported, 5,000+ Services, 2,000+ Members' },
      { name: 'Geographic Target', desc: 'Service dispatch response within 4 km of any requesting family' },
    ]
  },
  {
    id: 'poster-3',
    title: 'AI DOCTOR + WOMENE: Life Intelligence Platform',
    teluguTitle: 'AI డాక్టర్ + WOMENE: జీవ విజ్ఞాన వేదిక',
    hindiTitle: 'AI डॉक्टर + WOMENE: जीवन ज्ञान मंच',
    subtitle: 'Health • Nature • Life Intelligence Platform (Total Addressable Market $9T+)',
    themeColor: 'from-emerald-950 via-teal-900 to-purple-950',
    badge: 'AI Doctor & Innovation Platform',
    keyPoints: [
      'Human Doctor AI: General medicine, mind & stress, heart, diabetes & BP, Ayurveda',
      'Animal Doctor AI: Cattle (cows & buffaloes), goats, sheep, horses, pet dogs & cats',
      'Bird Doctor AI: Avian vet referral, poultry disease detection, ducks & pet birds',
      'Plant Doctor AI: Disease & pest detection, nutrient deficiency, leaf/stem/root issues',
      'Crop Doctor AI: Paddy, cotton, maize, chilli, pulses, integrated pest management',
      'Soil Doctor AI: Soil test analysis, pH, EC, NPK nutrients, salinity/alkalinity balance'
    ],
    sections: [
      { name: '5 Solution Pathways', desc: 'Modern Medicine, Low-Cost Care, Nature-Based, Ayurveda, Yoga & Lifestyle' },
      { name: 'Market Opportunity', desc: 'Global Health $5T+, Agri & Food $3T+, Vet & Animal $500B+, Women Empowerment $300B+' }
    ]
  },
  {
    id: 'poster-4',
    title: 'Multimodal Scanner & Natural Farming Wisdom',
    teluguTitle: 'మల్టీమోడల్ స్కానర్ & ప్రకృతి వ్యవసాయం',
    hindiTitle: 'मल्टीमॉडल स्कैनर और प्राकृतिक कृषि',
    subtitle: 'Image, Video, Voice & Report Analysis with Telugu/English WH-Analysis Engine',
    themeColor: 'from-teal-950 via-cyan-900 to-purple-900',
    badge: 'Multimodal & Agri Engine',
    keyPoints: [
      'Telugu Creed: ప్రతి జీవికి ఆరోగ్యం... ప్రతి కుటుంబానికి భద్రత... ప్రతి భూమికి సంపద... ప్రతి సమాజానికి శ్రేయస్సు...',
      'Capture Modes: Image scan, video scan, voice scan, text input, medical/soil PDF report scan',
      'WH Analysis Engine: WHY (Cause analysis), WHERE (Location/Soil patterns), WHEN (Weather/Season), HOW (Spread mechanism)',
      'Natural Farming Knowledge: Jeevamrutha, Ghana Jeevamrutha, Panchagavya, organic biological pest control'
    ],
    sections: [
      { name: 'One Health Vision', desc: 'Human + Animal + Bird + Plant + Crop + Soil = One Future' },
      { name: 'Evidence-Based Safety', desc: 'Confidence scoring, contraindication alerts, and qualified specialist escalation' }
    ]
  },
  {
    id: 'poster-5',
    title: 'WOMENE Ecosystem & 5-Phase India Roadmap',
    teluguTitle: 'WOMENE వ్యవస్థ & 5 దశల భారత ప్రణాళిక',
    hindiTitle: 'WOMENE तंत्र और 5-चरणीय भारत योजना',
    subtitle: 'From One City to Every Corner of India - Building India\'s Care Economy',
    themeColor: 'from-fuchsia-950 via-purple-900 to-indigo-950',
    badge: 'Expansion & Growth Roadmap',
    keyPoints: [
      'Phase 1: MVP Launch (1-3 months) in 1 flagship city (Bengaluru)',
      'Phase 2: Scale & Optimize (3-6 months) in 5 key cities (Hyderabad, Chennai, Mumbai, Pune, Vijayawada)',
      'Phase 3: Expand India (6-12 months) into 50+ tier-2 cities, mandals & zilla centers',
      'Phase 4: National Network (Year 2) across all major cities & rural nodes',
      'Phase 5: Care Economy Leader (Year 3+) driving grassroots women empowerment and welfare'
    ],
    sections: [
      { name: '6 Strategic Nodes', desc: 'Help (Safety), Care (Home Life), Work (Jobs), Learn (Skills), Village (Products), Wellness' },
      { name: 'Triple Bottom Line', desc: 'People (Empowerment) + Planet (Organic Farming) + Progress (Prosperity)' }
    ]
  },
  {
    id: 'poster-6',
    title: 'SAFETY. CARE. WHEREVER YOU GO.',
    teluguTitle: 'రక్షణ. సంరక్షణ. మీరు ఎక్కడికి వెళ్లినా.',
    hindiTitle: 'सुरक्षा। देखभाल। आप जहां भी जाएं।',
    subtitle: '12-Panel Pitch: Rapid 4 KM Dispatch, Trained Women Force, and Transparent Service',
    themeColor: 'from-purple-950 via-rose-950 to-slate-900',
    badge: 'Operations & Safety Standards',
    keyPoints: [
      'Mission: Create a safer, kinder, more connected world with real-time support and medical help',
      'One Tap Real Help: Verified WOMENE member reaches user within 4 km response radius',
      'Safe Travel Anywhere: City commute, interstate travel, safe returns after work',
      'Food, Essentials & Logistics: Emergency food, prescription pickup, baby supplies',
      'Trained. Trusted. Empowered.: Rigorous background checks, first-aid certified, self-defense trained'
    ],
    sections: [
      { name: 'Clear Separation of Duties', desc: 'WOMENE assists respectfully; acute medical/criminal emergencies route to 108/112' },
      { name: 'Direct Contact Line', desc: 'Helpline: 8125016226 / 7981967919 | WhatsApp Booking: 7989997015' }
    ]
  }
];
