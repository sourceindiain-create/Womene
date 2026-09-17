import React from 'react';
import { 
  Heart, 
  Calendar, 
  Stethoscope, 
  ShieldAlert, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Sparkles,
  Building2
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';
import womeneHeroBanner from '../assets/images/womene_hero_banner_1789580680850.jpg';

interface HeroProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onOpenAiDoctor: () => void;
  onOpenPosters: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenBooking,
  onOpenEmergency,
  onOpenAiDoctor,
  onOpenPosters,
}) => {
  const t = translations[language];

  return (
    <section id="hero" className="relative pt-6 pb-14 bg-gradient-to-b from-purple-50/60 via-white to-pink-50/30 overflow-hidden">
      {/* Decorative subtle ambient circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-200/30 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Card with Visual Banner Image */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-xl shadow-purple-900/5 overflow-hidden mb-8">
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Pill badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-purple-900 mb-5 shadow-2xs">
                  <Heart className="w-4 h-4 fill-pink-600 text-pink-600 animate-pulse" />
                  <span>{t.pillars}</span>
                  <span className="text-purple-300">•</span>
                  <span className="text-purple-700 font-semibold">{t.tagline}</span>
                </div>

                {/* Hero Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-serif tracking-tight leading-[1.15] mb-4">
                  {t.hero.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
                  {t.hero.subtitle}
                </p>

                {/* Telugu / Hindi Cultural Quote */}
                <div className="bg-purple-50/80 border-l-4 border-purple-600 p-3.5 rounded-r-2xl mb-7">
                  <p className="text-xs sm:text-sm font-semibold text-purple-950 italic">
                    {language === 'te' 
                      ? '“ప్రతి జీవికి ఆరోగ్యం... ప్రతి కుటుంబానికి భద్రత... ప్రతి భూమికి సంపద... ప్రతి సమాజానికి శ్రేయస్సు...”'
                      : language === 'hi'
                      ? '“हर जीव का स्वास्थ्य... हर परिवार की सुरक्षा... हर भूमि की समृद्धि... हर समाज का कल्याण...”'
                      : '“Health for every living being... Safety for every family... Wealth for every land... Prosperity for every community.”'}
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <button
                    onClick={onOpenBooking}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-purple-200 hover:shadow-xl transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.hero.bookNow}</span>
                  </button>

                  <button
                    onClick={onOpenAiDoctor}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all"
                  >
                    <Stethoscope className="w-4 h-4 text-pink-600" />
                    <span>{t.nav.aiDoctor}</span>
                  </button>

                  <a
                    href={companyDetails.whatsAppDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3.5 rounded-2xl font-bold text-sm shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={onOpenEmergency}
                    className="inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>SOS</span>
                  </button>
                </div>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{language === 'te' ? 'ధృవీకృత ప్రతినిధులు' : language === 'hi' ? 'सत्यापित प्रतिनिधि' : 'Verified Reps'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>{language === 'te' ? '4 కి.మీ లోపు స్పందన' : language === 'hi' ? '4 किमी त्वरित सेवा' : 'Within 4 KM'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'te' ? 'ఆన్‌లైన్ & ఆఫ్‌లైన్' : language === 'hi' ? 'ऑनलाइन व ऑफलाइन' : 'Online & Offline'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{language === 'te' ? 'అత్యవసర రక్షణ' : language === 'hi' ? '24/7 सुरक्षा मॉनिटरिंग' : '24/7 SOS Network'}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image Banner */}
            <div className="lg:col-span-5 relative bg-gradient-to-tr from-purple-950 to-pink-900 min-h-[320px] lg:min-h-[540px] flex items-center justify-center overflow-hidden">
              <img
                src={womeneHeroBanner}
                alt="WOMENE Community Care Banner"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-purple-950/20"></div>

              {/* Floating interactive poster preview badge */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-purple-200 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold text-xs">
                      17
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {language === 'te' ? 'WOMENE సమగ్ర వ్యవస్థ' : language === 'hi' ? 'WOMENE समग्र तंत्र' : 'WOMENE Care Ecosystem'}
                      </p>
                      <p className="text-[11px] text-purple-700">
                        {language === 'te' ? '6 లాంచ్ పోస్టర్లు & గైడ్‌లైన్స్' : language === 'hi' ? '6 आधिकारिक पोस्टर व विवरण' : '6 Official Launch Posters Included'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenPosters}
                    className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                  >
                    <span>{language === 'te' ? 'చూడండి' : language === 'hi' ? 'देखें' : 'View Posters'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Company Leadership & Branch Expansion Highlights Bar */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg mb-8">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            
            {/* Leadership */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-pink-300">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-pink-300 font-bold">
                  {language === 'te' ? 'సంస్థ వ్యవస్థాపకులు & నాయకత్వం' : language === 'hi' ? 'संस्थापक एवं नेतृत्व' : 'Leadership & Founder'}
                </span>
                <h4 className="text-base font-bold text-white">
                  {companyDetails.founder}
                </h4>
                <p className="text-xs text-purple-200 mt-0.5">
                  Email: {companyDetails.email}
                </p>
              </div>
            </div>

            {/* Helpline Numbers */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                  {language === 'te' ? 'అధికారిక హెల్ప్‌లైన్లు' : language === 'hi' ? 'आधिकारिक हेल्पलाइन' : 'Helplines & Direct Calls'}
                </span>
                <p className="text-sm font-bold text-white">
                  {companyDetails.contacts.team1} / {companyDetails.contacts.team2}
                </p>
                <p className="text-xs text-purple-200 mt-0.5">
                  Booking (Offline & Online): <span className="font-semibold text-emerald-300">7989997015</span>
                </p>
              </div>
            </div>

            {/* Office & Expansion */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-amber-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                  {language === 'te' ? 'ప్రధాన కార్యాలయం & విస్తరణ' : language === 'hi' ? 'प्रधान कार्यालय व विस्तार' : 'Head Office & Expansion'}
                </span>
                <p className="text-xs text-purple-100 line-clamp-1">
                  {companyDetails.officeLocation}
                </p>
                <p className="text-[11px] text-amber-200 font-medium mt-0.5">
                  {language === 'te' ? 'త్వరలో AP, తెలంగాణలోని అన్ని మండల & జిల్లా కేంద్రాల్లో!' : language === 'hi' ? 'शीघ्र ही AP व तेलंगाना के सभी मंडल व जिला मुख्यालयों में!' : 'Shortly expanding to all AP & Telangana mandal/zilla HQs!'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Impact Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {companyDetails.impactStats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs hover:border-purple-300 transition-all text-center"
            >
              <span className="text-2xl sm:text-3xl font-black text-purple-900 block font-serif">
                {stat.number}
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {stat.label[language]}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
