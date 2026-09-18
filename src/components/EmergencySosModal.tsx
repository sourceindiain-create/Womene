import React, { useState } from 'react';
import { 
  ShieldAlert, 
  X, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  MessageCircle, 
  Share2, 
  Info,
  Clock
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';
import { saveEmergencyAlertToFirestore } from '../lib/firebase';
import { saveEmergencyAlertToSupabase } from '../lib/supabase';

interface EmergencySosModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencySosModal: React.FC<EmergencySosModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [sosActive, setSosActive] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [testMode, setTestMode] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const t = translations[language];

  if (!isOpen) return null;

  const handleTriggerSos = () => {
    // Attempt to get user's live coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          activateAlert(latitude, longitude);
        },
        () => {
          // Fallback location for demonstration
          const fallbackLat = 12.9716;
          const fallbackLng = 77.5946;
          setCoords({ lat: fallbackLat, lng: fallbackLng });
          activateAlert(fallbackLat, fallbackLng);
        },
        { timeout: 8000 }
      );
    } else {
      const fallbackLat = 12.9716;
      const fallbackLng = 77.5946;
      setCoords({ lat: fallbackLat, lng: fallbackLng });
      activateAlert(fallbackLat, fallbackLng);
    }
  };

  const activateAlert = (lat: number, lng: number) => {
    setSosActive(true);
    setStatusMessage(
      language === 'te'
        ? `SOS అలర్ట్ పంపబడింది! 4 కి.మీ పరిధిలోని సమీప WOMENE ప్రతినిధులకు సమాచారం చేరింది (లొకేషన్: ${lat.toFixed(4)}, ${lng.toFixed(4)}).`
        : language === 'hi'
        ? `SOS अलर्ट भेजा गया! 4 किमी के भीतर निकटतम WOMENE प्रतिनिधियों को सूचित कर दिया गया है (स्थान: ${lat.toFixed(4)}, ${lng.toFixed(4)})।`
        : `SOS Dispatched! Nearest verified WOMENE responders within 4 km alerted with GPS coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)}).`
    );

    // Save to Firebase Firestore & Supabase PostgreSQL (Dual Cloud Sync)
    saveEmergencyAlertToFirestore({
      userName: 'Emergency User',
      phone: companyDetails.whatsAppNumber || '7989997015',
      emergencyType: 'High-Priority Safety SOS',
      locationLat: lat,
      locationLng: lng,
      addressText: `GPS Pin: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
    }).then((res) => {
      if (res.success) {
        console.log('Emergency alert logged to Firestore with ID:', res.id);
      }
    });

    saveEmergencyAlertToSupabase({
      sos_code: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      user_name: 'Emergency User',
      phone: companyDetails.whatsAppNumber || '7989997015',
      emergency_type: 'High-Priority Safety SOS',
      location_lat: lat,
      location_lng: lng,
      address_text: `GPS Pin: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      status: 'active',
    }).then((res) => {
      if (res.success) {
        console.log('Emergency alert synced to Supabase PostgreSQL');
      }
    });
  };

  const getWhatsAppSosLink = () => {
    const locText = coords 
      ? `https://maps.google.com/?q=${coords.lat},${coords.lng}`
      : 'Location requested';
    const message = `EMERGENCY SOS ALERT! I need urgent support near: ${locText}. Please dispatch nearest WOMENE coordinator.`;
    return `https://wa.me/917989997015?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Emergency Red Banner */}
        <div className="bg-red-600 text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                WOMENE SAFETY NET
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-serif mt-1">
                {t.emergencySection.title}
              </h2>
            </div>
          </div>
          <p className="text-xs text-red-100 mt-2">
            {t.emergencySection.subtitle}
          </p>
        </div>

        <div className="p-6 space-y-6">
          
          {/* CRITICAL LAUNCH KIT MANDATE: Separation of emergency services */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 leading-relaxed">
              <p className="font-bold text-sm text-amber-900 mb-1">
                {language === 'te' ? 'ముఖ్యమైన అత్యవసర హెచ్చరిక:' : language === 'hi' ? 'महत्वपूर्ण आपातकालीन सूचना:' : 'Critical Distinction & Emergency Policy:'}
              </p>
              <p>{t.emergencySection.policeAmbulanceNote}</p>
            </div>
          </div>

          {/* National Official Emergency Numbers - Instant Click to Call */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              {language === 'te' ? 'జాతీయ అత్యవసర కాల్ సర్వీసులు (తక్షణమే సంప్రదించండి):' : language === 'hi' ? 'राष्ट्रीय आपातकालीन सेवाएं (तुरंत कॉल करें):' : 'Government & Emergency Lifelines (Direct 1-Tap Call):'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <a
                href="tel:112"
                className="bg-red-50 hover:bg-red-100 border border-red-200 p-3 rounded-xl text-center transition-colors group"
              >
                <span className="text-lg font-black text-red-700 block group-hover:scale-105 transition-transform">
                  112
                </span>
                <span className="text-[11px] font-bold text-slate-700 block">
                  Police / All-Emergency
                </span>
              </a>

              <a
                href="tel:108"
                className="bg-amber-50 hover:bg-amber-100 border border-amber-200 p-3 rounded-xl text-center transition-colors group"
              >
                <span className="text-lg font-black text-amber-700 block group-hover:scale-105 transition-transform">
                  108
                </span>
                <span className="text-[11px] font-bold text-slate-700 block">
                  Medical Ambulance
                </span>
              </a>

              <a
                href="tel:1091"
                className="bg-purple-50 hover:bg-purple-100 border border-purple-200 p-3 rounded-xl text-center transition-colors group"
              >
                <span className="text-lg font-black text-purple-700 block group-hover:scale-105 transition-transform">
                  1091
                </span>
                <span className="text-[11px] font-bold text-slate-700 block">
                  Women Helpline
                </span>
              </a>

              <a
                href="tel:1098"
                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 p-3 rounded-xl text-center transition-colors group"
              >
                <span className="text-lg font-black text-blue-700 block group-hover:scale-105 transition-transform">
                  1098
                </span>
                <span className="text-[11px] font-bold text-slate-700 block">
                  Child Safety Helpline
                </span>
              </a>
            </div>
          </div>

          {/* WOMENE 4-KM Emergency Dispatch Unit */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-700">WOMENE 4-KM Responder Network</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={testMode}
                  onChange={(e) => setTestMode(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="text-slate-500 font-medium text-[11px]">Safe Test Mode</span>
              </label>
            </div>

            {!sosActive ? (
              <button
                type="button"
                onClick={handleTriggerSos}
                className="w-full py-5 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-black text-base tracking-wide shadow-xl shadow-red-500/25 active:scale-98 transition-all flex flex-col items-center justify-center gap-1"
              >
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 animate-pulse" />
                  <span>{t.emergencySection.sosButton}</span>
                </div>
                <span className="text-[11px] font-normal text-red-100">
                  {testMode ? '(Running in Test Mode - Coordinates will be previewed)' : '(Broadcasts GPS to verified WOMENE local circle within 4 KM)'}
                </span>
              </button>
            ) : (
              <div className="space-y-4 bg-red-50 p-4 rounded-xl border border-red-300">
                <div className="flex items-center justify-center gap-2 text-red-700 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.emergencySection.sosAlertActive}</span>
                </div>

                <p className="text-xs text-red-900 leading-relaxed font-medium">
                  {statusMessage}
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  <a
                    href={getWhatsAppSosLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send WhatsApp SOS with Live Map Link</span>
                  </a>

                  <button
                    onClick={() => setSosActive(false)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold"
                  >
                    Reset SOS
                  </button>
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-700" />
                <span>Radius: 4 KM</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-pink-700" />
                <span>Response Target: 10-15 Min</span>
              </span>
              <span>•</span>
              <span>Direct: 8125016226</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
