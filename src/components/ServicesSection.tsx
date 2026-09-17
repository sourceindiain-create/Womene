import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  Sparkles, 
  Car, 
  HeartHandshake, 
  Users, 
  GraduationCap, 
  Store, 
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { Language, ServiceCategory, ServiceItem } from '../types';
import { translations } from '../translations';
import { servicesData, companyDetails } from '../data/servicesData';

interface ServicesSectionProps {
  language: Language;
  onSelectServiceToBook: (service: ServiceItem) => void;
  onOpenEmergency: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Utensils,
  ShoppingBag,
  Sparkles,
  Car,
  HeartHandshake,
  Users,
  GraduationCap,
  Store,
  ShieldAlert,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onSelectServiceToBook,
  onOpenEmergency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = translations[language];

  const categories = [
    { id: 'all', label: t.servicesSection.filterAll },
    { id: 'food', label: language === 'te' ? 'భోజన సేవలు' : language === 'hi' ? 'भोजन' : 'Food' },
    { id: 'daily_care', label: language === 'te' ? 'రోజువారీ సంరక్షణ' : language === 'hi' ? 'दैनिक देखभाल' : 'Daily Care' },
    { id: 'personal_care', label: language === 'te' ? 'వ్యక్తిగత విశ్రాంతి' : language === 'hi' ? 'विश्राम व मसाज' : 'Relaxation' },
    { id: 'travel', label: language === 'te' ? 'ప్రయాణ తోడు' : language === 'hi' ? 'यात्रा साथी' : 'Travel' },
    { id: 'baby_care', label: language === 'te' ? 'శిశు సంరక్షణ' : language === 'hi' ? 'शिशु देखभाल' : 'Baby Care' },
    { id: 'elder_care', label: language === 'te' ? 'వృద్ధుల సేవలు' : language === 'hi' ? 'बुजुर्ग देखभाल' : 'Elder Care' },
    { id: 'work_learn', label: language === 'te' ? 'శిక్షణ & ఉపాధి' : language === 'hi' ? 'कौशल व काम' : 'Work & Learn' },
    { id: 'village_market', label: language === 'te' ? 'గ్రామీణ ఉత్పత్తులు' : language === 'hi' ? 'ग्रामीण मार्केट' : 'Village Market' },
    { id: 'emergency_sos', label: 'SOS' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-16 bg-slate-50/70 border-b border-purple-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <span>WOMENE SERVICE NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
            {t.servicesSection.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.servicesSection.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-800 text-white shadow-md shadow-purple-300'
                  : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-800 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.iconName] || Utensils;
            const isEmergency = service.category === 'emergency_sos';

            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 ${
                  isEmergency 
                    ? 'border-red-300 bg-gradient-to-b from-red-50/40 to-white' 
                    : `${service.colorScheme.border} hover:border-purple-300`
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-13 h-13 rounded-2xl ${service.colorScheme.bg} flex items-center justify-center ${service.colorScheme.primary} shadow-xs`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    {service.popularTag && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-pink-100 text-pink-800">
                        {service.popularTag}
                      </span>
                    )}

                    {isEmergency && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-600 text-white animate-pulse">
                        24/7 Priority
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {service.title[language]}
                  </h3>
                  <p className="text-xs font-semibold text-purple-700 mb-3">
                    {service.subtitle[language]}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.description[language]}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t.servicesSection.details}:
                    </span>
                    {service.highlights[language].map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isEmergency ? 'text-red-500' : 'text-purple-600'}`} />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  {isEmergency ? (
                    <button
                      onClick={onOpenEmergency}
                      className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>{t.emergencySection.sosButton}</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onSelectServiceToBook(service)}
                        className="flex-1 py-2.5 px-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.servicesSection.bookThisService}</span>
                      </button>

                      <a
                        href={`https://wa.me/917989997015?text=${encodeURIComponent(
                          `Hello WOMENE team, I would like to enquire / book: ${service.title.en} (${service.title.te}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl transition-colors"
                        title="Book via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
