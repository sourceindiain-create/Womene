import React, { useState } from 'react';
import { 
  Heart, 
  Globe, 
  Phone, 
  MessageCircle, 
  ShieldAlert, 
  User, 
  Menu, 
  X, 
  MapPin, 
  Calendar, 
  Bot, 
  Stethoscope, 
  Store, 
  Sparkles,
  Layers,
  Smartphone,
  BookOpen
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  user: UserProfile;
  onOpenLogin: () => void;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onOpenAiAssistant: () => void;
  onOpenPosters: () => void;
  onOpenFlutterStudio: () => void;
  onOpenLibrary: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  user,
  onOpenLogin,
  onOpenBooking,
  onOpenEmergency,
  onOpenAiAssistant,
  onOpenPosters,
  onOpenFlutterStudio,
  onOpenLibrary,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
      {/* Top emergency & contact strip */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-purple-100">
            <span className="font-semibold flex items-center gap-1.5 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t.pillars}
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-pink-300" />
              <span>Bengaluru (HQ) • Hyderabad • Vijayawada • Chennai • Mumbai • Pune</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="tel:8125016226" 
              className="flex items-center gap-1 text-purple-100 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-pink-300" />
              <span>8125016226 / 7981967919</span>
            </a>
            <span>•</span>
            <a 
              href={companyDetails.whatsAppDirectLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[11px] font-semibold transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp: 7989997015</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-purple-200 group-hover:scale-105 transition-transform">
              <Heart className="w-7 h-7 fill-white stroke-purple-700" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-purple-950 font-serif">
                  WOMENE
                </span>
                <span className="text-xs bg-pink-100 text-pink-700 font-bold px-1.5 py-0.5 rounded-sm">
                  AI CARE
                </span>
              </div>
              <p className="text-[11px] font-medium text-purple-700 tracking-wide">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('hero')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'hero' ? 'text-purple-800 bg-purple-50 font-semibold' : 'hover:text-purple-700 hover:bg-slate-50'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'services' ? 'text-purple-800 bg-purple-50 font-semibold' : 'hover:text-purple-700 hover:bg-slate-50'
              }`}
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('ai-doctor')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeSection === 'ai-doctor' ? 'text-purple-800 bg-purple-50 font-semibold' : 'hover:text-purple-700 hover:bg-slate-50'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-pink-600" />
              <span>{t.nav.aiDoctor}</span>
            </button>
            <button
              onClick={() => handleNavClick('village-market')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeSection === 'village-market' ? 'text-purple-800 bg-purple-50 font-semibold' : 'hover:text-purple-700 hover:bg-slate-50'
              }`}
            >
              <Store className="w-4 h-4 text-teal-600" />
              <span>{t.nav.village}</span>
            </button>
            <button
              onClick={() => handleNavClick('branches-team')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'branches-team' ? 'text-purple-800 bg-purple-50 font-semibold' : 'hover:text-purple-700 hover:bg-slate-50'
              }`}
            >
              {t.nav.branches}
            </button>
            <button
              onClick={onOpenLibrary}
              className="px-3 py-2 rounded-lg text-purple-700 hover:bg-purple-50 flex items-center gap-1.5 font-medium transition-colors"
              title="World-Wide AI Library (Magazines & Books)"
            >
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>{t.nav.aiLibrary}</span>
            </button>
            <button
              onClick={onOpenPosters}
              className="px-3 py-2 rounded-lg text-purple-700 hover:bg-purple-50 flex items-center gap-1.5 font-medium transition-colors"
            >
              <Layers className="w-4 h-4 text-purple-600" />
              <span>{t.nav.gallery}</span>
            </button>
            <button
              onClick={onOpenFlutterStudio}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 hover:from-purple-800 hover:to-pink-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
              title="Open WOMENE Flutter Mobile App Simulator & Source Code"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Flutter App</span>
              <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase">iOS & Android</span>
            </button>
          </nav>

          {/* Language Selector + Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* 3-Language Selector */}
            <div className="flex items-center bg-purple-50 p-1 rounded-xl border border-purple-100 text-xs font-semibold">
              <button
                onClick={() => setLanguage('te')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'te'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-900 hover:text-purple-700'
                }`}
                title="Telugu (తెలుగు)"
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-900 hover:text-purple-700'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-900 hover:text-purple-700'
                }`}
                title="Hindi (हिन्दी)"
              >
                हिन्दी
              </button>
            </div>

            {/* Emergency SOS Button */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
              title="Emergency SOS (Within 4 KM)"
            >
              <ShieldAlert className="w-4 h-4 text-red-600 animate-bounce" />
              <span>SOS</span>
            </button>

            {/* Book Service Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm shadow-purple-200"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.booking}</span>
            </button>

            {/* User / Guest Status */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5 text-purple-700" />
              <span className="max-w-[80px] truncate">
                {user.isGuest ? t.guestMode : user.name}
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Quick Lang toggle on mobile */}
            <button
              onClick={() => {
                const nextLang: Language = language === 'te' ? 'en' : language === 'en' ? 'hi' : 'te';
                setLanguage(nextLang);
              }}
              className="text-xs font-bold bg-purple-100 text-purple-800 px-2 py-1 rounded-lg"
            >
              {language === 'te' ? 'తెలుగు' : language === 'hi' ? 'हिन्दी' : 'EN'}
            </button>
            
            <button
              onClick={onOpenEmergency}
              className="p-1.5 bg-red-100 text-red-700 rounded-lg"
            >
              <ShieldAlert className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-purple-800 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-purple-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex justify-between items-center bg-purple-50 p-2 rounded-xl">
            <span className="text-xs font-bold text-purple-900">{t.selectLanguage}:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setLanguage('te')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  language === 'te' ? 'bg-purple-700 text-white' : 'bg-white text-purple-900'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  language === 'en' ? 'bg-purple-700 text-white' : 'bg-white text-purple-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  language === 'hi' ? 'bg-purple-700 text-white' : 'bg-white text-purple-900'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => handleNavClick('hero')}
              className="p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('ai-doctor')}
              className="p-2.5 rounded-lg text-left text-sm font-medium bg-purple-50 text-purple-900"
            >
              {t.nav.aiDoctor}
            </button>
            <button
              onClick={() => handleNavClick('village-market')}
              className="p-2.5 rounded-lg text-left text-sm font-medium bg-teal-50 text-teal-900"
            >
              {t.nav.village}
            </button>
            <button
              onClick={() => handleNavClick('branches-team')}
              className="p-2.5 rounded-lg text-left text-sm font-medium bg-slate-50 text-slate-800"
            >
              {t.nav.branches}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPosters();
              }}
              className="p-2.5 rounded-lg text-left text-sm font-medium bg-pink-50 text-pink-900"
            >
              {t.nav.gallery}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLibrary();
              }}
              className="p-2.5 rounded-lg text-left text-sm font-medium bg-purple-100 text-purple-950 flex items-center gap-1.5 font-bold"
            >
              <BookOpen className="w-4 h-4 text-purple-700" />
              <span>{t.nav.aiLibrary}</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFlutterStudio();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-800 via-pink-700 to-indigo-800 text-white text-center font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Flutter Mobile Simulator (iOS & Android)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white text-center font-bold text-sm rounded-xl shadow-md"
            >
              {t.nav.booking} (7989997015)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="w-full py-2.5 bg-red-600 text-white text-center font-bold text-sm rounded-xl"
            >
              {t.nav.emergency}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2 bg-slate-100 text-slate-700 text-center font-medium text-xs rounded-xl"
            >
              {user.isGuest ? `${t.loginButton} / Profile` : `Logged in as ${user.name}`}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
