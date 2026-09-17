import { LibraryItem } from '../types';

export const aiLibraryItems: LibraryItem[] = [
  // DAILY EDITIONS
  {
    id: 'lib_daily_health',
    title: {
      en: 'World Health & Integrative Medicine Daily',
      te: 'ప్రపంచ ఆరోగ్య & సమగ్ర వైద్య దినపత్రిక',
      hi: 'विश्व स्वास्थ्य एवं एकीकृत चिकित्सा दैनिक',
    },
    subtitle: {
      en: 'Daily updates on clinical breakthroughs, preventative nutrition, and global wellness.',
      te: 'క్లినికల్ ఆవిష్కరణలు, నివారణ పోషకాహారం మరియు అంతర్జాతీయ ఆరోగ్య సమాచారం.',
      hi: 'दैनिक नैदानिक अनुसंधान, निवारक पोषण और वैश्विक स्वास्थ्य अपडेट।',
    },
    periodicity: 'daily',
    category: 'medical_health',
    authorPublisher: 'WOMENE Global Health Bureau & International Medical Research Group',
    edition: 'Vol. 12 • Issue 261 (Today)',
    publicationDate: 'Daily Morning Edition',
    readTime: '6 min read',
    coverGradient: 'from-purple-900 via-indigo-800 to-rose-900',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['Cardiology', 'Preventive Care', 'Nutrition', 'Daily Health'],
    pdfDownloadName: 'WOMENE_World_Health_Daily.pdf',
    summary: {
      en: 'Today’s briefing explores early detection of cardiovascular inflammation, circadian rhythm fasting, and evidence-based natural anti-inflammatory decoctions.',
      te: 'గుండె జబ్బుల ప్రారంభ నివారణ, జీవ గడియార ఉపవాస విధానాలు మరియు వాపులను తగ్గించే సహజ మూలికా కషాయాల విశ్లేషణ.',
      hi: 'हृदय रोगों की प्रारंभिक पहचान, जैविक घड़ी अनुसार उपवास और प्राकृतिक सूजनरोधी काढ़े के वैज्ञानिक प्रभाव।',
    },
    highlights: {
      en: [
        'Why morning sunlight exposure regulates melatonin and lowers evening cortisol.',
        'Low-cost micro-nutrient combinations that reduce chronic joint inflammation by 42%.',
        'How 10 minutes of box breathing (Pranayama) drops systolic blood pressure within 15 minutes.',
      ],
      te: [
        'ఉదయపు సూర్యకాంతి మెలటోనిన్ ను సమతుల్యం చేసి ఒత్తిడి హార్మోన్లను ఎలా తగ్గిస్తుంది.',
        'కీళ్ల నొప్పులు, వాపులను 42% వరకు తగ్గించే సహజ సూక్ష్మ పోషకాల మిశ్రమం.',
        '10 నిమిషాల ప్రాణాయామం రక్తపోటును (BP) వెంటనే ఎలా నియంత్రిస్తుంది.',
      ],
      hi: [
        'सुबह की धूप कैसे मेलाटोनिन और तनाव हार्मोन को संतुलित करती है।',
        'जोड़ों के पुराने दर्द और सूजन को 42% तक कम करने वाले प्राकृतिक घटक।',
        '10 मिनट का प्राणायाम कैसे सिस्टोलिक रक्तचाप को 15 मिनट में सामान्य करता है।',
      ],
    },
    tableOfContents: [
      '1. Global Clinical Digest: Vascular Endothelium Protection',
      '2. Nutrition Spotlight: Cold-Pressed Seed Oils vs Refined Fats',
      '3. AYUSH Synthesis: Turmeric & Black Pepper Bioavailability',
      '4. Daily Mental Wellness: Compassion Meditation in High-Stress Environments',
    ],
    fullArticleText: {
      en: `### World Health & Integrative Medicine Daily: Morning Briefing

The modern clinical paradigm is rapidly shifting towards early metabolic surveillance and lifestyle-driven preservation of vascular health. In today's edition, we explore three pillars:

#### 1. Circadian Nutrition & Glycemic Stability
Clinical data from multicenter trials confirms that consuming the heaviest caloric intake between 10:00 AM and 2:00 PM correlates with significantly lower fasting insulin spikes compared to late-evening dining. Synchronizing carbohydrate intake with pancreatic enzymatic peaks preserves insulin sensitivity.

#### 2. Integrative Anti-Inflammatory Solutions
Curcumin, the primary polyphenol in organic turmeric, exhibits potent down-regulation of NF-kB pathways. However, due to rapid hepatic glucuronidation, free curcumin clearance is swift. Pairing 1000mg turmeric with 5mg piperine (found in fresh black pepper) elevates human serum bioavailability by up to 2000%, transforming traditional golden milk into a clinically substantiated anti-arthritic remedy.

#### 3. Stress Regulation Via Vagal Tone
Diaphragmatic respiration with extended exhalations (4 seconds inhale, 7 seconds hold, 8 seconds exhale) stimulates the parasympathetic vagal nerve, signaling immediate reduction in peripheral vascular resistance.`,
      te: `### ప్రపంచ ఆరోగ్య & సమగ్ర వైద్య దినపత్రిక: ఉదయపు సంచిక

ఆధునిక వైద్య రంగం ఇప్పుడు వ్యాధులు వచ్చాక నయం చేయడం కంటే, ముందే జీవనశైలి ద్వారా నివారించడంపై దృష్టి సారిస్తోంది. నేటి సంచికలోని ముఖ్య అంశాలు:

#### 1. జీవ గడియారం & సమతుల్య ఆహారం
ఉదయం 10:00 నుండి మధ్యాహ్నం 2:00 గంటల మధ్య ముఖ్యమైన భోజనం చేయడం వల్ల శరీరంలో ఇన్సులిన్ స్థాయిలు అదుపులో ఉంటాయి. రాత్రి ఆలస్యంగా భోజనం చేయడం వల్ల జీర్ణవ్యవస్థపై భారం పడి, రక్తంలో చక్కెర నిల్వలు అస్తవ్యస్తమవుతాయి.

#### 2. పసుపు - మిరియాల అద్భుత ఔషధం
పసుపులోని కర్కుమిన్ వాపులు మరియు కీళ్ల నొప్పులను తగ్గిస్తుంది. అయితే, పసుపుతో పాటు చిటికెడు తాజా మిరియాల పొడి కలిపి తీసుకున్నప్పుడు, దాని శరీర గ్రహణ శక్తి ఏకంగా 2000% పెరుగుతుంది. ఇది ప్రాచీన భారతీయ వంటింటి వైద్యం యొక్క శాస్త్రీయతకు తిరుగులేని నిదర్శనం.

#### 3. ప్రాణాయామం మరియు రక్తపోటు నియంత్రణ
రోజుకు కేవలం 10 నిమిషాల పాటు దీర్ఘ శ్వాస వ్యాయామం చేయడం వల్ల నాడీ వ్యవస్థ శాంతపడి, మానసిక ఒత్తిడి తగ్గి రక్తపోటు వెంటనే అదుపులోకి వస్తుంది.`,
      hi: `### विश्व स्वास्थ्य एवं एकीकृत चिकित्सा दैनिक: प्रातःकालीन संस्करण

आधुनिक चिकित्सा विज्ञान अब बीमारियों के उपचार से अधिक उनके पूर्व-निवारण (प्रिवेंटिव हेल्थकेयर) पर केंद्रित है। आज के प्रमुख विषय:

#### 1. जैविक घड़ी और संतुलित पाचन
सुबह 10 बजे से दोपहर 2 बजे के बीच पौष्टिक भोजन करने से अग्न्याशय पर दबाव कम होता है और इंसुलिन संवेदनशीलता बनी रहती है। देर रात का भारी भोजन पाचन और चयापचय को नुकसान पहुंचाता है।

#### 2. हल्दी और काली मिर्च का वैज्ञानिक संगम
हल्दी में मौजूद करक्यूमिन शरीर की सूजन और जोड़ों के दर्द को दूर करता है। जब इसके साथ एक चुटकी काली मिर्च (पिपेरिन) मिलाई जाती है, तो इसका अवशोषण 2000% तक बढ़ जाता है।

#### 3. प्राणायाम से रक्तचाप नियंत्रण
गहरी सांस लेने और छोड़ने की प्राणायाम विधि से वेगस नर्व सक्रिय होती है, जिससे हृदय गति सामान्य होती है और तनाव में अभूतपूर्व कमी आती है।`,
    },
  },
  {
    id: 'lib_daily_agri',
    title: {
      en: 'Global Agri & Mandi Market Daily',
      te: 'గ్లోబల్ అగ్రి & వ్యవసాయ మార్కెట్ దినపత్రిక',
      hi: 'वैश्विक कृषि एवं मंडी भाव दैनिक पत्रिका',
    },
    subtitle: {
      en: 'Real-time commodity prices, export-import trends, weather forecasts, and organic farm pricing.',
      te: 'నిజ-సమయ పంట మార్కెట్ ధరలు, ఎగుమతి విధానాలు, వాతావరణ అంచనాలు మరియు సేంద్రీయ దిగుబడుల విలువ.',
      hi: 'ताजा अनाज मंडी भाव, मौसम पूर्वानुमान, निर्यात रुझान और जैविक उत्पादों के बाजार भाव।',
    },
    periodicity: 'daily',
    category: 'agriculture_farming',
    authorPublisher: 'WOMENE Rural Economy Desk & Agri Intelligence Forum',
    edition: 'Daily Commodity Tracker #488',
    publicationDate: 'Daily Morning Edition',
    readTime: '5 min read',
    coverGradient: 'from-emerald-900 via-teal-800 to-green-950',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['Mandi Prices', 'e-NAM', 'Paddy', 'Chilli', 'Cotton', 'Millets'],
    pdfDownloadName: 'WOMENE_Daily_Agri_Mandi_Report.pdf',
    summary: {
      en: 'Daily national overview of APMC market yards, e-NAM electronic auction trends for paddy, red chilli, unpolished millets, and pulses.',
      te: 'ఆంధ్రప్రదేశ్, తెలంగాణ మరియు దేశవ్యాప్త మార్కెట్ యార్డులలో వరి, మిర్చి, పత్తి, సిరిధాన్యాలు మరియు పప్పు దినుసుల తాజా ధరల విశ్లేషణ.',
      hi: 'देशभर की प्रमुख मंडियों और ई-नाम पोर्टल पर धान, कपास, लाल मिर्च और मोटे अनाजों के ताजा नीलामी भाव।',
    },
    highlights: {
      en: [
        'Native Foxtail & Browntop millets surging 18% above MSP in urban direct-to-consumer pipelines.',
        'Khammam and Guntur cold storage stocks update for Teja red chilli.',
        'Meghdoot weather outlook: Isolated showers predicted for coastal delta districts.',
      ],
      te: [
        'నగరాల్లో కొర్రలు, అండుకొర్రలకు మద్దతు ధర కంటే 18% అధిక డిమాండ్.',
        'గుంటూరు, ఖమ్మం మార్కెట్లలో తేజ రకం ఎండిన మిర్చి ధరల పోకడలు.',
        'తీరప్రాంత జిల్లాల్లో రాగల 48 గంటల్లో తేలికపాటి జల్లుల వాతావరణ హెచ్చరిక.',
      ],
      hi: [
        'शहरी बाजारों में देशी मोटे अनाजों (रागी, कोदो, कुटकी) के भावों में 18% की भारी वृद्धि।',
        'गुंटूर व खम्मम मंडियों में तेज मिर्च के कोल्ड स्टोरेज स्टॉक और मांग का विश्लेषण।',
        'तटीय क्षेत्रों में मेघदूत द्वारा 48 घंटों में हल्की वर्षा की चेतावनी।',
      ],
    },
    tableOfContents: [
      '1. APMC & e-NAM Modal Prices for Paddy & Cotton',
      '2. Red Chilli & Spice Auction Summary (Guntur & Warangal)',
      '3. Natural Farming Premium: Direct Farm-to-Consumer Margins',
      '4. Agromet Weather Directives for Field Operations',
    ],
    fullArticleText: {
      en: `### Global Agri & Mandi Market Daily: Morning Auction Report

Farmers utilizing digital market linkages through e-NAM and direct women-led collectives are seeing improved farm-gate realizations:

#### 1. Grains & Millets
Unpolished native millets (Ragi, Foxtail, Kodo, Browntop) are trading at record highs of ₹48-₹62/kg at farm gates for chemical-free certified produce, outpacing hybrid polished grains. Consumers in Tier-1 cities are actively ordering direct subscription boxes.

#### 2. Commercial Cash Crops (Chilli, Cotton, Turmeric)
Red Chilli arrivals in major hubs remain robust. Grade-A dried Teja variety closed at ₹18,500 - ₹21,200 per quintal. Farmers are strongly advised to verify moisture levels (optimal 10-11%) before bagging to prevent aflatoxin contamination and secure top auction bids.

#### 3. Agromet Advisory (IMD / ICAR)
Avoid spraying contact insecticides or liquid fertilizers during midday hours if relative humidity exceeds 85%, as leaf stomata close to prevent transpirational water loss, reducing chemical uptake.`,
      te: `### గ్లోబల్ అగ్రి & వ్యవసాయ మార్కెట్ దినపత్రిక: తాజా విశ్లేషణ

మధ్యవర్తులు లేకుండా నేరుగా e-NAM మరియు మహిళా రైతు సంఘాల ద్వారా విక్రయించే రైతులకు మెరుగైన లాభాలు లభిస్తున్నాయి:

#### 1. సిరిధాన్యాల హవా
రసాయనాలు లేని పద్ధతిలో పండించిన కొర్రలు, రాగులు, అండుకొర్రలకు పట్టణాల్లో విపరీతమైన గిరాకీ ఉంది. క్వింటాలుకు ₹4,800 నుండి ₹6,200 వరకు రైతులకు నేరుగా చెల్లింపులు లభిస్తున్నాయి.

#### 2. మిర్చి & పత్తి మార్కెట్ సమాచారం
గుంటూరు యార్డులో తేజా రకం ఎండుమిర్చి క్వింటాలుకు ₹18,500 నుండి ₹21,200 వరకు పలికింది. మిర్చిలో తేమ శాతం 10-11% ఉండేలా బాగా ఎండబెట్టి తీసుకురావడం వల్ల అత్యధిక ధర లభిస్తుంది.

#### 3. వాతావరణ సలహా
గాలిలో తేమ ఎక్కువగా ఉన్నప్పుడు మధ్యాహ్నం వేళల్లో పురుగు మందులు లేదా ఎరువుల పిచికారీ చేయవద్దు. తెల్లవారుజామున లేదా సాయంత్రం 4 గంటల తర్వాత మాత్రమే పిచికారీ చేయడం ఉత్తమం.`,
      hi: `### वैश्विक कृषि एवं मंडी भाव दैनिक पत्रिका: बाजार समीक्षा

डिजिटल ई-नाम प्लेटफॉर्म और महिला किसान उत्पादक समूहों (एफपीओ) के माध्यम से फसल बेचने से किसानों को उचित मूल्य प्राप्त हो रहा है:

#### 1. मोटे अनाजों (मिलेट्स) की भारी मांग
प्राकृतिक विधि से उगाए गए रागी, बाजरा, कोदो और सांवा को सीधे उपभोक्ताओं द्वारा ₹48 से ₹62 प्रति किलो तक खरीदा जा रहा है।

#### 2. वाणिज्यिक फसलें (कपास, मिर्च व हल्दी)
प्रमुख मंडियों में सूखी लाल मिर्च की उत्तम गुणवत्ता ₹18,500 से ₹21,200 प्रति क्विंटल बिकी। किसानों को सलाह दी जाती है कि नमी 10% से कम रखकर ही उपज लाएं ताकि उच्चतम भाव मिले।

#### 3. मौसम वैज्ञानिक परामर्श
हवा में अधिक नमी होने पर दोपहर की तेज धूप में कीटनाशक छिड़काव से बचें; केवल सुबह या शाम के समय ही छिड़काव करें।`,
    },
  },

  // WEEKLY MAGAZINES
  {
    id: 'lib_weekly_agritech',
    title: {
      en: 'The AgriTech & Kisan Drone Global Weekly',
      te: 'అగ్రిటెక్ & కిసాన్ డ్రోన్ గ్లోబల్ వీక్లీ',
      hi: 'एग्रीटेक एवं किसान ड्रोन ग्लोबल साप्ताहिक पत्रिका',
    },
    subtitle: {
      en: 'International weekly magazine covering precision agriculture, robotics, AI sensors, and government subsidies.',
      te: 'వ్యవసాయంలో రోబోటిక్స్, కిసాన్ డ్రోన్లు, AI సెన్సార్లు మరియు ప్రభుత్వ సబ్సిడీలపై అంతర్జాతీయ వారపత్రిక.',
      hi: 'सटीक कृषि, रोबोटिक्स, किसान ड्रोन, एआई सेंसर और सरकारी योजनाओं पर अंतर्राष्ट्रीय साप्ताहिक पत्रिका।',
    },
    periodicity: 'weekly',
    category: 'technology_innovation',
    authorPublisher: 'International Society of Precision Agriculture & WOMENE Drone Hub',
    edition: 'Vol. 18 • Issue 37',
    publicationDate: 'Published Every Monday',
    readTime: '12 min read',
    coverGradient: 'from-blue-950 via-cyan-900 to-indigo-950',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['Drones', 'IoT', 'Sensors', 'Robotics', 'Subsidies'],
    pdfDownloadName: 'AgriTech_Kisan_Drone_Weekly.pdf',
    summary: {
      en: 'In-depth engineering analysis of agricultural drone spraying aerodynamics, obstacle avoidance radar, battery longevity, and accessing 50-100% government subsidies.',
      te: 'వ్యవసాయ డ్రోన్ల సాంకేతికత, రాడార్ భద్రతా వ్యవస్థలు, బ్యాటరీ సామర్థ్యం మరియు 50% నుండి 100% వరకు ప్రభుత్వ సబ్సిడీల పూర్తి మార్గదర్శి.',
      hi: 'कृषि ड्रोन की उड़ान तकनीक, रडार सेंसर, बैटरी रखरखाव और 50% से 100% तक सरकारी सब्सिडी प्राप्त करने की पूरी प्रक्रिया।',
    },
    highlights: {
      en: [
        'Field trial report: 10-liter hexacopter drone vs manual knapsack in 50-acre cotton crop.',
        'How downward propeller rotor downwash forces fine droplets directly underneath leaves where aphids shelter.',
        'Step-by-step documentation required for the SMAM / Kisan Drone Subsidy portal.',
      ],
      te: [
        '50 ఎకరాల పత్తి చేనులో మాన్యువల్ స్ప్రేయర్ తో పోల్చితే డ్రోన్ పనితీరుపై ప్రయోగ నివేదిక.',
        'డ్రోన్ రెక్కల గాలి వేగం ఆకుల అడుగున దాక్కున్న పేనుబంక, తెల్లదోమలపై మందును ఎలా చేరుస్తుంది.',
        'SMAM పోర్టల్ ద్వారా డ్రోన్ కొనుగోలుకు అవసరమైన ధృవీకరణ పత్రాలు మరియు దరఖాస్తు విధానం.',
      ],
      hi: [
        '50 एकड़ कपास में पारंपरिक स्प्रेयर बनाम ड्रोन छिड़काव का विस्तृत तुलनात्मक अध्ययन।',
        'ड्रोन के पंखों की तेज हवा कैसे पत्तियों को पलटकर नीचे छिपे कीटों तक दवा पहुंचाती है।',
        'सरकारी पोर्टल पर किसान ड्रोन सब्सिडी हेतु आवश्यक दस्तावेजों की पूरी चेकलिस्ट।',
      ],
    },
    tableOfContents: [
      '1. Cover Story: How Rural Women Drone Pilots (Drone Didis) Are Transforming Indian Fields',
      '2. Hardware Breakdown: Centrifugal Atomizers vs Pressure Nozzles',
      '3. Battery Care: 12S LiPo / Solid State Charging Best Practices',
      '4. Regulatory Compliance: DGCA Remote Pilot Certification Rules',
    ],
    fullArticleText: {
      en: `### Cover Story: The Dawn of Precision Agricultural Aviation

The introduction of drone technology to Indian farming is not merely a mechanization milestone; it represents a profound socio-economic transformation in rural communities.

#### The Downwash Advantage
Conventional manual backpack sprayers produce erratic droplet sizes ranging from 80 to 450 microns. High-volume manual spraying frequently leads to severe chemical runoff and hazardous dermal exposure for the operator. In contrast, agricultural hexacopter drones utilize downward rotor downwash (turbulent airflow created by six rotating carbon-fiber blades) that physically inverts crop leaves during flight, ensuring that micron-sized mist coats the underside of foliage where sucking pests congregate.

#### Economic Feasibility & Subsidies
Under the Sub-Mission on Agricultural Mechanization (SMAM), individual female farmers and smallholder cultivators receive up to 50% subsidy (capped at ₹5,00,000) for procuring DGCA-certified drones. Farmer Producer Organizations (FPOs) and agricultural training centers receive up to 100% grants (capped at ₹10,00,000) to set up Custom Hiring Centers (CHCs).`,
      te: `### కవర్ స్టోరీ: వ్యవసాయంలో విప్లవాత్మక కిసాన్ డ్రోన్లు

రైతుల జీవితాల్లో డ్రోన్ సాంకేతికత పెను మార్పులను తీసుకొస్తోంది. కేవలం కొద్ది నిమిషాల్లోనే ఎకరాల కొద్దీ పంటను పిచికారీ చేస్తూ సమయాన్ని, శ్రమను మరియు డబ్బును ఆదా చేస్తోంది:

#### గాలి తుంపర్ల ప్రత్యేకత (Downwash)
రైతులు చేతి పంపులతో మందులు పిచికారీ చేసేటప్పుడు ఆకుల పైభాగంలో మాత్రమే మందు పడుతుంది. కానీ పురుగులు ఆకుల అడుగు భాగంలో దాక్కుంటాయి. డ్రోన్ ఆరు రెక్కల నుండి వచ్చే శక్తివంతమైన గాలి ఒత్తిడి ఆకులను తిరగేసి, అడుగు భాగాన కూడా సమానంగా మందును పిచికారీ చేస్తుంది. దీనివల్ల తెగుళ్ళు వెంటనే నశిస్తాయి.

#### ప్రభుత్వ ప్రోత్సాహకాలు & సబ్సిడీ
కేంద్ర ప్రభుత్వ SMAM పథకం కింద మహిళా రైతులకు, చిన్నకారు రైతులకు 50% వరకు (గరిష్టంగా ₹5 లక్షలు) మరియు రైతు సంఘాలకు (FPO) 100% వరకు (గరిష్టంగా ₹10 లక్షలు) ఉచిత గ్రాంటు లభిస్తుంది. దీనివల్ల గ్రామీణ యువతులు డ్రోన్ పైలట్లుగా స్వయం ఉపాధి పొందుతున్నారు.`,
      hi: `### आवरण कथा: भारतीय कृषि में किसान ड्रोन क्रांति

खेतों में ड्रोन का प्रवेश केवल आधुनिकता नहीं, बल्कि किसानों के स्वास्थ्य और समृद्धि का नया युग है:

#### ड्रोन की विशेष छिड़काव तकनीक
साधारण स्प्रेयर से छिड़काव करते समय दवा बहकर जमीन में व्यर्थ हो जाती है और किसान के फेफड़ों में जहर जाता है। इसके विपरीत, ड्रोन के पंखों की तीव्र हवा पत्तियों को उलट देती है, जिससे पत्तियों के नीचे छिपी इल्लियां व फंगस पूरी तरह नष्ट हो जाती हैं।

#### भारी सरकारी सब्सिडी
केंद्र सरकार के कृषि यंत्रीकरण मिशन के तहत महिला किसानों को 50% तक (अधिकतम 5 लाख रुपये) और किसान समूहों (एफपीओ) को 100% तक (10 लाख रुपये) का अनुदान दिया जा रहा है।`,
    },
  },
  {
    id: 'lib_weekly_vet_animal',
    title: {
      en: 'Veterinary & Livestock World Weekly',
      te: 'పశువైద్యం & పాడి సంరక్షణ వారపత్రిక',
      hi: 'पशु चिकित्सा एवं पशुधन विश्व साप्ताहिक',
    },
    subtitle: {
      en: 'Specialist veterinary care, cattle breeding, dairy economics, and bird disease prevention.',
      te: 'పాడి పశువుల సంరక్షణ, ఆవులు, గేదెలు, మేకల వ్యాధులు, దాణా నిర్వహణ మరియు కోళ్ల ఆరోగ్యం.',
      hi: 'दुधारू पशुओं की देखभाल, नस्ल सुधार, रोग निवारण, संतुलित आहार और मुर्गी पालन विशेषज्ञ सलाह।',
    },
    periodicity: 'weekly',
    category: 'veterinary_birds',
    authorPublisher: 'WOMENE Animal Health Board & Veterinary Science Institute',
    edition: 'Vol. 14 • Issue 50',
    publicationDate: 'Published Every Wednesday',
    readTime: '10 min read',
    coverGradient: 'from-amber-950 via-orange-900 to-yellow-950',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['Cattle', 'Dairy', 'Poultry', 'Mastitis', 'Veterinary'],
    pdfDownloadName: 'Veterinary_Livestock_Weekly.pdf',
    summary: {
      en: 'Clinical treatment and low-cost ethno-veterinary remedies for bovine mastitis, foot-and-mouth disease (FMD), heat cycle detection, and poultry viral outbreak defense.',
      te: 'ఆవుల్లో పొదుగు వాపు వ్యాధి నివారణ, గాలికుంటు వ్యాధికి నాటు మందులు, సమతుల్య దాణా మరియు కోళ్ల ఫారాలలో రాణికేట్ వ్యాధి నియంత్రణ.',
      hi: 'थनैला रोग का अचूक घरेलू उपचार, खुरपका-मुंहपका (एफएमडी) से बचाव, बांझपन निवारण और मुर्गियों में रानीखेत रोग नियंत्रण।',
    },
    highlights: {
      en: [
        'Ethno-veterinary medicine (EVM) recipe for subclinical mastitis using aloe vera, turmeric, and slaked lime.',
        'Mineral mixture deficiency: Why calcium and phosphorus balance determines lactation persistence.',
        'Avian biosecurity: Disinfection protocols that halt Newcastle disease and infectious bronchitis in backyard flocks.',
      ],
      te: [
        'కలబంద, పసుపు, సున్నం మిశ్రమంతో పొదుగు వాపు వ్యాధికి 3 రోజుల్లో నయమయ్యే సాంప్రదాయ లేపనం.',
        'ఖనిజ లవణాల మిశ్రమం లోపం వల్ల పాల దిగుబడి తగ్గకుండా తీసుకోవాల్సిన జాగ్రత్తలు.',
        'నాటు కోళ్లలో వచ్చే కొక్కెర రోగం (రాణికేట్) రాకుండా బయో-సెక్యూరిటీ నిబంధనలు.',
      ],
      hi: [
        'घृतकुमारी (एलोवेरा), हल्दी और चूने के लेप से मात्र 3 दिन में थनैला रोग का बिना एंटीबायोटिक सफल उपचार।',
        'दुधारू गाय-भैंसों में खनिज मिश्रण (कैल्शियम-फास्फोरस) का महत्व और दूध वृद्धि के उपाय।',
        'मुर्गियों में रानीखेत और संक्रामक सर्दी से बचाव के लिए अनिवार्य जैव-सुरक्षा नियम।',
      ],
    },
    tableOfContents: [
      '1. Clinical Feature: Non-Antibiotic Management of Bovine Mastitis',
      '2. Artificial Insemination & Estrus Synchronization in Indigenous Breeds',
      '3. Poultry Special: Seasonal Temperature Stress Management in Broilers & Layers',
      '4. Grazing Protocols: Avoiding Hydrocyanic Acid Toxicity in Young Sorghum/Jowar',
    ],
    fullArticleText: {
      en: `### Clinical Feature: Ethno-Veterinary Solutions for Bovine Mastitis

Bovine mastitis causes immense economic losses to Indian dairy farmers through milk loss, veterinary bills, and permanent quarter damage.

#### The Proven Ethno-Veterinary Formula (TDU Approved)
Ingredients for 1 cow (1-day application, split into 3-4 dressings):
- 250 grams fresh Aloe Vera leaves
- 50 grams raw turmeric rhizome (freshly grated)
- 15 grams slaked lime (edible chuna / Calcium hydroxide)

Preparation: Blend the ingredients with clean water into an oily paste. Completely strip all infected milk from the quarter. Wash the teat with clean lukewarm water. Apply the smooth paste generously over the entire inflamed udder and teat base every 3 hours for 5 days. Field trials demonstrate a 91% cure rate in early-stage catarrhal mastitis without contaminating milk with antibiotic residues.`,
      te: `### పొదుగు వాపు వ్యాధికి అద్భుతమైన దేశీ చికిత్స

పాడి పశువులలో పొదుగు వాపు వ్యాధి వల్ల రైతులు తీవ్రంగా నష్టపోతారు. యాంటీబయాటిక్స్ వాడకుండా కేవలం వంటింటి మూలికలతో దీనిని నయం చేయవచ్చు:

#### కావలసిన పదార్థాలు (ఒక రోజుకు):
- తాజా కలబంద ముక్కలు: 250 గ్రాములు
- తాజా పచ్చి పసుపు: 50 గ్రాములు
- తమలపాకులకు రాసే సున్నం: 15 గ్రాములు

తయారీ & వాడే విధానం:
ఈ మూడింటిని రోట్లో లేదా మిక్సీలో మెత్తటి ముద్దలా నూరాలి. మొదట పొదుగులోని చెడు పాలను పూర్తిగా పిండి వేయాలి. పొదుగును గోరువెచ్చని నీటితో శుభ్రం చేసి, ఈ పసుపు-కలబంద లేపనాన్ని పొదుగు మొత్తం దట్టంగా పూయాలి. రోజుకు 3 నుండి 4 సార్లు, వరుసగా 3-5 రోజులు రాస్తే పొదుగు వాపు, గడ్డకట్టడం పూర్తిగా తగ్గి పశువు సాధారణ స్థితికి వస్తుంది.`,
      hi: `### थनैला रोग का अचूक घरेलू आयुर्वेदिक उपचार

थनैला रोग से दुधारू पशुओं के अयन खराब हो जाते हैं और दूध पूरी तरह बंद हो जाता है। बिना महंगे इंजेक्शन के प्राकृतिक उपचार:

#### आवश्यक सामग्री (1 दिन के लिए):
- ताजा एलोवेरा (घृतकुमारी): 250 ग्राम
- कच्ची हल्दी: 50 ग्राम
- खाने वाला चूना: 15 ग्राम

बनाने और लगाने की विधि:
तीनों चीजों को पीसकर मुलायम लेप बना लें। पहले थन का सारा खराब दूध बाहर निकाल दें। फिर अयन को साफ पानी से धोकर यह लेप पूरे थन पर अच्छी तरह लगाएं। दिन में 3-4 बार लगाने से 3 से 5 दिन में सूजन व गांठ पूरी तरह ठीक हो जाती है।`,
    },
  },

  // MONTHLY JOURNALS
  {
    id: 'lib_monthly_natural_agri',
    title: {
      en: 'World Regenerative Agriculture & Soil Biology Journal',
      te: 'ప్రపంచ పునరుత్పాదక వ్యవసాయం & భూసార జీవశాస్త్ర మాసపత్రిక',
      hi: 'विश्व पुनर्योजी कृषि एवं मृदा जीवविज्ञान मासिक पत्रिका',
    },
    subtitle: {
      en: 'Peer-reviewed research and practical field methodologies on Zero Budget Natural Farming, bio-inoculants, and carbon sequestration.',
      te: 'జీరో బడ్జెట్ ప్రకృతి వ్యవసాయం (ZBNF), జీవామృతం, నేలలో కార్బన్ శాతం పెంపుపై ప్రత్యేక మాసపత్రిక.',
      hi: 'शून्य बजट प्राकृतिक खेती, सूक्ष्मजीव विज्ञान, घन जीवामृत और मिट्टी में जैविक कार्बन बढ़ाने पर मासिक शोध पत्रिका।',
    },
    periodicity: 'monthly',
    category: 'agriculture_farming',
    authorPublisher: 'Global Regenerative Soil Alliance & WOMENE Community Agronomy',
    edition: 'Monthly Academic Issue #94',
    publicationDate: 'Published on 1st of Every Month',
    readTime: '15 min read',
    coverGradient: 'from-green-950 via-emerald-900 to-lime-950',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['ZBNF', 'Regenerative', 'Soil Carbon', 'Microbes', 'Compost'],
    pdfDownloadName: 'Regenerative_Agriculture_Monthly.pdf',
    summary: {
      en: 'Comprehensive academic and farmer-tested compendium on reviving soil organic carbon (SOC) from 0.3% to over 1.5% using native microorganisms, cover crops, and multi-tier intercropping.',
      te: 'రసాయనాల వల్ల నిస్సారమైన నేలల్లో సేంద్రీయ కర్బనాన్ని (Carbon) 0.3% నుండి 1.5% పైకి పెంచి, దిగుబడులను రెట్టింపు చేసే సమగ్ర పరిశోధన.',
      hi: 'रासायनिक खादों से बंजर हो रही मिट्टी में देसी गाय के गोबर-गोमूत्र और आच्छादन (मल्चिंग) से जैविक कार्बन बढ़ाने का संपूर्ण विज्ञान।',
    },
    highlights: {
      en: [
        'Rhizosphere microbial counts: 1 gram of native cow dung contains over 500 crore beneficial aerobic and anaerobic microbes.',
        'Why synthetic urea kills native mycorrhizal fungi and turns porous topsoil into compacted cement-like hardpan.',
        'Multi-layer cropping: How drumstick, banana, papaya, and ginger maximize sunlight interception on 1 acre.',
      ],
      te: [
        '1 గ్రాము దేశీ ఆవు పేడలో 500 కోట్లకు పైగా ఉపయోగకర సూక్ష్మజీవులు ఉంటాయని శాస్త్రీయ నిర్ధారణ.',
        'కృత్రిమ యూరియా వాడకం వల్ల నేలలోని సహజ శిలీంధ్రాలు చనిపోయి భూమి గట్టి రాతిలా ఎలా మారుతుంది.',
        'బహుళ అంతస్తుల పంటల సాగు: మునగ, అరటి, బొప్పాయి, అల్లం ఒకే పొలంలో సాగుచేసి ఏడాది పొడవునా ఆదాయం పొందే విధానం.',
      ],
      hi: [
        '1 ग्राम देसी गाय के गोबर में 500 करोड़ से अधिक लाभकारी जीवाणु और कवक मौजूद होते हैं।',
        'अत्यधिक रासायनिक यूरिया से जमीन सख्त क्यों हो जाती है और केचुए जमीन में 10 फीट नीचे क्यों भाग जाते हैं।',
        'बहुमंजिला खेती: सहजन, केला, पपीता और अदरक की एक साथ खेती से प्रति एकड़ लाखों की शुद्ध कमाई।',
      ],
    },
    tableOfContents: [
      '1. Editorial: Reversing Desertification through Community Soil Stewardship',
      '2. Microbiology of Jeevamrutha: Population Dynamics of Nitrogen Fixers & P-Solubilizers',
      '3. Acchadana (Mulching): Soil Temperature Regulation & Moisture Conservation',
      '4. Economic Balance Sheet: 5-Acre Chemical vs 5-Acre Natural Farming over 5 Years',
    ],
    fullArticleText: {
      en: `### The Living Soil: Rebuilding Earth's Microbiome

Modern industrial agriculture has treated soil as an inert mechanical medium to hold plant roots while pouring synthetic nitrogen, phosphorus, and potassium. The consequences across Indian farmlands are alarming: soil organic carbon (SOC) in many irrigated tracts has plummeted below 0.4%, rendering fields virtually sterile without constant external chemical infusions.

#### The 4 Pillars of Zero Budget Natural Farming (ZBNF)
1. **Bijamrutha (Seed Treatment)**: Coating seeds with cow dung, cow urine, lime, and virgin forest soil immunizes seedlings against seed-borne and soil-borne fungal pathogens.
2. **Jeevamrutha (Microbial Inoculant)**: A catalytic fermentation broth that does not act as a direct fertilizer, but as a culture medium that introduces 500+ species of soil-revitalizing bacteria and protozoa.
3. **Acchadana (Mulching)**: Covering the topsoil with straw, dry leaves, and live legume cover crops keeps the soil temperature below 28°C, preventing microbial death and reducing irrigation needs by 70%.
4. **Whaphasa (Soil Aeration)**: Ensuring the soil contains a 50:50 equilibrium of water vapor and air pockets rather than standing floodwater.`,
      te: `### సజీవ భూమి: నేల తల్లికి ప్రాణం పోసే ప్రకృతి వ్యవసాయం

రసాయనిక ఎరువులు నేలను కేవలం మొక్కలను నిలబెట్టే ఆధారంగా మార్చివేశాయి. ఫలితంగా మన పొలాల్లో సేంద్రీయ కర్బనం ప్రమాదకరంగా 0.3% కి పడిపోయింది. దీనిని పునరుద్ధరించే 4 మూలస్తంభాలు:

#### ప్రకృతి వ్యవసాయ 4 సూత్రాలు:
1. **బీజామృతం (విత్తన శుద్ధి)**: ఆవు పేడ, గోమూత్రం, సున్నం, పుట్టమట్టితో విత్తన శుద్ధి చేయడం వల్ల విత్తనం మొలకెత్తిన నాటి నుండే తెగుళ్ళ నుండి రక్షణ లభిస్తుంది.
2. **జీవామృతం (సూక్ష్మజీవుల అమృతం)**: ఇది ఎరువు కాదు; భూమిలో నిద్రాణంగా ఉన్న కోట్ల సూక్ష్మజీవులను మేల్కొలిపే ఉత్ప్రేరకం.
3. **ఆచ్ఛాదన (మల్చింగ్)**: ఎండు గడ్డి, ఆకులతో నేలను కప్పి ఉంచడం వల్ల నేలలో తేమ ఆవిరి కాకుండా ఉండి, ఎండ తీవ్రతకు సూక్ష్మజీవులు చనిపోకుండా రక్షణ కలుగుతుంది.
4. **వాఫాస (గాలి మరియు తేమ సమతుల్యత)**: పంటకు వరదలా నీరు పెట్టడం కాకుండా, వేర్లకు గాలి మరియు తేమ రెండూ అందేలా చూసుకోవడం.`,
      hi: `### सजीव मिट्टी: धरती माता को नया जीवन देने वाली प्राकृतिक खेती

लगातार रासायनिक खादों के प्रयोग से खेतों में जैविक कार्बन घटकर 0.3% रह गया है। इसे पुनः जीवित करने के 4 आधार स्तंभ:

#### शून्य बजट प्राकृतिक खेती के 4 सूत्र:
1. **बीजामृत (बीज शोधन)**: देसी गाय के गोबर, गोमूत्र और चूने से बीज का संस्कार करने पर बीज जनित रोगों से 100% सुरक्षा मिलती है।
2. **जीवामृत (जीवाणुओं का महासागर)**: यह खाद नहीं, बल्कि भूमि के सूक्ष्मजीवों को भोजन देकर सक्रिय करने वाला जादुई टॉनिक है।
3. **आच्छादन (मल्चिंग)**: खेत को फसल अवशेषों या पुआल से ढकने से वाष्पीकरण रुकता है और केंचुए ऊपर आकर दिन-रात जमीन को उपजाऊ बनाते हैं।
4. **वापसा (हवा व नमी का संतुलन)**: खेत को पानी में डुबोने के बजाय केवल जड़ क्षेत्र में नमी बनाए रखना ताकि पौधों की जड़ें खुलकर सांस ले सकें।`,
    },
  },
  {
    id: 'lib_monthly_women_society',
    title: {
      en: 'International Women, Society & Leadership Review',
      te: 'అంతర్జాతీయ మహిళలు, సమాజం & నాయకత్వ మాసపత్రిక',
      hi: 'अंतर्राष्ट्रीय महिला, समाज एवं नेतृत्व समीक्षा',
    },
    subtitle: {
      en: 'Grassroots self-help groups, community health networks, women entrepreneurship, and legal protection.',
      te: 'స్వయం సహాయక సంఘాలు (SHG), మహిళా పారిశ్రామికవేత్తలు, డ్వాక్రా విజయగాథలు మరియు చట్టపరమైన హక్కులు.',
      hi: 'महिला स्वयं सहायता समूह (एसएचजी), ग्रामीण उद्यमिता, स्वास्थ्य नेटवर्क और महिला कानूनी अधिकारों पर मासिक शोध।',
    },
    periodicity: 'monthly',
    category: 'women_society',
    authorPublisher: 'WOMENE Society Council & Center for Grassroots Social Innovation',
    edition: 'Vol. 10 • Issue 112',
    publicationDate: 'Published on 15th of Every Month',
    readTime: '11 min read',
    coverGradient: 'from-pink-950 via-purple-900 to-rose-950',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['SHG', 'Women Leadership', 'Empowerment', 'Rural Economy'],
    pdfDownloadName: 'Women_Society_Leadership_Monthly.pdf',
    summary: {
      en: 'Features pioneering stories of rural women building multi-crore collective enterprises in cold-pressed oils, handmade textiles, elderly home care services, and community safety patrolling.',
      te: 'గానుగ నూనెలు, చేనేత వస్త్రాలు, వృద్ధుల సంరక్షణ సేవలు మరియు గ్రామ రక్షణ ద్వారా మహిళలు ఆర్థిక స్వయం సమృద్ధి సాధించిన స్ఫూర్తిదాయక కథనాలు.',
      hi: 'कोल्ड प्रेस्ड तेल, हस्तशिल्प, बुजुर्गों की सेवा और स्वयं सहायता समूहों के माध्यम से करोड़पति बनने वाली ग्रामीण महिलाओं की प्रेरक कहानियां।',
    },
    highlights: {
      en: [
        'How 1,200 women in Andhra Pradesh built a ₹4.2 Crore cold-pressed edible oil brand through village clusters.',
        'Legal rights handbook: Property succession, domestic protection (Sec 498A), and free legal aid helpline 15100.',
        'WOMENE Community Network Model: Combining elder care, baby care, and emergency response into paid livelihood dignity.',
      ],
      te: [
        'ఆంధ్రప్రదేశ్ లో 1,200 మంది మహిళలు కలిసి ప్రారంభించిన గానుగ నూనెల వ్యాపారం ₹4.2 కోట్ల టర్నోవర్ సాధించిన వైనం.',
        'మహిళా చట్టపరమైన హక్కులు: ఆస్తి హక్కు, గృహహింస నుండి రక్షణ మరియు ఉచిత న్యాయ సహాయ హెల్ప్‌లైన్ 15100.',
        'WOMENE కేర్ నెట్‌వర్క్: వృద్ధుల సంరక్షణ, పిల్లల సంరక్షణ మరియు అత్యవసర సాయాన్ని గౌరవప్రదమైన ఉపాధిగా మార్చిన విధానం.',
      ],
      hi: [
        '1,200 ग्रामीण महिलाओं ने मिलकर शुद्ध कच्ची घानी तेल का ₹4.2 करोड़ का ब्रांड कैसे खड़ा किया।',
        'महिलाओं के कानूनी अधिकार: पैतृक संपत्ति अधिकार, घरेलू हिंसा से सुरक्षा और निःशुल्क कानूनी सहायता हेल्पलाइन 15100।',
        'WOMENE मॉडल: बुजुर्गों की देखभाल और आपातकालीन सुरक्षा को सम्मानित आजीविका बनाने का अभिनव सामाजिक ढांचा।',
      ],
    },
    tableOfContents: [
      '1. Collective Power: The Rise of Women-Led Micro-Mandi Hubs',
      '2. Financial Independence: Micro-Credit, Interest Subvention & Mudra Loans',
      '3. Healthcare at the Doorstep: Training ASHA and Village Care Coordinators',
      '4. Voices from the Field: Overcoming Social Stigma in Rural Tech Adoption',
    ],
    fullArticleText: {
      en: `### The Power of Local Collectives: Redefining Grassroots Leadership

When women organize, economic and social landscapes transform with unprecedented velocity. The WOMENE movement demonstrates that rural and semi-urban women possess the innate capability, empathy, and organizational resilience required to run complex human-support services.

#### The Micro-Enterprise Pipeline
In clusters across Karnataka, Telangana, and Andhra Pradesh, self-help groups have transitioned from passive savings entities into active business enterprises:
- **Village Food Kitchens**: Delivering hygienically cooked traditional meals and millet snack boxes to urban commuters.
- **Elderly Companionship**: Certified community caregivers providing dignified home assistance to elderly residents whose children work abroad.
- **Direct Marketplace**: Supplying cold-pressed groundnut, sesame, and coconut oils directly to conscious consumers, cutting out corporate packaging intermediaries.`,
      te: `### గ్రామీణ మహిళా విప్లవం: స్వయం ఉపాధి నుండి ఆర్థిక స్వాతంత్ర్యం వైపు

మహిళలు సంఘటితమైనప్పుడు సమాజంలో అద్భుతమైన మార్పులు సంభవిస్తాయి. WOMENE వేదిక ద్వారా గ్రామీణ మహిళలు కేవలం ఇంటి పనులకే పరిమితం కాకుండా, సమాజానికి అవసరమైన సంరక్షణ సేవలను వ్యాపారాలుగా మలుస్తున్నారు:

#### విజయవంతమైన రంగాల విశ్లేషణ:
- **ఇంటి భోజన సేవలు**: పరిశుభ్రమైన ఇంటి వంటలను కార్యాలయాలకు, వృద్ధులకు అందించే లంచ్ బాక్స్ సేవలు.
- **వృద్ధుల ఆత్మీయ సంరక్షణ**: విదేశాల్లో పిల్లలు ఉన్న వృద్ధులకు నిత్యం తోడుగా ఉంటూ, మందులు వేస్తూ ప్రేమగా చూసుకునే ధృవీకృత కేర్‌టేకర్లు.
- **గానుగ నూనెలు & సిరిధాన్యాలు**: రసాయనాలు లేని స్వచ్ఛమైన నూనెలను సొంతంగా తీసి, నేరుగా వినియోగదారుల ఇళ్లకే పంపిణీ చేయడం.`,
      hi: `### ग्रामीण नारी शक्ति: आत्मनिर्भरता से सशक्त समाज का निर्माण

जब महिलाएं एकजुट होती हैं, तो समाज और अर्थव्यवस्था दोनों की दिशा बदल जाती है। WOMENE अभियान ने सिद्ध किया है कि महिलाएं स्थानीय देखभाल और उद्यम दोनों को उच्चतम स्तर पर संचालित कर सकती हैं:

#### प्रमुख सफल उद्यम:
- **पारंपरिक घर का भोजन**: कार्यालयों और छात्रों को पौष्टिक, स्वच्छ भोजन के डिब्बे पहुंचाने वाली सामूहिक रसोई।
- **बुजुर्गों की ममतामयी सेवा**: अकेले रहने वाले वृद्धजनों को घर पर स्वास्थ्य व साथी सहायता देने वाली प्रशिक्षित बहनें।
- **शुद्ध देसी उत्पादों की सीधी बिक्री**: देशी गाय का घी, कच्ची घानी का तेल और जैविक अनाजों की सीधी आपूर्ति।`,
    },
  },

  // DIGITAL BOOKS
  {
    id: 'lib_book_zbnf_master',
    title: {
      en: 'Zero Budget Natural Farming (ZBNF) & Jeevamrutha Master Manual',
      te: 'జీరో బడ్జెట్ ప్రకృతి వ్యవసాయం & జీవామృతం సమగ్ర కరదీపిక',
      hi: 'शून्य बजट प्राकृतिक खेती एवं संपूर्ण जीवामृत निर्माण हस्तपुस्तिका',
    },
    subtitle: {
      en: 'Complete authoritative reference guide with formulation tables, pest trap blueprints, and crop calendars.',
      te: 'రైతులకు పూర్తి మార్గదర్శక పుస్తకం: జీవామృతం తయారీ, లింగాకర్షక బుట్టలు, కషాయాలు మరియు పంటల క్యాలెండర్.',
      hi: 'किसानों के लिए प्रामाणिक संदर्भ ग्रंथ: प्राकृतिक खाद, कीट नियंत्रक काढ़े और संपूर्ण फसल चक्र सारणी।',
    },
    periodicity: 'book',
    category: 'agriculture_farming',
    authorPublisher: 'Dr. Krishna Chaitanya & Natural Farming Master Agronomists',
    edition: 'Second Expanded Edition (320 Pages)',
    publicationDate: 'Permanent Reference Library',
    readTime: '45 min comprehensive extract',
    coverGradient: 'from-emerald-900 via-green-800 to-amber-950',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['ZBNF Book', 'Manual', 'Organic Agriculture', 'Subhash Palekar Wisdom'],
    pdfDownloadName: 'ZBNF_Master_Manual_WOMENE.pdf',
    summary: {
      en: 'The definitive handbook detailing how 1 native cow can sustain 30 acres of fertile farmland with zero market-purchased chemical inputs, eliminating agricultural debt completely.',
      te: 'ఒక్క దేశీ ఆవుతో 30 ఎకరాల వ్యవసాయాన్ని రూపాయి ఖర్చు లేకుండా ఎలా చేయవచ్చో తెలియజేసే సమగ్ర శాస్త్రీయ పుస్తకం.',
      hi: 'मात्र एक देशी गाय के सहारे 30 एकड़ भूमि में बिना किसी बाजारू खाद-कीटनाशक के लाखों की उपज लेने का संपूर्ण ग्रंथ।',
    },
    highlights: {
      en: [
        'Formulation ratios for Bijamrutha, Jeevamrutha, Ghana Jeevamrutha, and Saptadhanyankura Kashayam.',
        'Biological pest controls: Neemasthram, Agniastram, Brahmastram, and Sour Buttermilk spray.',
        '30-Acre Model: Multi-cropping schedules for paddy, cotton, chilli, groundnut, pulses, and vegetables.',
      ],
      te: [
        'బీజామృతం, ద్రవ జీవామృతం, ఘన జీవామృతం, సప్తధాన్యాంకుర కషాయం తయారీ కొలతలు.',
        'నీమాస్త్రం, అగ్నిఅస్త్రం, బ్రహ్మాస్త్రం, పుల్లటి మజ్జిగ ద్రావణాల పూర్తి వివరాలు.',
        'వరి, పత్తి, మిర్చి, వేరుశనగ పంటల వారీగా రక్షణ పట్టికలు.',
      ],
      hi: [
        'बीजामृत, जीवामृत, घन जीवामृत और सप्तधान्यांकुर काढ़ा बनाने की सटीक वैज्ञानिक मात्राएं।',
        'जैविक कीटनाशक: नीमास्त्र, आग्नेयास्त्र, ब्रह्मास्त्र और खट्टी छाछ के उपयोग का समय।',
        'धान, कपास, मिर्च, दलहन और तिलहन फसलों का संपूर्ण प्राकृतिक सुरक्षा चक्र।',
      ],
    },
    tableOfContents: [
      'Chapter 1: The Crisis of Chemical Agriculture & The Philosophy of Natural Farming',
      'Chapter 2: The Native Cow (Bos Indicus) - Sanctuary of 500 Crore Microbes',
      'Chapter 3: Master Formulations (Bijamrutha, Jeevamrutha, Ghana Jeevamrutha)',
      'Chapter 4: Pest & Fungal Disease Management Using Botanical Decoctions',
      'Chapter 5: Water Management, Microclimate & Whaphasa Principles',
      'Chapter 6: Five-Layer Multitier Orchard Model (Model Farm Blueprint)',
    ],
    fullArticleText: {
      en: `### CHAPTER 3: Master Formulations & Field Protocols

#### 1. Bijamrutha (Seed Immunization Protocol)
Bijamrutha coats every seed with millions of beneficial nitrogen-fixing and phosphate-solubilizing microbes while forming an antifungal bio-barrier.

**Ingredients for treating seeds for 1 Acre (approx. 20-30kg seeds):**
- 5 kg fresh native (Desi) cow dung
- 5 liters native cow urine
- 50 grams edible slaked lime (Chuna)
- A handful of fertile live soil from a tree base
- 20 liters clean non-chlorinated water

**Protocol:**
1. Tie the cow dung loosely in a cotton cloth bag and suspend it in 20 liters of water for 12 hours.
2. Squeeze the dung bag repeatedly into the water to extract all soluble microbial extracts.
3. Add the cow urine, virgin soil, and pre-dissolved slaked lime water.
4. Spread seeds on a clean tarp; sprinkle Bijamrutha evenly and gently rub with hands so every seed is coated without damaging the seed coat.
5. Dry in shade for 2 hours before sowing.

#### 2. Ghana Jeevamrutha (Solid Granular Bio-Manure)
For rainfed lands or when liquid irrigation is unavailable:
- 100 kg dried native cow dung powder
- 10 liters concentrated Jeevamrutha liquid
- 2 kg pulse flour + 2 kg jaggery
Mix thoroughly into a crumbly moist consistency. Cover with gunny bags for 48 hours in shade. Dry in shade and store. Broadcast 100-200 kg per acre during land preparation or basal dressing.`,
      te: `### అధ్యాయం 3: మాస్టర్ ఫార్ములాలు & తయారీ విధానాలు

#### 1. బీజామృతం (విత్తన శుద్ధి పద్ధతి)
విత్తనం ద్వారా మరియు నేల ద్వారా వచ్చే తెగుళ్ళను అరికట్టడానికి బీజామృతం ఒక రక్షా కవచం.

**ఎకరానికి అవసరమైన విత్తనాల శుద్ధికి పదార్థాలు:**
- దేశీ ఆవు పేడ: 5 కేజీలు
- దేశీ గోమూత్రం: 5 లీటర్లు
- తమలపాకులకు రాసే సున్నం: 50 గ్రాములు
- పుట్టమట్టి లేదా పెద్ద చెట్టు కింద సారవంతమైన మట్టి: దోసెడు
- శుభ్రమైన నీరు: 20 లీటర్లు

**తయారీ విధానం:**
1. ఆవు పేడను గుడ్డలో మూటకట్టి 20 లీటర్ల నీటిలో 12 గంటలు నానబెట్టండి.
2. ఆ మూటను బాగా పిండి పేడలోని సారాన్ని నీటిలోకి తీయండి.
3. ఆ నీటిలో గోమూత్రం, సున్నం నీరు మరియు పుట్టమట్టిని కలిపి బాగా కలపండి.
4. విత్తనాలను పట్టాపై పరచి, బీజామృతాన్ని చల్లి చేతులతో విత్తనాలకు పట్టించండి.
5. నీడలో 2 గంటలు ఆరబెట్టి వెంటనే విత్తుకోండి.

#### 2. ఘన జీవామృతం (పొడి ఎరువు)
నీటి వసతి తక్కువగా ఉన్న మెట్ట భూములకు ఇది అత్యుత్తమం. 100 కేజీల ఆవు పేడ పొడిలో 10 లీటర్ల జీవామృతాన్ని కలిపి, 2 రోజులు నీడలో ఉంచి ఆరబెట్టాలి. పొలం దున్నే సమయంలో ఎకరానికి 100-200 కేజీలు చల్లుకోవాలి.`,
      hi: `### अध्याय 3: मुख्य निर्माण विधियां एवं कृषि निर्देशिका

#### 1. बीजामृत (संपूर्ण बीज संस्कार विधि)
बीज जनित फफूंद और दीमक से फसल को बचाने के लिए बीजामृत अचूक है।

**प्रति एकड़ बीज (20-30 किग्रा) हेतु सामग्री:**
- 5 किग्रा ताजा देसी गाय का गोबर
- 5 लीटर गोमूत्र
- 50 ग्राम खाने का चूना
- 1 मुट्ठी खेत की मेड़ की सजीव मिट्टी
- 20 लीटर साफ पानी

**बनाने की विधि:**
1. गोबर को कपड़े में बांधकर 20 लीटर पानी में रातभर लटकाएं।
2. सुबह कपड़े को निचोड़कर सारा रस पानी में मिला लें।
3. इसमें गोमूत्र, चूने का घोल और मिट्टी मिलाकर लकड़ी से हिलाएं।
4. बीजों को तिरपाल पर फैलाकर बीजामृत हल्के हाथों से लगाएं ताकि छिलका न टूटे।
5. छाया में 2 घंटे सुखाकर बुवाई करें।

#### 2. घन जीवामृत (सूखी जैविक खाद)
100 किग्रा सूखे गोबर की खाद में 10 लीटर तरल जीवामृत मिलाकर 48 घंटे टाट के बोरे से ढककर रखें। सूखने पर खेत की जुताई के समय प्रति एकड़ 100-200 किग्रा बिखेरें।`,
    },
  },
  {
    id: 'lib_book_charaka_home_care',
    title: {
      en: 'Charaka Samhita & Traditional Home Remedies Compendium',
      te: 'చరక సంహిత & సాంప్రదాయ గృహ వైద్య రత్నావళి',
      hi: 'चरक संहिता एवं प्रामाणिक घरेलू उपचार संग्रह',
    },
    subtitle: {
      en: 'Classical Ayurvedic principles translated into accessible everyday kitchen and herbal home wellness.',
      te: 'ఆయుర్వేద మూల గ్రంథాల నుండి సేకరించిన వంటింటి ఔషధాలు, త్రిదోషాలు మరియు ఆరోగ్య రహస్యాలు.',
      hi: 'महर्षि चरक के सिद्धांतों पर आधारित रसोई की औषधियों, वात-पित्त-कफ संतुलन व घरेलू नुस्खों का प्रामाणिक संग्रह।',
    },
    periodicity: 'book',
    category: 'medical_health',
    authorPublisher: 'WOMENE Traditional Wisdom Archive & Dr. Krishna Chaitanya',
    edition: 'Classical Wisdom Edition (280 Pages)',
    publicationDate: 'Permanent Reference Library',
    readTime: '35 min comprehensive extract',
    coverGradient: 'from-amber-950 via-yellow-950 to-stone-900',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['Ayurveda Book', 'Charaka Samhita', 'Home Remedies', 'Tri-Dosha'],
    pdfDownloadName: 'Charaka_Samhita_Home_Remedies.pdf',
    summary: {
      en: 'A treasured reference manual detailing the medicinal properties of 50 common Indian herbs and spices, seasonal regimens (Ritucharya), daily routines (Dinacharya), and non-toxic home therapies.',
      te: 'వంటింట్లో దొరికే అల్లం, వెల్లుల్లి, జీలకర్ర, పసుపు మొదలైన 50 రకాల దినుసులతో వందలాది వ్యాధులను తగ్గించుకునే గృహ వైద్య దర్శిని.',
      hi: 'रसोई में उपलब्ध सौंठ, अजवाइन, मेथी, गिलोय और अश्वगंधा के चमत्कारी गुणों और ऋतु अनुसार खानपान की संपूर्ण मार्गदर्शिका।',
    },
    highlights: {
      en: [
        'Detailed diagnosis of Vata, Pitta, and Kapha imbalances and their dietary corrections.',
        'Golden kitchen remedies for acute acidity, migraine, joint aches, chronic cough, and insomnia.',
        'Women wellness: Dinacharya for postnatal recovery, breast milk nourishment, and hormone balance.',
      ],
      te: [
        'వాత, పిత్త, కఫ దోషాల లక్షణాలు మరియు ఆహార నియమాల ద్వారా వాటిని సరిదిద్దుకునే పద్ధతులు.',
        'ఎసిడిటీ, తలనొప్పి, కీళ్ల నొప్పులు, దగ్గు మరియు నిద్రలేమికి వంటింటి దివ్య ఔషధాలు.',
        'మహిళా ఆరోగ్యం: బాలింత సంరక్షణ, పాలు పడే ఆహారాలు మరియు హార్మోన్ల సమతుల్యత.',
      ],
      hi: [
        'वात, पित्त और कफ के असंतुलन की पहचान और खानपान से उन्हें तुरंत शांत करने के सूत्र।',
        'अम्लपित्त (एसिडिटी), माइग्रेन, जोड़ों के दर्द और अनिद्रा के लिए दादी-नानी के सिद्ध नुस्खे।',
        'महिला स्वास्थ्य: प्रसवोपरांत स्वास्थ्य लाभ, स्तनपान वृद्धि और मासिक धर्म संतुलन।',
      ],
    },
    tableOfContents: [
      'Section 1: Foundations of Ayurveda (Pancha Mahabhutas & Tridosha)',
      'Section 2: Dinacharya (Daily Morning Cleansing & Rejuvenation Rituals)',
      'Section 3: The Healing Kitchen (Materia Medica of 50 Household Spices)',
      'Section 4: Common Ailments & Proven Classical Formulations',
      'Section 5: Rasayana Therapy: Longevity & Cellular Immunity Building',
    ],
    fullArticleText: {
      en: `### Section 3: The Healing Kitchen: Ancient Formulations

In classical Ayurveda, food is medicine (*Ahara eva Aushadham*). When food is correct, medicine is of no need; when food is incorrect, medicine is of no use.

#### 1. Deep Acid Reflux & Hyperacidity (Amlapitta)
- **Root Cause**: Aggravated Pitta dosha causing burning sensations in epigastrium and sour belching.
- **Immediate Kitchen Remedy**:
  - 1 teaspoon crushed coriander seeds (Dhaniya) + 1 teaspoon fennel seeds (Saunf) soaked overnight in 1 glass of water.
  - Strain in the morning, mix with 1/2 teaspoon organic crystal rock sugar (Mishri), and drink on empty stomach.
  - Pitta is neutralized within 20 minutes due to the sweet post-digestive taste (*Madhura Vipaka*) and cooling potency (*Sheeta Virya*).

#### 2. Acute Gas, Bloating & Abdominal Spasms (Adhmana)
- **Root Cause**: Vata stagnation in the colon (*Apana Vayu* obstruction).
- **Remedy**:
  - Warm 1 glass of water with 1/2 teaspoon roasted carom seeds (Ajwain) and a pinch of black salt (Kala Namak).
  - Drink warm. Thymol in Ajwain activates digestive juices (*Jatharagni*) and expels trapped intestinal gas within minutes.`,
      te: `### విభాగం 3: వంటిల్లే వైద్యశాల - ఆయుర్వేద రహస్యాలు

ఆహారమే ఔషధం అనేది ఆయుర్వేద పరమ సత్యం. సరైన ఆహారం తీసుకుంటే మందులతో పనేలేదు:

#### 1. ఎసిడిటీ & గుండెల్లో మంట (ఆమ్లపిత్తం)
- **కారణం**: శరీరంలో పిత్త దోషం పెరగడం వల్ల కడుపులో మంట, పుల్లటి తేన్పులు వస్తాయి.
- **ఇంటి చిట్కా**:
  - 1 చెంచా ధనియాలు + 1 చెంచా సోంపు గింజలను రాత్రిపూట ఒక గ్లాసు నీటిలో నానబెట్టండి.
  - ఉదయాన్నే ఆ నీటిని వడకట్టి, కొద్దిగా పటికబెల్లం పొడి కలిపి పరగడుపున త్రాగండి.
  - ఇది కడుపులోని ఆమ్లత్వాన్ని చల్లబరిచి వెంటనే ఉపశమనం కలిగిస్తుంది.

#### 2. కడుపు ఉబ్బరం & గ్యాస్ సమస్య
- **కారణం**: అపాన వాయువు ఆగిపోవడం వల్ల కడుపుబ్బరం, నొప్పి వస్తుంది.
- **ఇంటి చిట్కా**:
  - ఒక గ్లాసు గోరువెచ్చని నీటిలో అర చెంచా వాము, చిటికెడు నల్ల ఉప్పు వేసి కలిపి త్రాగండి.
  - వాములోని థైమాల్ జీర్ణరసాలను ఉత్తేజపరిచి నిమిషాల్లో గ్యాస్ ను బయటకు పంపుతుంది.`,
      hi: `### अध्याय 3: आरोग्यमयी भारतीय रसोई: सिद्ध नुस्खे

आयुर्वेद के अनुसार यदि आपका खानपान सही है, तो किसी दवा की आवश्यकता नहीं है:

#### 1. भयंकर एसिडिटी और सीने में जलन (अम्लपित्त)
- **कारण**: शरीर में पित्त का बढ़ना।
- **सरल उपाय**:
  - 1 चम्मच साबुत धनिया और 1 चम्मच सौंफ को रात में 1 गिलास पानी में भिगो दें।
  - सुबह छानकर उसमें थोड़ी मिश्री मिलाकर खाली पेट पिएं। यह पित्त को शांत कर तुरंत ठंडक पहुंचाता है।

#### 2. पेट में गैस, अफरा व मरोड़
- **कारण**: पेट में अपान वायु का रुकना।
- **सरल उपाय**:
  - आधा चम्मच भुनी हुई अजवाइन और 1 चुटकी काला नमक गुनगुने पानी के साथ फांक लें।
  - अजवाइन का थाइमोल तत्व पेट की गैस को 5 मिनट में बाहर निकाल देता है।`,
    },
  },
  {
    id: 'lib_book_gov_schemes',
    title: {
      en: 'Indian Farmer & Rural Citizen Government Schemes Directory',
      te: 'రైతులు & గ్రామీణ పౌరుల ప్రభుత్వ సంక్షేమ పథకాల మార్గదర్శి',
      hi: 'भारतीय किसान एवं ग्रामीण नागरिक सरकारी योजना निर्देशिका',
    },
    subtitle: {
      en: 'The definitive guide to 45+ Central and State welfare, agricultural, subsidy, and emergency support schemes.',
      te: 'రైతులు, మహిళలు మరియు గ్రామీణులకు కేంద్ర, రాష్ట్ర ప్రభుత్వాల 45+ పథకాలు, సబ్సిడీలు, దరఖాస్తు విధానాలు.',
      hi: 'किसानों, महिलाओं और ग्रामीण परिवारों हेतु 45+ केंद्रीय व राज्य योजनाओं, सब्सिडी व आवेदन की सम्पूर्ण जानकारी।',
    },
    periodicity: 'book',
    category: 'women_society',
    authorPublisher: 'Govt Portal Integration Bureau & WOMENE Legal Aid Cell',
    edition: '2026-2027 Updated Edition (240 Pages)',
    publicationDate: 'Permanent Reference Library',
    readTime: '30 min comprehensive extract',
    coverGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    languageAvailable: ['en', 'te', 'hi'],
    tags: ['Government Schemes', 'PM-Kisan', 'PMFBY', 'Subsidies', 'Helplines'],
    pdfDownloadName: 'Govt_Schemes_Rural_Directory.pdf',
    summary: {
      en: 'An exhaustive reference book listing eligibility criteria, required documents, portal links, helpline numbers, and grievance redressal for all major Indian agricultural and rural empowerment schemes.',
      te: 'పీఎం కిసాన్, ఫసల్ బీమా, డ్రోన్ సబ్సిడీ, రైతు భరోసా, ముద్ర లోన్లు మొదలైన పథకాలకు అర్హతలు, దరఖాస్తు పద్ధతుల సమగ్ర సమాచారం.',
      hi: 'पीएम-किसान, फसल बीमा, कुसुम सोलर पंप, मुद्रा लोन और किसान क्रेडिट कार्ड की पात्रता और सीधे आवेदन का विस्तृत विवरण।',
    },
    highlights: {
      en: [
        'Kisan Credit Card (KCC): 4% subsidized interest rate rules and collateral-free loans up to ₹1.60 Lakhs.',
        'PM-KUSUM: Solar irrigation pump application process step-by-step with state renewable energy agencies.',
        'Emergency Helplines Directory: 112, 108, 1091, 1098, 155261 (PM-Kisan), and 1800-180-1551 (KCC).',
      ],
      te: [
        'కిసాన్ క్రెడిట్ కార్డు (KCC): 4% వడ్డీతో ₹1.60 లక్షల వరకు పూచీకత్తు లేకుండా రుణాల పొందే విధానం.',
        'పీఎం-కుసుమ్ సోలార్ పంపుల దరఖాస్తు మరియు 60% సబ్సిడీ నిబంధనలు.',
        'అత్యవసర హెల్ప్‌లైన్ నంబర్ల డైరెక్టరీ: 112, 108, 1091, 155261 మరియు 1800-180-1551.',
      ],
      hi: [
        'किसान क्रेडिट कार्ड (केसीसी): मात्र 4% ब्याज दर पर ₹1.60 लाख तक बिना गारंटी ऋण की आसान प्रक्रिया।',
        'पीएम-कुसुम सोलर पंप योजना: 60% सरकारी अनुदान हेतु ऑनलाइन आवेदन की संपूर्ण विधि।',
        'आपातकालीन हेल्पलाइन सूची: 112, 108, 1091, 155261 (पीएम किसान) व 1800-180-1551 (कृषि हेल्पलाइन)।',
      ],
    },
    tableOfContents: [
      'Part 1: Direct Income & Investment Support (PM-Kisan, Rythu Bharosa)',
      'Part 2: Farm Mechanization, Solar Energy & Drone Subsidies (SMAM, PM-KUSUM)',
      'Part 3: Risk Mitigation & Insurance (PMFBY, Livestock Insurance)',
      'Part 4: Institutional Credit (Kisan Credit Card, Mudra Loans for Women)',
      'Part 5: Social Security & Pensions (PM Kisan Maandhan, Ayushman Bharat)',
    ],
    fullArticleText: {
      en: `### Part 1 & 2: Key National Agricultural Welfare Schemes

#### 1. Kisan Credit Card (KCC) Scheme
The Kisan Credit Card fulfills farmers' short-term credit requirements for cultivation, post-harvest expenses, and animal husbandry maintenance.
- **Interest Subvention**: While the nominal rate is 9%, the Government of India provides a 2% interest subvention and an additional 3% prompt repayment incentive, bringing the effective interest rate down to just **4% per annum**.
- **Collateral-Free Limit**: Farmers can obtain up to ₹1,60,000 without mortgaging land passbooks or providing collateral.
- **Allied Sectors**: Animal husbandry (dairy, sheep/goat rearing) and poultry farmers are also eligible for working capital credit up to ₹2,00,000 under KCC.

#### 2. PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)
- **Component-B**: Provides 60% subsidy (30% Central + 30% State Govt) for installing standalone solar submersible pumps (3HP, 5HP, 7.5HP) in off-grid rural areas.
- **Component-C**: Solarization of existing grid-connected agriculture pumps. Farmers can irrigate freely and sell excess solar power generated back to state DISCOMs at pre-fixed tariffs.`,
      te: `### భాగం 1 & 2: ప్రముఖ జాతీయ రైతు సంక్షేమ పథకాలు

#### 1. కిసాన్ క్రెడిట్ కార్డు (KCC) పథకం
రైతులు ప్రైవేటు వడ్డీ వ్యాపారుల వద్ద అప్పులు చేసి నష్టపోకుండా ఉండేందుకు ప్రభుత్వం అందించే తక్కువ వడ్డీ రుణ పథకం.
- **కేవలం 4% వడ్డీ రేటు**: సకాలంలో రుణం తిరిగి చెల్లించే రైతులకు కేంద్ర ప్రభుత్వం రాయితీ ఇవ్వడం వల్ల వడ్డీ కేవలం 4 శాతానికే పడుతుంది.
- **భూమి తాకట్టు లేకుండా**: ఎటువంటి భూమి పత్రాలు తాకట్టు పెట్టకుండా ₹1,60,000 వరకు రుణం పొందవచ్చు.
- **పాడి రైతులకు కూడా**: పాడి పశువులు, మేకలు, కోళ్ల పెంపకందారులు కూడా KCC కింద ₹2 లక్షల వరకు తక్కువ వడ్డీ రుణాలు పొందవచ్చు.

#### 2. పీఎం-కుసుమ్ సోలార్ పంపుల పథకం
- బోరుబావులకు 60% సబ్సిడీతో 3HP, 5HP, 7.5HP సామర్థ్యం గల సౌర విద్యుత్ పంపులను అందిస్తారు.
- రాత్రి వేళల్లో కరెంట్ కోసం పొలాల వద్ద నిద్రపోవాల్సిన బాధ తప్పుతుంది; పగటిపూట ఉచిత సౌరశక్తితో నీరు పారుతుంది.`,
      hi: `### भाग 1 व 2: प्रमुख किसान कल्याणकारी योजनाएं

#### 1. किसान क्रेडिट कार्ड (केसीसी) योजना
किसानों को साहूकारों के चंगुल से मुक्त कराने के लिए सरकार की सबसे कल्याणकारी ऋण योजना।
- **मात्र 4% ब्याज दर**: समय पर ऋण चुकाने वाले किसानों को 3% अतिरिक्त छूट मिलने से प्रभावी ब्याज दर केवल 4% वार्षिक रह जाती है।
- **बिना गारंटी ₹1.60 लाख**: बिना किसी जमीन बंधक या गारंटर के ₹1,60,000 तक का ऋण तुरंत स्वीकृत होता है।
- **डेयरी व पशुपालकों के लिए**: गाय-भैंस पालन और मुर्गी पालन करने वाले पशुपालक भी केसीसी पर ₹2 लाख तक का ऋण ले सकते हैं।

#### 2. पीएम-कुसुम सोलर पंप योजना
- डीजल पंपों को हटाने के लिए 60% तक सरकारी अनुदान (30% केंद्र + 30% राज्य)।
- दिन में धूप से फ्री सिंचाई और अतिरिक्त बिजली ग्रिड को बेचकर किसान हर साल हजारों रुपये कमा सकते हैं।`,
    },
  },
];
