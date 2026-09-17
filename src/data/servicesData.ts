import { ServiceItem, Branch } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'food-services',
    category: 'food',
    title: {
      en: 'Food Services',
      te: 'భోజన సేవలు',
      hi: 'भोजन सेवाएं',
    },
    subtitle: {
      en: 'Freshly prepared. Delivered with care.',
      te: 'తాజాగా తయారుచేసినది. శ్రద్ధతో పంపిణీ.',
      hi: 'ताजा तैयार। प्यार और देखभाल से वितरित।',
    },
    description: {
      en: 'Nutritious, hygienic, home-style meals tailored for children, busy working professionals, elders, and families.',
      te: 'పిల్లలు, ఉద్యోగులు, వృద్ధులు మరియు కుటుంబాల కోసం పోషకమైన, పరిశుభ్రమైన ఇంటి భోజనం.',
      hi: 'बच्चों, कामकाजी लोगों, बुजुर्गों और परिवारों के लिए पौष्टिक, स्वच्छ और घर जैसा भोजन।',
    },
    highlights: {
      en: [
        'Home-style fresh hot meals',
        'School lunch boxes for children',
        'Office lunch boxes for working pros',
        'Breakfast & monthly meal subscriptions',
        'Emergency food support during crises'
      ],
      te: [
        'ఇంటి పద్ధతిలో వండిన వేడి భోజనం',
        'పిల్లల కోసం స్కూల్ లంచ్ బాక్సులు',
        'ఉద్యోగుల కోసం ఆఫీస్ లంచ్ బాక్సులు',
        'అల్పాహారం & నెలవారీ మీల్ సబ్‌స్క్రిప్షన్లు',
        'అత్యవసర సమయాల్లో ఆహార సహాయం'
      ],
      hi: [
        'घर जैसा ताजा गर्म खाना',
        'बच्चों के लिए स्कूल लंच बॉक्स',
        'कामकाजी लोगों के लिए ऑफिस लंच बॉक्स',
        'नाश्ता और मासिक भोजन सदस्यता',
        'आपातकाल में खाद्य सहायता'
      ],
    },
    iconName: 'Utensils',
    colorScheme: {
      primary: 'text-amber-700',
      bg: 'bg-amber-50',
      badge: 'bg-amber-100 text-amber-900',
      border: 'border-amber-200',
    },
    popularTag: 'Popular',
  },
  {
    id: 'delivery-daily-care',
    category: 'daily_care',
    title: {
      en: 'Delivery & Daily Care',
      te: 'డెలివరీ & రోజువారీ సంరక్షణ',
      hi: 'दैनिक देखभाल व डिलीवरी',
    },
    subtitle: {
      en: 'Everyday help, whenever you need it.',
      te: 'మీకు అవసరమైనప్పుడల్లా రోజువారీ సహాయం.',
      hi: 'रोजमर्रा की मदद, जब भी आपको जरूरत हो।',
    },
    description: {
      en: 'Prompt local grocery delivery, medicine pickup from authorized pharmacies, essential items, and errand assistance.',
      te: 'కిరాణా సరుకులు, గుర్తింపు పొందిన ఫార్మసీల నుండి మందులు, అవసరమైన వస్తువులు మరియు ఇంటి పనుల్లో సహాయం.',
      hi: 'किराना सामान, अधिकृत फार्मेसियों से दवाएं, आवश्यक सामान और रोजमर्रा के कार्यों में मदद।',
    },
    highlights: {
      en: [
        'Fresh grocery & vegetable delivery',
        'Medicine pickup from authorized pharmacies',
        'Essential household items logistics',
        'Elderly errand & bill payment assistance',
        'Small household chores & package handling'
      ],
      te: [
        'తాజా కిరాణా మరియు కూరగాయల డెలివరీ',
        'ధృవీకృత ఫార్మసీల నుండి ఔషధాల పంపిణీ',
        'అవసరమైన గృహోపకరణాల లాజిస్టిక్స్',
        'వృద్ధులకు బిల్లుల చెల్లింపు & బయటి పనుల్లో సహాయం',
        'ఇంటి చిన్న చిన్న పనుల నిర్వహణ'
      ],
      hi: [
        'ताजा किराना व सब्जी डिलीवरी',
        'अधिकृत फार्मेसी से दवा मंगवाना',
        'घरेलू आवश्यक वस्तुओं की डिलीवरी',
        'बुजुर्गों के बिल भुगतान व बाहरी काम में मदद',
        'घर के छोटे-मोटे कार्यों में सहायता'
      ],
    },
    iconName: 'ShoppingBag',
    colorScheme: {
      primary: 'text-blue-700',
      bg: 'bg-blue-50',
      badge: 'bg-blue-100 text-blue-900',
      border: 'border-blue-200',
    },
  },
  {
    id: 'personal-care-relaxation',
    category: 'personal_care',
    title: {
      en: 'Personal Care & Relaxation',
      te: 'వ్యక్తిగత సంరక్షణ & విశ్రాంతి',
      hi: 'व्यक्तिगत देखभाल व विश्राम',
    },
    subtitle: {
      en: 'A little time for yourself. Rejuvenate & relax.',
      te: 'మీకోసం కాస్త సమయం. ప్రశాంతమైన విశ్రాంతి.',
      hi: 'अपने लिए थोड़ा समय। तनाव मुक्त और तरोताजा।',
    },
    description: {
      en: 'Traditional wellness therapies delivered at home by trained women specialists to relieve physical stress and fatigue.',
      te: 'శారీరక అలసట, ఒత్తిడి తగ్గించేందుకు శిక్షణ పొందిన మహిళా నిపుణుల ద్వారా ఇంటి వద్దే సాంప్రదాయ సంరక్షణ.',
      hi: 'शारीरिक थकान और तनाव दूर करने के लिए प्रशिक्षित महिला विशेषज्ञों द्वारा घर पर पारंपरिक मालिश व देखभाल।',
    },
    highlights: {
      en: [
        'Traditional relaxing head massage',
        'Scalp rejuvenation & acupressure',
        'Ergonomic back & shoulder massage',
        'Stress relief & calming aromatherapy',
        'At-home comfort with verified specialists'
      ],
      te: [
        'సాంప్రదాయ సాంత్వన చేకూర్చే తల మసాజ్',
        'స్కాల్ప్ రిలాక్సేషన్ & ఒత్తిడి నివారణ',
        'వీపు మరియు భుజాల అలసట నివారణ మసాజ్',
        'మానసిక ప్రశాంతత కోసం సువాసనల చికిత్స',
        'నమ్మకమైన మహిళా ప్రతినిధులతో ఇంటి వద్దే సేవ'
      ],
      hi: [
        'पारंपरिक आरामदायक सिर की मालिश',
        'स्कैल्प रिलैक्सेशन व एक्यूप्रेशर',
        'पीठ व कंधों के तनाव निवारक मालिश',
        'तनाव राहत व माइंडफुल विश्राम',
        'सत्यापित विशेषज्ञों द्वारा घर पर सेवा'
      ],
    },
    iconName: 'Sparkles',
    colorScheme: {
      primary: 'text-rose-700',
      bg: 'bg-rose-50',
      badge: 'bg-rose-100 text-rose-900',
      border: 'border-rose-200',
    },
  },
  {
    id: 'travel-companion',
    category: 'travel',
    title: {
      en: 'Travel Companion',
      te: 'ప్రయాణ సహచరులు (ట్రావెల్ కంపానియన్)',
      hi: 'यात्रा साथी (ट्रैवल कम्पेनियन)',
    },
    subtitle: {
      en: 'Travel safe. Travel freely. Company for your journey.',
      te: 'సురక్షితంగా ప్రయాణించండి. మీ ప్రయాణంలో నమ్మకమైన తోడు.',
      hi: 'सुरक्षित यात्रा। निर्भय यात्रा। आपके सफर में भरोसेमंद साथी।',
    },
    description: {
      en: 'Verified women companions for women, children, and elderly travelers across local transit, trains, buses, and flights.',
      te: 'మహిళలు, పిల్లలు మరియు వృద్ధుల కోసం స్థానిక మరియు దూర ప్రాంత ప్రయాణాల్లో తోడుగా ఉండే నమ్మకమైన మహిళా ప్రతినిధులు.',
      hi: 'महिलाओं, बच्चों और बुजुर्गों के लिए स्थानीय व अंतर-राज्यीय बस, ट्रेन और फ्लाइट यात्रा में सत्यापित साथी।',
    },
    highlights: {
      en: [
        'Local city transit accompaniment',
        'Intercity bus, train, & flight companion',
        'Assistance during transit waiting times',
        'Heavy luggage handling support',
        'Live journey sharing with family members'
      ],
      te: [
        'నగరంలో స్థానిక ప్రయాణాల్లో తోడు',
        'రైలు, బస్సు మరియు విమాన ప్రయాణాల్లో సహాయం',
        'స్టేషన్లలో వేచి ఉండే సమయాల్లో తోడుగా ఉండటం',
        'సామాను మోయడంలో మరియు సహాయంలో తోడు',
        'కుటుంబ సభ్యులతో లైవ్ లొకేషన్ షేరింగ్'
      ],
      hi: [
        'शहर में सुरक्षित लोकल यात्रा सहयोग',
        'ट्रेन, बस और हवाई यात्रा में साथ',
        'स्टेशनों पर प्रतीक्षा समय में संगति',
        'भारी सामान उठाने व संभालने में मदद',
        'परिवार के साथ लाइव लोकेशन शेयरिंग'
      ],
    },
    iconName: 'Car',
    colorScheme: {
      primary: 'text-emerald-700',
      bg: 'bg-emerald-50',
      badge: 'bg-emerald-100 text-emerald-900',
      border: 'border-emerald-200',
    },
    popularTag: 'Most Requested',
  },
  {
    id: 'baby-care',
    category: 'baby_care',
    title: {
      en: 'Baby Care & Traditional Bath',
      te: 'శిశు సంరక్షణ & సాంప్రదాయ స్నానం',
      hi: 'शिशु देखभाल व पारंपरिक स्नान',
    },
    subtitle: {
      en: 'Gentle care for your little ones.',
      te: 'మీ చిన్నారి కోసం మాతృత్వపు ప్రేమతో కూడిన సంరక్షణ.',
      hi: 'आपके नन्हे-मुन्नों के लिए कोमल व वात्सल्यपूर्ण देखभाल।',
    },
    description: {
      en: 'Traditional Ayurvedic baby oil massage, Nalugu, herbal warm baths, and postpartum maternal support.',
      te: 'సాంప్రదాయ బేబీ ఆయిల్ మసాజ్, నలుగు పిండి స్నానం, ఆయుర్వేద మూలికా సంరక్షణ మరియు తల్లికి తగిన మార్గదర్శకత్వం.',
      hi: 'पारंपरिक तेल मालिश, नलगु/उबटन स्नान, आयुर्वेदिक देखभाल और नई माताओं के लिए मार्गदर्शन।',
    },
    highlights: {
      en: [
        'Traditional warm herbal oil massage',
        'Authentic Nalugu & gentle bath services',
        'Postnatal mother guidance & soothing',
        'Hygienic, vetted elder mothers as carers',
        'Flexible daily or weekly morning packages'
      ],
      te: [
        'సాంప్రదాయ వెచ్చని నూనె మసాజ్',
        'అసలైన నలుగు పిండి సున్నిత స్నానం',
        'బాలింతలకు సలహాలు మరియు సంరక్షణ',
        'అనుభవజ్ఞులైన మహిళా పెద్దలచే ప్రత్యక్ష సేవ',
        'రోజువారీ లేదా వారపు ప్యాకేజీలు'
      ],
      hi: [
        'पारंपरिक गुनगुने तेल की कोमल मालिश',
        'शुद्ध उबटन व सुरक्षित स्नान सेवा',
        'प्रसवोत्तर माता की देखभाल व मार्गदर्शन',
        'अनुभवी व प्रशिक्षित महिलाओं द्वारा सेवा',
        'दैनिक या साप्ताहिक सुविधाजनक पैकेज'
      ],
    },
    iconName: 'HeartHandshake',
    colorScheme: {
      primary: 'text-pink-700',
      bg: 'bg-pink-50',
      badge: 'bg-pink-100 text-pink-900',
      border: 'border-pink-200',
    },
  },
  {
    id: 'senior-citizens-care',
    category: 'elder_care',
    title: {
      en: 'Elder Care & Senior Family Support',
      te: 'వృద్ధుల సంరక్షణ & కుటుంబ మద్దతు',
      hi: 'बुजुर्गों की देखभाल व पारिवारिक सहयोग',
    },
    subtitle: {
      en: 'Care for a lifetime. Respectful, compassionate.',
      te: 'జీవితాంతం ఆత్మీయత. గౌరవప్రదమైన, దయతో కూడిన సేవ.',
      hi: 'जीवनभर का साथ। सम्मानजनक और स्नेहपूर्ण देखभाल।',
    },
    description: {
      en: 'Dedicated companionship, medicine tracking, clinic visit escorts, and gentle household assistance for seniors.',
      te: 'వృద్ధుల కోసం ప్రత్యేక సహచర్యం, మందుల వేళల పర్యవేక్షణ, ఆసుపత్రికి తోడుగా వెళ్లడం మరియు దైనందిన సహాయం.',
      hi: 'बुजुर्गों के लिए अपनत्व भरा साथ, दवाइयों का ध्यान, डॉक्टर के पास साथ जाना और बातचीत।',
    },
    highlights: {
      en: [
        'Daily check-ins & friendly companionship',
        'Timely medicine reminders & water intake',
        'Hospital & clinic visit accompaniment',
        'Assistance with walking & gentle mobility',
        'Simple large-button interface & family voice updates'
      ],
      te: [
        'రోజువారీ క్షేమ సమాచార విచారణ & ఆత్మీయ సంభాషణ',
        'సరైన సమయానికి మందుల జ్ఞప్తి & పర్యవేక్షణ',
        'వైద్యుల అపాయింట్‌మెంట్లు & ఆసుపత్రికి తోడు',
        'నడక మరియు దైనందిన కదలికల్లో తోడ్పాటు',
        'సులభమైన సంభాషణ & కుటుంబ సభ్యులకు సమాచారం'
      ],
      hi: [
        'दैनिक कुशलक्षेम व आत्मीय बातचीत',
        'समय पर दवा व पानी पीने की याद दिलाना',
        'डॉक्टर के पास और क्लिनिक साथ जाना',
        'टहलने और आवश्यक कार्यों में सहारा देना',
        'परिवार को दैनिक अपडेट व वॉइस सपोर्ट'
      ],
    },
    iconName: 'Users',
    colorScheme: {
      primary: 'text-purple-700',
      bg: 'bg-purple-50',
      badge: 'bg-purple-100 text-purple-900',
      border: 'border-purple-200',
    },
    popularTag: 'Core Pillar',
  },
  {
    id: 'work-learn',
    category: 'work_learn',
    title: {
      en: 'Work & Learn (Women Empowerment)',
      te: 'పని & నైపుణ్యాల శిక్షణ (మహిళా సాధికారత)',
      hi: 'काम और कौशल (महिला सशक्तिकरण)',
    },
    subtitle: {
      en: 'Skills today. Opportunities tomorrow. Earn with dignity.',
      te: 'నేటి నైపుణ్యాలు. రేపటి అవకాశాలు. గౌరవప్రదమైన ఆదాయం.',
      hi: 'आज का कौशल। कल के अवसर। सम्मानजनक आजीविका।',
    },
    description: {
      en: 'Training women as certified caregivers, travel escorts, organic cooks, and digital micro-entrepreneurs.',
      te: 'మహిళలకు సంరక్షకులుగా, ట్రావెల్ ఎస్కార్ట్‌లుగా, సేంద్రీయ వంట నిపుణులుగా శిక్షణ మరియు ఉపాధి అవకాశాలు.',
      hi: 'महिलाओं को प्रमाणित केयरगिवर, ट्रैवल एस्कॉर्ट, ऑर्गेनिक कुक और डिजिटल उद्यमी के रूप में प्रशिक्षण।',
    },
    highlights: {
      en: [
        'Part-time & flexible home-based jobs',
        'Certified caregiving & safety training',
        'Self-defense & emergency first-aid courses',
        'Digital skills & financial literacy',
        'Entrepreneurship support & direct livelihood'
      ],
      te: [
        'పార్ట్-టైమ్ మరియు సౌకర్యవంతమైన గృహ ఆధారిత ఉపాధి',
        'సర్టిఫైడ్ సంరక్షణ & భద్రతా శిక్షణ',
        'ఆత్మరక్షణ & ప్రథమ చికిత్స శిక్షణా తరగతులు',
        'డిజిటల్ నైపుణ్యాలు & ఆర్థిక అక్షరాస్యత',
        'మహిళా వ్యాపారాలకు ప్రోత్సాహం'
      ],
      hi: [
        'पार्ट-टाइम व सुविधाजनक घरेलू कार्य के अवसर',
        'प्रमाणित देखभाल व सुरक्षा प्रशिक्षण',
        'आत्मरक्षा व प्राथमिक चिकित्सा कोर्स',
        'डिजिटल कौशल व वित्तीय साक्षरता',
        'महिला उद्यमिता व आजीविका सहायता'
      ],
    },
    iconName: 'GraduationCap',
    colorScheme: {
      primary: 'text-indigo-700',
      bg: 'bg-indigo-50',
      badge: 'bg-indigo-100 text-indigo-900',
      border: 'border-indigo-200',
    },
  },
  {
    id: 'village-marketplace',
    category: 'village_market',
    title: {
      en: 'Village & Marketplace (Agri & Rural)',
      te: 'గ్రామీణ మార్కెట్ & వ్యవసాయ ఉత్పత్తులు',
      hi: 'ग्रामीण बाज़ार व कृषि उत्पाद',
    },
    subtitle: {
      en: 'From Local to Global. Farm to Market direct.',
      te: 'స్థానిక గ్రామాల నుండి ప్రపంచ స్థాయికి. రైతు నుండి నేరుగా మార్కెట్.',
      hi: 'खेत से सीधे बाज़ार। किसानों और महिला कारीगरों को समर्थन।',
    },
    description: {
      en: 'Connecting rural farmers and women artisans directly to urban consumers for natural foods, seeds, handicrafts, and bio-inputs.',
      te: 'రైతులు మరియు గ్రామీణ మహిళా కళాకారుల సహజ ఉత్పత్తులు, పౌష్టికాహారం మరియు హస్తకళలను నేరుగా వినియోగదారులకు చేర్చడం.',
      hi: 'किसानों और ग्रामीण महिला कारीगरों के शुद्ध उत्पाद, जैविक खाद्य और हस्तशिल्प सीधे उपभोक्ताओं तक पहुंचाना।',
    },
    highlights: {
      en: [
        'Farm to Market direct farmer connections',
        'Handmade rural artifacts & natural textiles',
        'Traditional millets, cold-pressed oils, & spices',
        'Natural farming inputs (Jeevamrutha & Panchagavya)',
        'Plant to Wealth farmer empowerment program'
      ],
      te: [
        'రైతుల నుండి నేరుగా కొనుగోలు వ్యవస్థ',
        'చేతితో చేసిన కళాఖండాలు మరియు వస్త్రాలు',
        'చిరుధాన్యాలు, గానుగ నూనెలు, స్వచ్ఛమైన మసాలాలు',
        'ప్రకృతి వ్యవసాయ ఉత్పాదకాలు (జీవామృతం, పంచగవ్య)',
        'మొక్క నుండి సంపద రైతు ప్రోత్సాహక కార్యక్రమం'
      ],
      hi: [
        'खेत से सीधे खरीद और उचित मूल्य',
        'ग्रामीण हस्तशिल्प और पारंपरिक वस्त्र',
        'पारंपरिक मोटे अनाज (मिलेट्स) व शुद्ध तेल',
        'प्राकृतिक खेती सामग्री (जीवामृत, पंचगव्य)',
        'पौधे से समृद्धि किसान सशक्तिकरण'
      ],
    },
    iconName: 'Store',
    colorScheme: {
      primary: 'text-teal-700',
      bg: 'bg-teal-50',
      badge: 'bg-teal-100 text-teal-900',
      border: 'border-teal-200',
    },
  },
  {
    id: 'emergency-sos',
    category: 'emergency_sos',
    title: {
      en: 'Safety & Emergency SOS',
      te: 'రక్షణ & అత్యవసర SOS',
      hi: 'सुरक्षा और आपातकालीन SOS',
    },
    subtitle: {
      en: 'Help is just a tap away. Within 4 KM radius.',
      te: 'ఒక్క స్పర్శతో సహాయం. 4 కి.మీ పరిధిలోనే సమీప బృందం.',
      hi: 'एक टैप पर मदद। 4 किमी के दायरे में त्वरित सहायता।',
    },
    description: {
      en: 'Immediate emergency alert network notifying verified WOMENE responders, sharing GPS coordinates, and linking to 112/108 services.',
      te: 'సమీపంలోని శిక్షణ పొందిన మహిళా ప్రతినిధులను అప్రమత్తం చేసే తక్షణ SOS వ్యవస్థ మరియు పోలీస్/అంబులెన్స్ అనుసంధానం.',
      hi: 'निकटतम सत्यापित प्रतिनिधियों को अलर्ट भेजने, लाइव लोकेशन शेयर करने और पुलिस/एम्बुलेंस से समन्वय का सुरक्षित तंत्र।',
    },
    highlights: {
      en: [
        'Instant 1-Tap SOS broadcast',
        'Live GPS location sharing with emergency contacts',
        'Rapid alert to verified WOMENE members within 4 km',
        'Seamless routing to 112 Police & 108 Ambulance',
        '24/7 Incident monitoring and follow-up care'
      ],
      te: [
        'తక్షణ 1-ట్యాప్ అత్యవసర SOS బటన్',
        'కుటుంబీకులకు ప్రత్యక్ష జీపీఎస్ లొకేషన్ షేరింగ్',
        '4 కి.మీ లోపల ఉన్న WOMENE సభ్యులకు హెచ్చరిక',
        '112 పోలీస్ మరియు 108 అంబులెన్స్ అనుసంధానం',
        '24/7 పర్యవేక్షణ మరియు రక్షణ తోడ్పాటు'
      ],
      hi: [
        'एक क्लिक पर तत्काल SOS अलर्ट',
        'आपातकालीन संपर्कों को लाइव जीपीएस लोकेशन',
        '4 किमी के दायरे में सत्यापित सदस्यों को सूचना',
        '112 पुलिस व 108 एम्बुलेंस से त्वरित समन्वय',
        '24/7 निगरानी और आवश्यक सुरक्षा सहायता'
      ],
    },
    iconName: 'ShieldAlert',
    colorScheme: {
      primary: 'text-red-700',
      bg: 'bg-red-50',
      badge: 'bg-red-100 text-red-900',
      border: 'border-red-200',
    },
    popularTag: '24/7 Active',
  }
];

