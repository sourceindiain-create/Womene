import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Code, 
  Copy, 
  Check, 
  Download, 
  Play, 
  Layers, 
  Globe, 
  ExternalLink, 
  ShieldAlert, 
  Bot, 
  Calendar, 
  Phone, 
  MessageCircle, 
  Heart, 
  MapPin,
  Sparkles,
  Server,
  Terminal
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';

interface FlutterMobileStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

export const FlutterMobileStudioModal: React.FC<FlutterMobileStudioModalProps> = ({
  isOpen,
  onClose,
  language,
  onOpenBooking,
  onOpenEmergency,
}) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'architecture'>('simulator');
  const [mobileScreen, setMobileScreen] = useState<'home' | 'services' | 'aidoctor' | 'sos' | 'booking' | 'branches'>('home');
  const [mobileLang, setMobileLang] = useState<Language>(language);
  const [selectedFile, setSelectedFile] = useState<string>('lib/main.dart');
  const [copied, setCopied] = useState(false);
  const [flutterFiles, setFlutterFiles] = useState<Record<string, string>>({});
  const [loadingFiles, setLoadingFiles] = useState(false);

  // Mobile simulator interactive state
  const [sosActive, setSosActive] = useState(false);
  const [simDoctorEngine, setSimDoctorEngine] = useState('human');
  const [simDoctorQuery, setSimDoctorQuery] = useState('');
  const [simDoctorResult, setSimDoctorResult] = useState<string | null>(null);
  const [simBookingStep, setSimBookingStep] = useState(1);
  const [simBookingCategory, setSimBookingCategory] = useState('Elder & Senior Care');
  const [simBookingMode, setSimBookingMode] = useState<'offline' | 'online'>('offline');
  const [simBookingConfirmed, setSimBookingConfirmed] = useState(false);

  // Fetch Flutter code from Node.js backend
  useEffect(() => {
    if (isOpen && Object.keys(flutterFiles).length === 0) {
      setLoadingFiles(true);
      fetch('/api/mobile/flutter-code')
        .then(res => res.json())
        .then(data => {
          if (data.files) {
            setFlutterFiles(data.files);
          }
        })
        .catch(err => console.error('Failed to load flutter files:', err))
        .finally(() => setLoadingFiles(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCode = flutterFiles[selectedFile] || '// Loading Flutter source code...';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flutterFiles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "womene_flutter_project_bundle.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const runSimAiDoctor = () => {
    if (!simDoctorQuery.trim()) return;
    setSimDoctorResult(
      simDoctorEngine === 'human'
        ? 'Triage assessment: Rest, warm hydration, and vital monitoring. Modern: Consult clinic if fever >101°F. Natural: Tulsi & dry ginger decoction. Ayurveda: Golden turmeric milk. Helpline: 7989997015.'
        : simDoctorEngine === 'crop'
        ? 'Crop Leaf Triage: Apply Ghana Jeevamrutha bio-fertilizer and Neem kernel extract (NSKE 5%) spray for pest barrier.'
        : 'General advisory recorded. Connect with nearest WOMENE specialist.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-200 my-4 flex flex-col max-h-[94vh]">
        
        {/* Header Bar */}
        <div className="bg-slate-950 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white">WOMENE FLUTTER MOBILE STUDIO</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  iOS • Android • Web
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full-Stack Architecture: React (Web) + Node.js (API) + Flutter 3.x (Mobile)
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'simulator' ? 'bg-purple-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Interactive App Preview</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'code' ? 'bg-purple-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Flutter Source Code ({Object.keys(flutterFiles).length || 10} files)</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'architecture' ? 'bg-purple-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Full-Stack Overview</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/70">
          
          {/* TAB 1: INTERACTIVE SMARTPHONE SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Mobile Simulator Device */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-[340px] sm:w-[360px] h-[680px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden">
                  
                  {/* Phone Notch & Speaker */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                    <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
                  </div>

                  {/* Mobile Screen Container */}
                  <div className="w-full h-full bg-slate-50 rounded-[40px] overflow-hidden flex flex-col relative text-slate-900">
                    
                    {/* Status Bar */}
                    <div className="bg-purple-950 text-white px-6 pt-3 pb-1 text-[10px] flex justify-between items-center shrink-0">
                      <span>9:41</span>
                      <div className="flex items-center gap-1.5">
                        <span>5G</span>
                        <div className="w-4 h-2 border border-white rounded-xs p-0.5 flex items-center">
                          <div className="w-full h-full bg-white"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Bar */}
                    <div className="bg-purple-900 text-white px-4 py-2.5 flex items-center justify-between shrink-0 shadow-md">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-pink-600 flex items-center justify-center text-white">
                          <Heart className="w-4 h-4 fill-white" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black tracking-tight leading-none">WOMENE</h4>
                          <span className="text-[9px] text-purple-200 leading-none">People Near You. Always.</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10px]">
                        <button
                          onClick={() => setMobileLang('te')}
                          className={`px-1.5 py-0.5 rounded ${mobileLang === 'te' ? 'bg-pink-600 font-bold' : 'text-purple-200'}`}
                        >
                          తెలుగు
                        </button>
                        <button
                          onClick={() => setMobileLang('en')}
                          className={`px-1.5 py-0.5 rounded ${mobileLang === 'en' ? 'bg-pink-600 font-bold' : 'text-purple-200'}`}
                        >
                          EN
                        </button>
                        <button
                          onClick={() => setMobileLang('hi')}
                          className={`px-1.5 py-0.5 rounded ${mobileLang === 'hi' ? 'bg-pink-600 font-bold' : 'text-purple-200'}`}
                        >
                          हिन्दी
                        </button>
                      </div>
                    </div>

                    {/* Mobile Dynamic View Content */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs bg-slate-50">
                      
                      {/* HOME SCREEN */}
                      {mobileScreen === 'home' && (
                        <div className="space-y-2.5">
                          {/* 4 KM SOS Banner */}
                          <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-3 rounded-2xl shadow-md flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ShieldAlert className="w-5 h-5 animate-pulse text-amber-300" />
                              <div>
                                <span className="font-black text-[11px] block">EMERGENCY SOS (4 KM)</span>
                                <span className="text-[9px] text-red-100">National 112 / 108 Bridge</span>
                              </div>
                            </div>
                            <button
                              onClick={() => setMobileScreen('sos')}
                              className="bg-white text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-xs"
                            >
                              OPEN SOS
                            </button>
                          </div>

                          {/* Hero Card */}
                          <div className="bg-gradient-to-br from-purple-950 to-indigo-900 text-white p-3.5 rounded-2xl shadow-sm space-y-2">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="bg-pink-500/30 text-pink-200 px-2 py-0.5 rounded font-bold">
                                CARE • SUPPORT
                              </span>
                              <span className="text-emerald-400 font-bold">Online & Offline</span>
                            </div>
                            <h5 className="font-bold text-xs leading-snug">
                              {mobileLang === 'te' ? 'మీ సమీపంలో మహిళా సంరక్షకులు' : 'Verified Women Caregivers Near You'}
                            </h5>
                            <p className="text-[10px] text-purple-200">
                              Founder: Dr. Krishna Chaitanya & Team | Helplines: 8125016226 / 7989997015
                            </p>
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={() => setMobileScreen('booking')}
                                className="flex-1 py-1.5 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-bold text-[10px] flex items-center justify-center gap-1"
                              >
                                <Calendar className="w-3 h-3" />
                                <span>Book Service</span>
                              </button>
                              <button
                                onClick={() => setMobileScreen('aidoctor')}
                                className="flex-1 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-white font-bold text-[10px] flex items-center justify-center gap-1"
                              >
                                <Bot className="w-3 h-3 text-pink-300" />
                                <span>AI Doctor</span>
                              </button>
                            </div>
                          </div>

                          {/* Core Services Fast Grid */}
                          <div>
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="font-bold text-[11px] text-slate-800">Core Services</span>
                              <button
                                onClick={() => setMobileScreen('services')}
                                className="text-[10px] text-purple-700 font-bold hover:underline"
                              >
                                View All
                              </button>
                            </div>

                            <div className="grid grid-cols-3 gap-1.5">
                              {[
                                { title: 'Elder Care', icon: '👵' },
                                { title: 'Food & Meals', icon: '🍲' },
                                { title: 'Travel Transit', icon: '🚆' },
                                { title: 'Baby Care', icon: '👶' },
                                { title: 'Head Massage', icon: '💆' },
                                { title: 'Farm Market', icon: '🌾' },
                              ].map((item, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setMobileScreen('booking')}
                                  className="p-2 bg-white rounded-xl border border-slate-200 flex flex-col items-center text-center shadow-2xs hover:border-purple-300"
                                >
                                  <span className="text-base mb-1">{item.icon}</span>
                                  <span className="text-[10px] font-bold text-slate-800 leading-tight">{item.title}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 9 Operating Hubs banner */}
                          <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200 text-[10px]">
                            <span className="font-bold text-purple-900 block mb-0.5">9 Operating Branches Active</span>
                            <p className="text-purple-800 text-[9px] leading-tight">
                              Bengaluru (HO), Hyderabad, Secunderabad, Vijayawada, Visakhapatnam, Chennai, Mumbai, Pune, Bhubaneswar.
                            </p>
                            <span className="text-[9px] font-semibold text-amber-700 block mt-1">
                              Shortly starting in all AP & TS mandal/zilla headquarters!
                            </span>
                          </div>
                        </div>
                      )}

                      {/* SERVICES SCREEN */}
                      {mobileScreen === 'services' && (
                        <div className="space-y-2">
                          <h5 className="font-bold text-xs text-purple-950">Ecosystem Services</h5>
                          {[
                            { name: 'Elder Care & Medicine Checks', desc: 'Companionship, clinic escort, daily vitals check', mode: 'Offline & Online' },
                            { name: 'Daily Home Food & Lunch Boxes', desc: 'Hygienic fresh home meals delivered on time', mode: 'Offline' },
                            { name: 'Travel Companion for Seniors', desc: 'Train, bus, airport accompaniment & luggage support', mode: 'Offline' },
                            { name: 'Baby Care & Traditional Nalugu', desc: 'Post-natal herbal oil massage & mother support', mode: 'Offline' },
                            { name: 'Personal Care & Acupressure', desc: 'Head relaxation, back soothing, tension release', mode: 'Offline' },
                            { name: 'Village Farmers Marketplace', desc: 'Cold-pressed native oils, millets, bio-inputs', mode: 'Offline Direct' },
                          ].map((s, i) => (
                            <div key={i} className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                              <div className="space-y-0.5 max-w-[190px]">
                                <span className="font-bold text-[11px] text-slate-900 block">{s.name}</span>
                                <p className="text-[9px] text-slate-500 leading-tight">{s.desc}</p>
                                <span className="text-[8px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-semibold">
                                  {s.mode}
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  setSimBookingCategory(s.name);
                                  setMobileScreen('booking');
                                }}
                                className="px-2 py-1 bg-purple-700 text-white text-[10px] font-bold rounded-lg"
                              >
                                Book
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* AI DOCTOR SCREEN */}
                      {mobileScreen === 'aidoctor' && (
                        <div className="space-y-2.5">
                          <div className="bg-purple-900 text-white p-2.5 rounded-xl">
                            <span className="font-bold text-[11px] block">AI Doctor & Agri Intelligence</span>
                            <span className="text-[9px] text-purple-200">6 Engines • 5 Solution Pathways</span>
                          </div>

                          {/* Engine selector */}
                          <div className="grid grid-cols-3 gap-1">
                            {['human', 'animal', 'bird', 'plant', 'crop', 'soil'].map(e => (
                              <button
                                key={e}
                                onClick={() => setSimDoctorEngine(e)}
                                className={`py-1 rounded-lg text-[9px] font-bold capitalize border ${
                                  simDoctorEngine === e ? 'bg-purple-800 text-white border-purple-800' : 'bg-white text-slate-700 border-slate-200'
                                }`}
                              >
                                {e}
                              </button>
                            ))}
                          </div>

                          <textarea
                            value={simDoctorQuery}
                            onChange={(e) => setSimDoctorQuery(e.target.value)}
                            placeholder="Describe symptoms, pest spots, cattle health, or soil..."
                            className="w-full p-2 bg-white border border-slate-200 rounded-xl text-[10px] focus:outline-hidden"
                            rows={2}
                          />

                          <button
                            onClick={runSimAiDoctor}
                            className="w-full py-1.5 bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold text-[10px] rounded-xl shadow-xs"
                          >
                            Analyze with 5 Medicine Pathways
                          </button>

                          {simDoctorResult && (
                            <div className="p-2.5 bg-white rounded-xl border border-purple-200 text-[9px] text-slate-800 leading-relaxed shadow-2xs space-y-1">
                              <span className="font-bold text-purple-900 block">AI Triage Diagnosis:</span>
                              <p>{simDoctorResult}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* SOS SCREEN */}
                      {mobileScreen === 'sos' && (
                        <div className="space-y-3 text-center">
                          <div className="bg-red-50 border border-red-200 p-2 rounded-xl text-[10px] text-red-800 font-bold text-left">
                            WOMENE is a local support network, not a substitute for 112 Police or 108 Ambulance.
                          </div>

                          <div className="py-2">
                            <button
                              onClick={() => setSosActive(true)}
                              className={`w-28 h-28 mx-auto rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all ${
                                sosActive ? 'bg-emerald-600 animate-pulse' : 'bg-red-600 hover:bg-red-700'
                              }`}
                            >
                              <ShieldAlert className="w-8 h-8 mb-1" />
                              <span className="font-black text-xs">4 KM SOS</span>
                              <span className="text-[8px] uppercase">{sosActive ? 'DISPATCHED' : 'TAP ALERT'}</span>
                            </button>
                          </div>

                          {sosActive && (
                            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-2 rounded-xl text-[10px] font-bold">
                              Coordinator Alert Dispatched within 4 KM radius! Tracking available.
                            </div>
                          )}

                          <div className="space-y-1 text-left">
                            <span className="font-bold text-[10px] text-slate-700">Official National Helplines:</span>
                            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                              <a href="tel:112" className="p-2 bg-blue-50 border border-blue-200 rounded-lg font-bold text-blue-900 flex justify-between">
                                <span>Police / All:</span>
                                <span>112</span>
                              </a>
                              <a href="tel:108" className="p-2 bg-red-50 border border-red-200 rounded-lg font-bold text-red-900 flex justify-between">
                                <span>Ambulance:</span>
                                <span>108</span>
                              </a>
                              <a href="tel:1091" className="p-2 bg-pink-50 border border-pink-200 rounded-lg font-bold text-pink-900 flex justify-between">
                                <span>Women:</span>
                                <span>1091</span>
                              </a>
                              <a href="tel:7989997015" className="p-2 bg-purple-50 border border-purple-200 rounded-lg font-bold text-purple-900 flex justify-between">
                                <span>WOMENE:</span>
                                <span>7989997015</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* BOOKING SCREEN */}
                      {mobileScreen === 'booking' && (
                        <div className="space-y-2.5">
                          <span className="font-bold text-xs text-purple-950 block">5-Step Service Booking</span>

                          {!simBookingConfirmed ? (
                            <div className="space-y-2">
                              <div>
                                <span className="text-[10px] text-slate-500 font-semibold block mb-1">Selected Service:</span>
                                <input
                                  type="text"
                                  value={simBookingCategory}
                                  onChange={(e) => setSimBookingCategory(e.target.value)}
                                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold"
                                />
                              </div>

                              <div>
                                <span className="text-[10px] text-slate-500 font-semibold block mb-1">Delivery Mode:</span>
                                <div className="grid grid-cols-2 gap-1.5">
                                  <button
                                    onClick={() => setSimBookingMode('offline')}
                                    className={`p-2 rounded-lg text-[10px] font-bold border ${
                                      simBookingMode === 'offline' ? 'bg-purple-800 text-white border-purple-800' : 'bg-white text-slate-700 border-slate-200'
                                    }`}
                                  >
                                    Offline (At-Home)
                                  </button>
                                  <button
                                    onClick={() => setSimBookingMode('online')}
                                    className={`p-2 rounded-lg text-[10px] font-bold border ${
                                      simBookingMode === 'online' ? 'bg-purple-800 text-white border-purple-800' : 'bg-white text-slate-700 border-slate-200'
                                    }`}
                                  >
                                    Online (Virtual)
                                  </button>
                                </div>
                              </div>

                              <button
                                onClick={() => setSimBookingConfirmed(true)}
                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Confirm & WhatsApp 7989997015</span>
                              </button>
                            </div>
                          ) : (
                            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-center space-y-1.5">
                              <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                              <span className="font-bold text-xs text-emerald-950 block">Booking Dispatched!</span>
                              <p className="text-[9px] text-emerald-800">
                                Assigned to nearest WOMENE coordinator within 4 KM radius.
                              </p>
                              <button
                                onClick={() => setSimBookingConfirmed(false)}
                                className="text-[9px] text-purple-700 font-bold underline pt-1 block mx-auto"
                              >
                                Book another service
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* BRANCHES SCREEN */}
                      {mobileScreen === 'branches' && (
                        <div className="space-y-2">
                          <div className="bg-purple-950 text-white p-2.5 rounded-xl space-y-1">
                            <span className="font-bold text-[11px] block">{companyDetails.founder}</span>
                            <p className="text-[9px] text-purple-200">
                              HQ: {companyDetails.officeLocation}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            {companyDetails.branches.slice(0, 5).map(b => (
                              <div key={b.id} className="p-2 bg-white rounded-lg border border-slate-200 flex justify-between items-center text-[10px]">
                                <div>
                                  <span className="font-bold text-slate-900 block">{b.name.en}</span>
                                  <span className="text-[9px] text-slate-500">{b.state}</span>
                                </div>
                                <a href={`tel:${b.phone}`} className="font-bold text-purple-700">
                                  {b.phone}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Bottom Navigation Bar */}
                    <div className="bg-white border-t border-slate-200 py-1.5 px-3 flex justify-between items-center shrink-0 shadow-lg text-[9px] font-bold">
                      <button
                        onClick={() => setMobileScreen('home')}
                        className={`flex flex-col items-center ${mobileScreen === 'home' ? 'text-purple-800' : 'text-slate-400'}`}
                      >
                        <Heart className="w-4 h-4" />
                        <span>Home</span>
                      </button>

                      <button
                        onClick={() => setMobileScreen('services')}
                        className={`flex flex-col items-center ${mobileScreen === 'services' ? 'text-purple-800' : 'text-slate-400'}`}
                      >
                        <Layers className="w-4 h-4" />
                        <span>Services</span>
                      </button>

                      <button
                        onClick={() => setMobileScreen('aidoctor')}
                        className={`flex flex-col items-center ${mobileScreen === 'aidoctor' ? 'text-purple-800' : 'text-slate-400'}`}
                      >
                        <Bot className="w-4 h-4" />
                        <span>AI Doctor</span>
                      </button>

                      <button
                        onClick={() => setMobileScreen('sos')}
                        className={`flex flex-col items-center ${mobileScreen === 'sos' ? 'text-red-600' : 'text-slate-400'}`}
                      >
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        <span>4KM SOS</span>
                      </button>

                      <button
                        onClick={() => setMobileScreen('booking')}
                        className={`flex flex-col items-center ${mobileScreen === 'booking' ? 'text-purple-800' : 'text-slate-400'}`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book</span>
                      </button>
                    </div>

                    {/* Home Indicator */}
                    <div className="bg-slate-100 py-1 flex justify-center shrink-0">
                      <div className="w-24 h-1 bg-slate-400 rounded-full"></div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Right Column: Mobile Simulator Features & Actions */}
              <div className="lg:col-span-6 space-y-4">
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-pink-600" />
                    <span>Real-Time Flutter Mobile Preview</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    This interactive mobile device reproduces the exact layout, theme colors, bottom navigation, and logic of the <strong>WOMENE Flutter client</strong>. Every action triggers the same Node.js endpoints running on this server.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-2.5 text-xs pt-1">
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                      <span className="font-bold text-purple-900 block mb-0.5">Offline/Online Booking</span>
                      <p className="text-[11px] text-purple-800">5-step matching workflow with direct WhatsApp handoff to 7989997015.</p>
                    </div>

                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                      <span className="font-bold text-red-900 block mb-0.5">4-KM Geofenced SOS</span>
                      <p className="text-[11px] text-red-800">Instant responder radius alert + one-tap dialing to 112 & 108.</p>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <span className="font-bold text-blue-900 block mb-0.5">AI Doctor (6 Engines)</span>
                      <p className="text-[11px] text-blue-800">Human, cattle, bird, plant, crop, soil with 5 solution pathways.</p>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <span className="font-bold text-emerald-900 block mb-0.5">Multilingual Flutter UI</span>
                      <p className="text-[11px] text-emerald-800">Instant dynamic switching between Telugu (తెలుగు), English, and Hindi.</p>
                    </div>
                  </div>
                </div>

                {/* Quick Switcher Buttons */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">Switch Simulator Screen:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'home', label: 'Home Screen' },
                      { id: 'services', label: 'Services Catalog' },
                      { id: 'aidoctor', label: 'AI Doctor 5 Pathways' },
                      { id: 'sos', label: '4-KM Emergency SOS' },
                      { id: 'booking', label: '5-Step Booking Flow' },
                      { id: 'branches', label: 'Branches & Team' },
                    ].map(btn => (
                      <button
                        key={btn.id}
                        onClick={() => setMobileScreen(btn.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          mobileScreen === btn.id
                            ? 'bg-purple-800 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-purple-50'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveTab('code')}
                    className="flex-1 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Code className="w-4 h-4" />
                    <span>View Flutter Source Files</span>
                  </button>

                  <button
                    onClick={handleDownloadZip}
                    className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Project Bundle</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: FLUTTER SOURCE CODE INSPECTOR & EXPORTER */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              
              {/* File Selector & Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">File:</span>
                  {[
                    'pubspec.yaml',
                    'lib/main.dart',
                    'lib/constants/theme.dart',
                    'lib/models/womene_models.dart',
                    'lib/services/api_service.dart',
                    'lib/screens/home_screen.dart',
                    'lib/screens/ai_doctor_screen.dart',
                    'lib/screens/emergency_sos_screen.dart',
                    'lib/screens/booking_screen.dart',
                    'lib/screens/marketplace_screen.dart',
                    'lib/screens/team_branches_screen.dart',
                    'README.md',
                  ].map(file => (
                    <button
                      key={file}
                      onClick={() => setSelectedFile(file)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors ${
                        selectedFile === file
                          ? 'bg-purple-800 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {file.replace('lib/', '')}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                  </button>

                  <button
                    onClick={handleDownloadZip}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Project JSON</span>
                  </button>
                </div>
              </div>

              {/* Terminal Quick Instructions */}
              <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl border border-slate-800 text-xs font-mono space-y-1">
                <div className="flex items-center gap-2 text-pink-400 font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>Terminal Setup & Running WOMENE Flutter:</span>
                </div>
                <p className="text-slate-400">$ cd flutter_app && flutter pub get</p>
                <p className="text-slate-400">$ flutter run -d chrome  # Run web target</p>
                <p className="text-slate-400">$ flutter build apk --release  # Build Android APK</p>
              </div>

              {/* Code Viewer */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 overflow-x-auto max-h-[500px] font-mono text-xs border border-slate-800">
                <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>Viewing: {selectedFile}</span>
                  <span>Flutter 3.x / Dart</span>
                </div>
                <pre className="leading-relaxed whitespace-pre font-mono">
                  {currentCode}
                </pre>
              </div>

            </div>
          )}

          {/* TAB 3: FULL-STACK ARCHITECTURE OVERVIEW */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900">
                  WOMENE Tri-Platform Architecture (React + Node.js + Flutter)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The WOMENE platform operates as a unified, production-ready ecosystem connecting web users, mobile app clients, rural coordinators, and backend intelligence services through centralized Express.js REST APIs.
                </p>

                <div className="grid md:grid-cols-3 gap-4 pt-2">
                  
                  {/* React Web Box */}
                  <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-2">
                    <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                      <Globe className="w-4 h-4" />
                      <span>1. Frontend Web (React 19)</span>
                    </div>
                    <ul className="text-xs text-purple-800 space-y-1 list-disc list-inside">
                      <li>Vite + React 19 + TypeScript</li>
                      <li>Tailwind CSS + Lucide Icons</li>
                      <li>Telugu, English, Hindi localization</li>
                      <li>Desktop & mobile responsive portals</li>
                      <li>Interactive Posters & Marketplace</li>
                    </ul>
                  </div>

                  {/* Node.js Express API Box */}
                  <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                      <Server className="w-4 h-4" />
                      <span>2. Backend Server (Node.js)</span>
                    </div>
                    <ul className="text-xs text-indigo-800 space-y-1 list-disc list-inside">
                      <li>Express + TypeScript server</li>
                      <li>Google Gemini AI Doctor & Chat</li>
                      <li>5 Solution Pathways analysis engine</li>
                      <li>4-KM SOS Coordinator dispatching</li>
                      <li>CORS configured for Mobile & Web</li>
                    </ul>
                  </div>

                  {/* Flutter Mobile Box */}
                  <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200 space-y-2">
                    <div className="flex items-center gap-2 text-pink-900 font-bold text-sm">
                      <Smartphone className="w-4 h-4" />
                      <span>3. Mobile App (Flutter 3.x)</span>
                    </div>
                    <ul className="text-xs text-pink-800 space-y-1 list-disc list-inside">
                      <li>Cross-platform for Android & iOS</li>
                      <li>One-tap WhatsApp routing (7989997015)</li>
                      <li>GPS geofencing & 4 KM community alert</li>
                      <li>Offline at-home vs Online booking</li>
                      <li>Local storage & offline triage fallback</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Helplines and Leadership Verification Matrix */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-3">
                <span className="text-xs uppercase tracking-wider text-pink-400 font-bold">
                  Verified Contact Routing (Synched across Web, Node.js & Flutter)
                </span>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[11px]">Founder:</span>
                    <p className="font-bold text-white">{companyDetails.founder}</p>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[11px]">Direct Team Contacts:</span>
                    <p className="font-bold text-white">8125016226 / 7981967919</p>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[11px]">Booking Helpline (Online/Offline):</span>
                    <p className="font-bold text-emerald-400">7989997015 (WhatsApp)</p>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[11px]">Official Email:</span>
                    <p className="font-bold text-white">{companyDetails.email}</p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
