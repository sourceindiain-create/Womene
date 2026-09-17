import React from 'react';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  Globe 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';

interface FooterProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onOpenPosters: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  setLanguage,
  onOpenBooking,
  onOpenEmergency,
  onOpenPosters,
}) => {
  const t = translations[language];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Founder */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md">
                <Heart className="w-6 h-6 fill-white stroke-purple-700" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white font-serif">
                  WOMENE
                </span>
                <p className="text-[11px] text-pink-300 font-semibold tracking-wide">
                  {t.pillars}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.missionSummary}
            </p>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1 text-xs">
              <p className="text-slate-400 font-medium">Founder & Leadership:</p>
              <p className="text-white font-bold text-sm">{companyDetails.founder}</p>
              <p className="text-pink-300 text-[11px]">{companyDetails.email}</p>
            </div>
          </div>

          {/* Col 2: Official Helplines & Direct Bookings */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Official Helplines
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Direct Team Contacts:</span>
                <a href="tel:8125016226" className="text-white hover:text-pink-300 font-bold block">
                  8125016226 / 7981967919
                </a>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Offline & Online Booking:</span>
                <a href="tel:7989997015" className="text-emerald-400 hover:text-emerald-300 font-bold block">
                  7989997015
                </a>
                <span className="text-[10px] text-slate-400">Available for home & virtual assistance</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Andhra Pradesh & Regional:</span>
                <a href="tel:7702635919" className="text-white hover:text-pink-300 font-semibold block">
                  7702635919
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={companyDetails.whatsAppDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Direct (7989997015)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Operating Branches & Expansion */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Branches & Coverage
            </h4>

            <div className="text-xs text-slate-400 space-y-1.5">
              <p className="text-white font-medium">Head Office:</p>
              <p className="text-slate-300 text-[11px] leading-snug">
                {companyDetails.officeLocation}
              </p>

              <div className="pt-2">
                <span className="text-white font-medium block mb-1">Active Branches:</span>
                <div className="flex flex-wrap gap-1">
                  {companyDetails.branches.map((b) => (
                    <span
                      key={b.id}
                      className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md text-[10px]"
                    >
                      {b.name[language]}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-amber-300/90 font-medium">
                <p>Shortly starting in all Andhra Pradesh (AP) and Telangana mandal and zilla headquarters!</p>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Portals & Posters */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform Portals
            </h4>

            <div className="flex flex-col gap-2 text-xs">
              <button
                onClick={onOpenBooking}
                className="text-left text-slate-300 hover:text-white transition-colors"
              >
                • 5-Step Service Booking
              </button>
              <button
                onClick={onOpenEmergency}
                className="text-left text-red-400 hover:text-red-300 transition-colors font-bold"
              >
                • Safety & Emergency SOS
              </button>
              <button
                onClick={onOpenPosters}
                className="text-left text-purple-300 hover:text-white transition-colors"
              >
                • 6 Launch Visual Posters
              </button>
              <a
                href="#ai-doctor"
                className="text-left text-slate-300 hover:text-white transition-colors"
              >
                • AI Doctor Intelligence
              </a>
              <a
                href="#village-market"
                className="text-left text-slate-300 hover:text-white transition-colors"
              >
                • Village & Marketplace
              </a>
            </div>

            {/* Language switch */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">Select Language:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setLanguage('te')}
                  className={`px-2 py-0.5 rounded text-[11px] ${language === 'te' ? 'bg-purple-700 text-white' : 'text-slate-400'}`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded text-[11px] ${language === 'en' ? 'bg-purple-700 text-white' : 'text-slate-400'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-2 py-0.5 rounded text-[11px] ${language === 'hi' ? 'bg-purple-700 text-white' : 'text-slate-400'}`}
                >
                  हिन्दी
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} WOMENE Society & Technology Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Emergency Police: 112</span>
            <span>•</span>
            <span>Ambulance: 108</span>
            <span>•</span>
            <span>Booking: 7989997015</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
