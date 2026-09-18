import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Language, ServiceItem, ServiceCategory } from '../types';
import { translations } from '../translations';
import { servicesData, companyDetails } from '../data/servicesData';
import { saveBookingToFirestore } from '../lib/firebase';
import { saveBookingToSupabase } from '../lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preselectedService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  language,
  preselectedService,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('food');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('Food Services');
  const [serviceMode, setServiceMode] = useState<'offline' | 'online'>('offline');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('Bengaluru');
  const [address, setAddress] = useState<string>('');
  const [serviceDate, setServiceDate] = useState<string>('');
  const [serviceTime, setServiceTime] = useState<string>('Morning (09:00 AM - 12:00 PM)');
  const [notes, setNotes] = useState<string>('');
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [assignedRep, setAssignedRep] = useState<{ name: string; badge: string; eta: string } | null>(null);

  const t = translations[language];

  useEffect(() => {
    if (preselectedService) {
      setSelectedCategory(preselectedService.category);
      setSelectedServiceTitle(preselectedService.title[language]);
    }
  }, [preselectedService, language]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !selectedServiceTitle) return;
    if (step === 2 && (!fullName.trim() || !phone.trim())) return;
    if (step === 4) {
      // Generate simulated matching representative
      setAssignedRep({
        name: language === 'te' ? 'లక్ష్మి ప్రసన్న (ధృవీకృత ప్రతినిధి)' : language === 'hi' ? 'लक्ष्मी प्रसन्ना (सत्यापित प्रतिनिधि)' : 'Lakshmi Prasanna (Verified WOMENE Rep)',
        badge: 'ID: WMN-4029 • 4.9★ (320+ Services)',
        eta: 'Response Window: Within 4 KM radius',
      });
      setBookingSubmitted(true);
      setStep(5);

      // Save to Firebase Firestore & Supabase PostgreSQL (Dual Cloud Sync)
      saveBookingToFirestore({
        serviceType: `${selectedServiceTitle} (${selectedCategory})`,
        clientName: fullName.trim(),
        phone: phone.trim(),
        location: `${city}, ${address}`.trim(),
        date: serviceDate || new Date().toISOString().split('T')[0],
        time: serviceTime,
        notes: notes || 'Standard request',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }).then((res) => {
        if (res.success) {
          console.log('Booking saved to Firestore with ID:', res.id);
        }
      });

      saveBookingToSupabase({
        booking_code: `WOM-${Math.floor(1000 + Math.random() * 9000)}`,
        category: selectedCategory,
        service_type: selectedServiceTitle,
        client_name: fullName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        address: address.trim(),
        service_date: serviceDate || new Date().toISOString().split('T')[0],
        service_time: serviceTime,
        mode: serviceMode as 'offline' | 'online',
        notes: notes || 'Standard request',
        status: 'confirmed',
      }).then((res) => {
        if (res.success) {
          console.log('Booking synced to Supabase PostgreSQL');
        }
      });
      return;
    }
    setStep(s => Math.min(s + 1, 5));
  };

  const handleBack = () => {
    setStep(s => Math.max(s - 1, 1));
  };

  const getWhatsAppBookingLink = () => {
    const text = `*WOMENE Service Booking Request*
👤 *Name:* ${fullName || 'Guest User'}
📱 *Phone:* ${phone || 'Not provided'}
💼 *Service:* ${selectedServiceTitle} (${selectedCategory})
🌐 *Mode:* ${serviceMode.toUpperCase()} (Online / Offline)
📍 *Location:* ${city}, ${address}
📅 *Date & Slot:* ${serviceDate || 'Earliest available'} - ${serviceTime}
📝 *Requirements:* ${notes || 'Standard support'}
🎯 *Target Dispatch:* 4 KM nearest verified rep`;

    return `https://wa.me/917989997015?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900 text-white p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-200 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WOMENE 5-SCREEN MVP MATCHING FLOW</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-serif">
            {t.bookingModal.title}
          </h3>
          <p className="text-xs text-purple-200 mt-1">
            {t.bookingModal.subtitle}
          </p>

          {/* Stepper indicators */}
          <div className="grid grid-cols-5 gap-1.5 mt-5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="space-y-1">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    step >= s ? 'bg-pink-400' : 'bg-white/20'
                  }`}
                />
                <span className={`text-[10px] hidden sm:block truncate ${
                  step === s ? 'text-white font-bold' : 'text-purple-300'
                }`}>
                  {s === 1 ? t.bookingModal.step1 : s === 2 ? t.bookingModal.step2 : s === 3 ? t.bookingModal.step3 : s === 4 ? t.bookingModal.step4 : t.bookingModal.step5}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                {t.bookingModal.selectCategory}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {servicesData.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(svc.category);
                      setSelectedServiceTitle(svc.title[language]);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedCategory === svc.category
                        ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-600/20'
                        : 'border-slate-200 hover:border-purple-200'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {svc.title[language]}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                      {svc.subtitle[language]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Service Mode Selection (Both Offline & Online available) */}
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block mb-2">
                  {t.bookingModal.modeSelection} ({companyDetails.availability}):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setServiceMode('offline')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      serviceMode === 'offline'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-xs block">{t.bookingModal.modeOffline}</span>
                    <span className="text-[11px] font-normal text-slate-500">In-person at home within 4 km</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceMode('online')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      serviceMode === 'online'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-xs block">{t.bookingModal.modeOnline}</span>
                    <span className="text-[11px] font-normal text-slate-500">Virtual / Tele-care guidance</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: USER PROFILE & LOCATION */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                {t.bookingModal.step2}: {language === 'te' ? 'మీ వివరాలు & చిరునామా' : language === 'hi' ? 'आपका विवरण व पता' : 'Your Details & Service Location'}
              </h4>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.yourName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sravani Rao"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.yourPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98480 12345"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.bookingModal.yourCity} / Branch
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600"
                >
                  <option value="Bengaluru">Bengaluru (Head Office - Whitefield / Ayyappa Nagar)</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Secunderabad">Secunderabad</option>
                  <option value="Vijayawada">Vijayawada (Andhra Pradesh)</option>
                  <option value="Visakhapatnam">Visakhapatnam (Andhra Pradesh)</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Bhubaneswar">Bhubaneswar</option>
                  <option value="AP/Telangana Mandal HQ">Other AP / Telangana Mandal or Zilla HQ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.bookingModal.yourAddress}
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment, Street name, Landmark..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE & TIMING */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                {t.bookingModal.step3}: {language === 'te' ? 'తేదీ మరియు సమయం' : language === 'hi' ? 'तारीख व समय' : 'Date & Schedule'}
              </h4>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.serviceDate}
                  </label>
                  <input
                    type="date"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.serviceTime}
                  </label>
                  <select
                    value={serviceTime}
                    onChange={(e) => setServiceTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Immediate (within 1-2 hours)">Immediate (Priority within 4 km)</option>
                    <option value="Morning (08:00 AM - 11:00 AM)">Morning (08:00 AM - 11:00 AM)</option>
                    <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                    <option value="Evening (04:00 PM - 07:00 PM)">Evening (04:00 PM - 07:00 PM)</option>
                    <option value="Night Support (08:00 PM - 11:00 PM)">Night Support (08:00 PM - 11:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 text-xs text-purple-900">
                <span className="font-bold block mb-1">Booking Availability:</span>
                <p>{companyDetails.availability}</p>
                <p className="mt-1 font-semibold text-purple-800">Helpline: {companyDetails.contacts.bookingHelpline}</p>
              </div>
            </div>
          )}

          {/* STEP 4: SPECIAL NEEDS & PREFERENCES */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                {t.bookingModal.step4}: {t.bookingModal.notes}
              </h4>

              <div>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Dietary preferences (low salt, vegetarian), patient needs assistance with stairs, preferred language for conversation (Telugu/Hindi/English)..."
                  className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">WOMENE Quality Standard:</span>
                <p>• All representatives undergo identity background checks and safety training.</p>
                <p>• Transparent pricing with zero hidden convenience fees.</p>
              </div>
            </div>
          )}

          {/* STEP 5: MATCHING & CONFIRMATION */}
          {step === 5 && assignedRep && (
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  {t.bookingModal.successTitle}
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  {t.bookingModal.successDesc}
                </p>
              </div>

              {/* Matched Representative Card */}
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-left max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-purple-700">
                    Assigned Care Coordinator:
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">{assignedRep.name}</p>
                <p className="text-xs text-slate-600">{assignedRep.badge}</p>
                <p className="text-xs text-purple-800 font-medium">{assignedRep.eta}</p>
                <div className="pt-2 border-t border-purple-200/60 text-xs text-slate-700">
                  <span>Selected Service: <strong>{selectedServiceTitle}</strong> ({serviceMode.toUpperCase()})</span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Callout */}
              <div className="pt-2">
                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.bookingModal.directWhatsApp}</span>
                </a>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 && step < 5 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <span>{step === 4 ? t.bookingModal.submitBooking : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Done
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
