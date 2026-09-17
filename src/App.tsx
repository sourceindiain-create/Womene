import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AiDoctorSection } from './components/AiDoctorSection';
import { FlutterSection } from './components/FlutterSection';
import { VillageMarketplaceSection } from './components/VillageMarketplaceSection';
import { BranchesAndTeamSection } from './components/BranchesAndTeamSection';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { BookingModal } from './components/BookingModal';
import { EmergencySosModal } from './components/EmergencySosModal';
import { PostersGalleryModal } from './components/PostersGalleryModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { FlutterMobileStudioModal } from './components/FlutterMobileStudioModal';
import { AiLibraryModal } from './components/AiLibraryModal';
import { Language, UserProfile, ServiceItem } from './types';
import { companyDetails } from './data/servicesData';
import { 
  Bot, 
  ShieldAlert, 
  MessageCircle, 
  UserCheck, 
  Sparkles,
  Phone,
  Smartphone,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile>({
    name: 'Guest User',
    phone: '',
    isGuest: true,
  });

  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isPostersOpen, setIsPostersOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isFlutterStudioOpen, setIsFlutterStudioOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<ServiceItem | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Check if initial visit to prompt front login or allow direct guest access
  useEffect(() => {
    const hasVisited = localStorage.getItem('womene_visited');
    if (!hasVisited) {
      setIsLoginOpen(true);
      localStorage.setItem('womene_visited', 'true');
    }
  }, []);

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedServiceToBook(service);
    setIsBookingOpen(true);
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    setIsLoginOpen(false);
  };

  const handleContinueAsGuest = () => {
    setUser({
      name: 'Guest User',
      phone: '',
      isGuest: true,
    });
    setIsLoginOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* Persistent Guest Mode / Member Access Status Notice Bar */}
      {user.isGuest && (
        <div className="bg-purple-100/90 border-b border-purple-200 py-1.5 px-4 text-xs text-purple-950 font-medium">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-purple-700" />
              <span>
                <strong>{language === 'te' ? 'గెస్ట్ మోడ్ డైరెక్ట్ యాక్సెస్:' : language === 'hi' ? 'गेस्ट मोड डायरेक्ट एक्सेस:' : 'Guest Mode Active:'}</strong>{' '}
                {language === 'te' 
                  ? 'మీరు వెబ్‌సైట్‌లోని అన్ని సేవలు, AI డాక్టర్, బ్రాంచీలు మరియు బుకింగ్ నేరుగా ఉపయోగించవచ్చు.' 
                  : language === 'hi' 
                  ? 'आप सभी सेवाएं, AI डॉक्टर, शाखाएं व बुकिंग सीधे उपयोग कर सकते हैं।' 
                  : 'Full direct access enabled for all services, AI Doctor, branch directory & bookings.'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-purple-800 hover:text-purple-950 underline font-bold"
              >
                {language === 'te' ? 'ఖాతా ద్వారా లాగిన్ అవ్వండి' : language === 'hi' ? 'सदस्य लॉगिन' : 'Switch to Member Login'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenBooking={() => {
          setSelectedServiceToBook(null);
          setIsBookingOpen(true);
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenPosters={() => setIsPostersOpen(true)}
        onOpenFlutterStudio={() => setIsFlutterStudioOpen(true)}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Sections */}
      <main>
        <Hero
          language={language}
          onOpenBooking={() => {
            setSelectedServiceToBook(null);
            setIsBookingOpen(true);
          }}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenAiDoctor={() => {
            const el = document.getElementById('ai-doctor');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenPosters={() => setIsPostersOpen(true)}
        />

        <ServicesSection
          language={language}
          onSelectServiceToBook={handleServiceSelect}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
        />

        <AiDoctorSection
          language={language}
          onOpenBooking={() => {
            setSelectedServiceToBook(null);
            setIsBookingOpen(true);
          }}
          onOpenLibrary={() => setIsLibraryOpen(true)}
        />

        {/* Cross-Platform Flutter Mobile Ecosystem Section */}
        <FlutterSection
          language={language}
          onOpenFlutterStudio={() => setIsFlutterStudioOpen(true)}
        />

        <VillageMarketplaceSection
          language={language}
          onOpenBooking={() => {
            setSelectedServiceToBook(null);
            setIsBookingOpen(true);
          }}
        />

        <BranchesAndTeamSection
          language={language}
          onOpenBooking={() => {
            setSelectedServiceToBook(null);
            setIsBookingOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        setLanguage={setLanguage}
        onOpenBooking={() => {
          setSelectedServiceToBook(null);
          setIsBookingOpen(true);
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenPosters={() => setIsPostersOpen(true)}
      />

      {/* Floating Action Buttons Strip (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* World-Wide AI Library Floating Button */}
        <button
          onClick={() => setIsLibraryOpen(true)}
          className="p-3 bg-gradient-to-r from-purple-900 to-pink-900 hover:from-purple-950 hover:to-pink-950 text-white rounded-2xl shadow-xl shadow-purple-950/40 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group border border-purple-400/30"
          title="World-Wide AI Library (Magazines & Books)"
        >
          <BookOpen className="w-5 h-5 text-pink-300" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs ml-0 group-hover:ml-2">
            AI Library
          </span>
        </button>

        {/* Quick Flutter Mobile Studio Simulator Button */}
        <button
          onClick={() => setIsFlutterStudioOpen(true)}
          className="p-3 bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-900 hover:to-indigo-900 text-white rounded-2xl shadow-xl shadow-purple-950/40 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group border border-purple-400/30"
          title="Flutter Mobile App Simulator & Source Code"
        >
          <Smartphone className="w-5 h-5 text-pink-300" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs ml-0 group-hover:ml-2">
            Flutter Mobile App
          </span>
        </button>

        {/* Quick Emergency SOS Floating Button */}
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
          title="Emergency SOS"
        >
          <ShieldAlert className="w-5 h-5 text-white animate-bounce" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs ml-0 group-hover:ml-2">
            SOS 4-KM
          </span>
        </button>

        {/* WhatsApp Direct Floating Button */}
        <a
          href={companyDetails.whatsAppDirectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
          title="WhatsApp Us (7989997015)"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs ml-0 group-hover:ml-2">
            WhatsApp
          </span>
        </a>

        {/* AI Assistant Floating Button */}
        <button
          onClick={() => setIsAiAssistantOpen(prev => !prev)}
          className="px-4 py-3 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white rounded-2xl shadow-xl shadow-purple-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <Bot className="w-5 h-5" />
          <span className="font-bold text-xs">
            {language === 'te' ? 'AI అసిస్టెంట్' : language === 'hi' ? 'AI सहायक' : 'Ask WOMENE AI'}
          </span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        language={language}
        setLanguage={setLanguage}
        onLoginSuccess={handleLoginSuccess}
        onContinueAsGuest={handleContinueAsGuest}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        language={language}
        preselectedService={selectedServiceToBook}
      />

      <EmergencySosModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        language={language}
      />

      <PostersGalleryModal
        isOpen={isPostersOpen}
        onClose={() => setIsPostersOpen(false)}
        language={language}
        onOpenBooking={() => {
          setSelectedServiceToBook(null);
          setIsBookingOpen(true);
        }}
      />

      <AiAssistantDrawer
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        language={language}
        onOpenBooking={() => {
          setIsAiAssistantOpen(false);
          setIsBookingOpen(true);
        }}
        onOpenEmergency={() => {
          setIsAiAssistantOpen(false);
          setIsEmergencyOpen(true);
        }}
      />

      <FlutterMobileStudioModal
        isOpen={isFlutterStudioOpen}
        onClose={() => setIsFlutterStudioOpen(false)}
        language={language}
        onOpenBooking={() => {
          setIsFlutterStudioOpen(false);
          setIsBookingOpen(true);
        }}
        onOpenEmergency={() => {
          setIsFlutterStudioOpen(false);
          setIsEmergencyOpen(true);
        }}
      />

      <AiLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        language={language}
      />

    </div>
  );
}
