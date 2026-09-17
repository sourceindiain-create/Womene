import React, { useState } from 'react';
import { 
  Store, 
  Sprout, 
  Wheat, 
  ShoppingBag, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Heart
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';

interface VillageMarketplaceProps {
  language: Language;
  onOpenBooking: () => void;
}

export const VillageMarketplaceSection: React.FC<VillageMarketplaceProps> = ({
  language,
  onOpenBooking,
}) => {
  const t = translations[language];

  const products = [
    {
      id: 'natural-bio-inputs',
      name: {
        en: 'Natural Bio-Inputs (Jeevamrutha & Panchagavya)',
        te: 'ప్రకృతి వ్యవసాయ ఉత్పాదకాలు (జీవామృతం & పంచగవ్య)',
        hi: 'प्राकृतिक खेती उत्पाद (जीवामृत एवं पंचगव्य)',
      },
      category: { en: 'Agri & Soil Health', te: 'నేల ఆరోగ్యం', hi: 'मृदा स्वास्थ्य' },
      desc: {
        en: 'Fermented microbial bio-fertilizers prepared with indigenous desi cow dung & urine, jaggery, and pulse flour for soil revitalization.',
        te: 'దేశీ ఆవు పేడ, మూత్రం, బెల్లం మరియు పప్పుల పిండితో తయారు చేసిన సూక్ష్మజీవుల సహజ ఎరువులు.',
        hi: 'देशी गाय के गोबर, गोमूत्र और गुड़ से तैयार प्राकृतिक सूक्ष्मजीवी उर्वरक जो मिट्टी की उर्वरता बढ़ाते हैं।',
      },
      origin: 'Kurnool & Warangal Farmers Collective',
      tag: 'Eco-Certified',
    },
    {
      id: 'organic-millets',
      name: {
        en: 'Traditional Millets & Stone-Ground Flours',
        te: 'సాంప్రదాయ చిరుధాన్యాలు & రాగి పిండి',
        hi: 'पारंपरिक मोटे अनाज (मिलेट्स) व रागी',
      },
      category: { en: 'Wholesome Food', te: 'పౌష్టికాహారం', hi: 'पौष्टिक आहार' },
      desc: {
        en: 'Unpolished Foxtail (Korra), Little, Kodo, and Finger Millet (Ragi) sourced directly from dryland marginal farmers.',
        te: 'పాలిష్ చేయని కొర్రలు, అరికెలు, సాములు మరియు రాగులు - నేరుగా రైతుల నుండి.',
        hi: 'बिना पॉलिश किए कंगनी, कोदो और रागी के पौष्टिक अनाज - सीधे किसानों से।',
      },
      origin: 'Anantapur & Mahbubnagar Clusters',
      tag: 'Direct Farm',
    },
    {
      id: 'cold-pressed-oils',
      name: {
        en: 'Wood-Pressed (Gaana) Edible Oils',
        te: 'కట్టెల గానుగ స్వచ్ఛమైన వంట నూనెలు',
        hi: 'लकड़ी की घानी का शुद्ध तेल',
      },
      category: { en: 'Pure Food', te: 'స్వచ్ఛమైన ఆహారం', hi: 'शुद्ध खाद्य' },
      desc: {
        en: 'Cold-extracted groundnut, sesame, and safflower oils maintaining natural aroma, vitamin E, and antioxidants without chemical refining.',
        te: 'రసాయనాలు లేని స్వచ్ఛమైన వేరుశనగ, నువ్వుల మరియు కుసుమ నూనెలు.',
        hi: 'रासायनिक रिफाइनिंग के बिना कोल्ड-प्रेस्ड शुद्ध मूंगफली और तिल का तेल।',
      },
      origin: 'Guntur & Medak Rural Units',
      tag: '100% Pure',
    },
    {
      id: 'artisan-crafts',
      name: {
        en: 'Handmade Rural Crafts & Handloom Essentials',
        te: 'గ్రామీణ మహిళా హస్తకళలు & చేనేత వస్త్రాలు',
        hi: 'ग्रामीण महिला हस्तशिल्प व हथकरघा वस्त्र',
      },
      category: { en: 'Livelihood', te: 'ఉపాధి పథకం', hi: 'महिला आजीविका' },
      desc: {
        en: 'Handcrafted bags, natural clay cookware, and organic cotton kitchen textiles crafted by rural women self-help groups.',
        te: 'మహిళా స్వయం సహాయక సంఘాలు తయారు చేసిన మట్టి పాత్రలు, చేతి సంచులు మరియు కాటన్ వస్త్రాలు.',
        hi: 'स्वयं सहायता समूहों द्वारा निर्मित मिट्टी के बर्तन, हस्तनिर्मित बैग और कॉटन वस्त्र।',
      },
      origin: 'Srikakulam & Nalgonda Artisan Hubs',
      tag: 'Fair Trade',
    },
  ];

  return (
    <section id="village-market" className="py-16 bg-gradient-to-b from-teal-50/50 via-white to-slate-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-900 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Store className="w-3.5 h-3.5 text-teal-700" />
            <span>{t.villageSection.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
            {language === 'te' ? 'రైతు నుండి వినియోగదారుడికి నేరుగా' : language === 'hi' ? 'खेत से सीधे आपके घर तक' : 'Direct from Village Roots to City Homes'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.villageSection.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-teal-100 hover:border-teal-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                    {item.category[language]}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {item.name[language]}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.desc[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 font-medium mb-3">
                  Source: <span className="text-slate-700 font-semibold">{item.origin}</span>
                </p>

                <a
                  href={`https://wa.me/917989997015?text=${encodeURIComponent(
                    `Hello WOMENE, I want to inquire/order from Village Marketplace: ${item.name.en}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'ఆర్డర్ / విచారణ' : language === 'hi' ? 'ऑर्डर / पूछताछ' : 'Inquire / Order via WhatsApp'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Plant to Wealth & Community Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-teal-200 mb-3">
                <Sprout className="w-3.5 h-3.5" />
                <span>{t.villageSection.plantToWealth}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white mb-2">
                {language === 'te' 
                  ? 'మొక్క నుండి సంపద: రైతులకి మరియు మహిళలకి స్థిరమైన ఆర్థిక స్వావలంబన' 
                  : language === 'hi'
                  ? 'पौधे से समृद्धि: किसानों और महिलाओं की आर्थिक आत्मनिर्भरता'
                  : 'Plant to Wealth: Sustainable Income for Rural Farmers & Women'}
              </h3>
              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                {language === 'te'
                  ? 'ప్రకృతి వ్యవసాయం ద్వారా విషరహిత పంటలు పండించడం, దేశీ ఆవు ఆధారిత ఉత్పత్తులు తయారుచేయడం మరియు నగరాల్లోని కుటుంబాలకు నేరుగా సరఫరా చేయడం ద్వారా గ్రామీణ మహిళలు, రైతులకు ప్రత్యక్ష ఆదాయం లభిస్తుంది.'
                  : language === 'hi'
                  ? 'प्राकृतिक खेती के माध्यम से विषमुक्त उपज, देशी गाय-आधारित उत्पाद और सीधे शहरी परिवारों तक वितरण से किसानों को उचित मूल्य और महिलाओं को सम्मानजनक आजीविका मिलती है।'
                  : 'Connecting organic farming clusters, indigenous cow sanctuaries, and rural women self-help federations with urban families desiring wholesome nutrition.'}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 bg-white hover:bg-teal-50 text-teal-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{language === 'te' ? 'గ్రామీణ ఉత్పత్తుల సరఫరా బుక్ చేయండి' : language === 'hi' ? 'उत्पाद आपूर्ति बुक करें' : 'Book Farm Produce Supply'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={companyDetails.whatsAppDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-teal-800 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl border border-teal-600 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Agri Helpline (7989997015)</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
