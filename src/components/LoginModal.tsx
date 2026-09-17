import React, { useState } from 'react';
import { 
  Heart, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';
import womeneLoginCover from '../assets/images/womene_login_cover_1789580704790.jpg';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onLoginSuccess: (profile: UserProfile) => void;
  onContinueAsGuest: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  language,
  setLanguage,
  onLoginSuccess,
  onContinueAsGuest,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const t = translations[language];

  if (!isOpen) return null;

  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(language === 'te' ? 'దయచేసి మీ పేరును నమోదు చేయండి' : language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError(language === 'te' ? 'సరైన మొబైల్ నంబర్ నమోదు చేయండి' : language === 'hi' ? 'मान्य मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    if (!otpSent) {
      setOtpSent(true);
      setError('');
      return;
    }

    // Authenticate
    onLoginSuccess({
      name: name.trim(),
      phone: phone.trim(),
      isGuest: false,
      city: 'Bengaluru / Hyderabad',
    });
    onClose();
  };

  const handleGuestClick = () => {
    onContinueAsGuest();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-slate-600 hover:bg-white hover:text-slate-900 shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-5">
          {/* Left Cover Image & Brand Area */}
          <div className="md:col-span-2 relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 p-6 flex flex-col justify-between text-white overflow-hidden min-h-[260px] md:min-h-[480px]">
            {/* Background image overlay */}
            <img 
              src={womeneLoginCover} 
              alt="WOMENE Care & Community" 
              className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay scale-105"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
                <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300" />
                <span>WOMENE Network</span>
              </div>
              <h2 className="text-2xl font-black font-serif tracking-tight text-white leading-tight">
                {t.brandName}
              </h2>
              <p className="text-pink-200 text-xs font-medium mt-1">
                {t.tagline}
              </p>
            </div>

            <div className="relative z-10 space-y-3 my-4">
              <div className="flex items-start gap-2.5 text-xs text-purple-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{language === 'te' ? '4 కి.మీ లోపు ధృవీకరించబడిన మహిళా ప్రతినిధులు' : language === 'hi' ? '4 किमी के भीतर सत्यापित महिला प्रतिनिधि' : 'Trained and verified women representatives within 4 km'}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-purple-100">
                <Sparkles className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                <span>{language === 'te' ? 'ఆన్‌లైన్ మరియు ఆఫ్‌లైన్ రెండింటిలోనూ సేవలు' : language === 'hi' ? 'ऑनलाइन और ऑफलाइन दोनों प्रकार की सेवाएं' : 'Both offline at-home and online tele-care available'}</span>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/20 text-[11px] text-purple-200">
              <p className="font-semibold text-white">Founder: {companyDetails.founder}</p>
              <p>Booking: {companyDetails.contacts.bookingHelpline}</p>
            </div>
          </div>

          {/* Right Form & Guest Access Area */}
          <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Language Switcher inside login */}
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                <span className="text-xs font-medium text-slate-500">{t.selectLanguage}:</span>
                <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setLanguage('te')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      language === 'te' ? 'bg-purple-700 text-white' : 'text-slate-600 hover:text-purple-700'
                    }`}
                  >
                    తెలుగు
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      language === 'en' ? 'bg-purple-700 text-white' : 'text-slate-600 hover:text-purple-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('hi')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      language === 'hi' ? 'bg-purple-700 text-white' : 'text-slate-600 hover:text-purple-700'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* Header */}
              <div className="mb-5">
                <h3 className="text-xl font-bold text-slate-900">
                  {language === 'te' ? 'WOMENE కి స్వాగతం' : language === 'hi' ? 'WOMENE में स्वागत है' : 'Welcome to WOMENE'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.loginPrompt}
                </p>
              </div>

              {/* PRIMARY CALLOUT: GUEST MODE (DIRECT ACCESS) BUTTON */}
              <div className="mb-6 bg-purple-50 p-4 rounded-2xl border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-purple-700" />
                    {language === 'te' ? 'ఎటువంటి నమోదు లేకుండా నేరుగా చూడండి:' : language === 'hi' ? 'बिना लॉगिन तुरंत वेबसाइट देखें:' : 'Explore immediately without signup:'}
                  </span>
                  <span className="text-[10px] bg-purple-200 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                    1-CLICK
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleGuestClick}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white rounded-xl font-bold text-sm shadow-md shadow-purple-200 flex items-center justify-center gap-2 group transition-all"
                >
                  <span>{t.guestButton}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-purple-700 text-center mt-2 font-medium">
                  {language === 'te' ? '✓ అన్ని సేవలు, AI డాక్టర్, బ్రాంచీలు మరియు బుకింగ్ అందుబాటులో ఉంటాయి' : language === 'hi' ? '✓ सभी सेवाएं, AI डॉक्टर, शाखाएं व बुकिंग सीधे उपलब्ध हैं' : '✓ Full access to all services, AI Doctor, branch directory & instant booking'}
                </p>
              </div>

              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold">{t.orDivider}</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Member Login Form */}
              <form onSubmit={handleMemberLogin} className="space-y-3.5">
                {error && (
                  <div className="text-xs bg-red-50 text-red-700 p-2.5 rounded-xl border border-red-200 font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.enterNamePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.mobileNumber}
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs font-bold text-slate-600 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.enterPhonePlaceholder}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-r-xl focus:outline-hidden focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-xs font-semibold text-emerald-700 mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'te' ? 'OTP నమోదు చేయండి (సిమ్యులేషన్: 1234)' : language === 'hi' ? 'OTP दर्ज करें (परीक्षण: 1234)' : 'Enter OTP (Test: 1234)'}</span>
                    </label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="1234"
                      className="w-full px-3.5 py-2.5 text-sm bg-emerald-50/50 border border-emerald-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-mono tracking-widest text-center"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  {otpSent ? (language === 'te' ? 'ధృవీకరించి లాగిన్ అవ్వండి' : language === 'hi' ? 'सत्यापित करें और लॉगिन करें' : 'Verify & Enter') : (language === 'te' ? 'OTP పొందండి / సభ్యునిగా లాగిన్' : language === 'hi' ? 'OTP प्राप्त करें / सदस्य लॉगिन' : 'Get OTP / Login as Member')}
                </button>
              </form>
            </div>

            {/* Helpline contact info footer */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <Phone className="w-3 h-3 text-purple-700" />
                <span>Help: 8125016226 / 7981967919</span>
              </span>
              <a
                href={companyDetails.whatsAppDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: 7989997015</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