export const companyDetails = {
  name: 'WOMENE Society & Technology Platform',
  founder: 'Dr. Krishna Chaitanya & Team',
  contacts: {
    team1: '8125016226',
    team2: '7981967919',
    bookingHelpline: '7989997015',
    apHelpline: '7702635919',
  },
  email: 'emfi.ceo@gmail.com',
  officeLocation: 'White Field Road, 1st Line, Ayyappa Nagar, Bengaluru',
  state: 'Karnataka',
  country: 'India',
  availability: 'Both Offline (At-Home) and Online (Virtual) Available for Booking',
  whatsAppNumber: '7989997015',
  whatsAppDirectLink: 'https://wa.me/917989997015?text=Hello%20WOMENE%20Team%2C%20I%20would%20like%20to%20get%20service',
  branches: [
    {
      id: 'bengaluru',
      name: { en: 'Bengaluru', te: 'బెంగళూరు', hi: 'बेंगलुरु' },
      state: 'Karnataka',
      status: 'head_office',
      phone: '8125016226',
      whatsapp: '7989997015',
      isHeadOffice: true,
    },
    {
      id: 'hyderabad',
      name: { en: 'Hyderabad', te: 'హైదరాబాద్', hi: 'हैदराबाद' },
      state: 'Telangana',
      status: 'active',
      phone: '7981967919',
      whatsapp: '7989997015',
    },
    {
      id: 'secunderabad',
      name: { en: 'Secunderabad', te: 'సికింద్రాబాద్', hi: 'सिकंदराबाद' },
      state: 'Telangana',
      status: 'active',
      phone: '7981967919',
      whatsapp: '7989997015',
    },
    {
      id: 'vijayawada',
      name: { en: 'Vijayawada', te: 'విజయవాడ', hi: 'विजयवाड़ा' },
      state: 'Andhra Pradesh',
      status: 'active',
      phone: '7702635919',
      whatsapp: '7989997015',
    },
    {
      id: 'visakhapatnam',
      name: { en: 'Visakhapatnam', te: 'విశాఖపట్నం', hi: 'विशाखापट्टनम' },
      state: 'Andhra Pradesh',
      status: 'active',
      phone: '7702635919',
      whatsapp: '7989997015',
    },
    {
      id: 'chennai',
      name: { en: 'Chennai', te: 'చెన్నై', hi: 'चेन्नई' },
      state: 'Tamil Nadu',
      status: 'active',
      phone: '8125016226',
      whatsapp: '7989997015',
    },
    {
      id: 'mumbai',
      name: { en: 'Mumbai', te: 'ముంబై', hi: 'मुंबई' },
      state: 'Maharashtra',
      status: 'active',
      phone: '8125016226',
      whatsapp: '7989997015',
    },
    {
      id: 'pune',
      name: { en: 'Pune', te: 'పూణే', hi: 'पुणे' },
      state: 'Maharashtra',
      status: 'active',
      phone: '8125016226',
      whatsapp: '7989997015',
    },
    {
      id: 'bhubaneswar',
      name: { en: 'Bhubaneswar', te: 'భువనేశ్వర్', hi: 'भुवनेश्वर' },
      state: 'Odisha',
      status: 'active',
      phone: '7981967919',
      whatsapp: '7989997015',
    },
  ] as Branch[],
  expansionRoadmap: {
    en: 'Shortly starting operations in all Andhra Pradesh (AP) and Telangana mandal and zilla (district) headquarters to build an interconnected grassroots network.',
    te: 'త్వరలో ఆంధ్రప్రదేశ్ మరియు తెలంగాణలోని ప్రతి మండల మరియు జిల్లా కేంద్రాల్లో WOMENE శాఖలు ప్రారంభం కానున్నాయి.',
    hi: 'जल्द ही आंध्र प्रदेश (AP) और तेलंगाना के प्रत्येक मंडल और जिला मुख्यालय में WOMENE केंद्रों की शुरुआत की जा रही है।',
  },
  impactStats: [
    { number: '10,000+', label: { en: 'Lives Supported', te: 'ఆదుకున్న కుటుంబాలు', hi: 'लाभान्वित परिवार' } },
    { number: '5,000+', label: { en: 'Services Delivered', te: 'పూర్తయిన సేవలు', hi: 'सफल सेवाएं' } },
    { number: '2,000+', label: { en: 'Trained Women Reps', te: 'శిక్షణ పొందిన మహిళలు', hi: 'प्रशिक्षित महिलाएं' } },
    { number: '500+', label: { en: 'Village Farm Products', te: 'గ్రామీణ ఉత్పత్తులు', hi: 'ग्रामीण उत्पाद' } },
    { number: '100+', label: { en: 'Active Communities', te: 'కమ్యూనిటీలు', hi: 'सक्रिय समुदाय' } },
    { number: '4 KM', label: { en: 'Target Response Radius', te: 'సమీప సేవా పరిధి', hi: 'निकटतम सेवा दायरा' } },
  ]
};
