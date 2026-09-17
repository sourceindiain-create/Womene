import React from 'react';
import { 
  Smartphone, 
  Download, 
  Code, 
  CheckCircle2, 
  ShieldAlert, 
  Bot, 
  WifiOff, 
  MapPin, 
  MessageCircle, 
  ArrowRight, 
  Layers
} from 'lucide-react';
import { Language } from '../types';

interface FlutterSectionProps {
  language: Language;
  onOpenFlutterStudio: () => void;
}

export const FlutterSection: React.FC<FlutterSectionProps> = ({
  language,
  onOpenFlutterStudio,
}) => {
  return (
    <section id="flutter-mobile" className="py-20 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 text-white relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>Cross-Platform Flutter 3.x Mobile App</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {language === 'te' 
              ? 'WOMENE మొబైల్ యాప్ (iOS & Android) ఇప్పుడు సిద్ధం'
              : language === 'hi'
              ? 'WOMENE मोबाइल ऐप (iOS और Android) अब उपलब्ध'
              : 'WOMENE Mobile App for iOS & Android'}
          </h2>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
            {language === 'te'
              ? '4-KM ఎమర్జెన్సీ SOS, AI డాక్టర్ 5 సొల్యూషన్ మార్గాలు, ఆఫ్‌లైన్ & ఆన్‌లైన్ సర్వీస్ బుకింగ్, మరియు తెలుగు/ఇంగ్లీష్/హిందీ మద్దతుతో పనిచేసే ప్రొడక్షన్-రెడీ ఫ్లట్టర్ యాప్.'
              : language === 'hi'
              ? '4 किमी आपातकालीन एसओएस, एआई डॉक्टर के 5 समाधान, ऑफलाइन व ऑनलाइन बुकिंग और बहुभाषी समर्थन के साथ पूर्ण रूप से तैयार।'
              : 'Production-ready Flutter 3.x client engineered with native device support, 4-KM geofenced SOS alerts, 6 AI Doctor intelligence engines, and direct Node.js API synchronization.'}
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: 4-KM SOS & Offline Support */}
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-purple-800/40 hover:border-pink-500/50 transition-all shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {language === 'te' ? '4-KM ఎమర్జెన్సీ SOS & ఆఫ్‌లైన్ కేర్' : '4-KM Geofenced SOS & Offline Mode'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'te'
                ? 'ఇంటర్నెట్ లేకపోయినా పనిచేసే ఆఫ్‌లైన్ ట్రయాజ్ మరియు సమీపంలోని 4 కి.మీ లోపు మహిళా కోఆర్డినేటర్లకు తక్షణ అలర్ట్.'
                : 'Rapid alerts broadcasted to verified community coordinators within 4 KM radius, backed with direct 112/108 intent dialing.'}
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>One-tap WhatsApp SOS to 7989997015</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Automatic GPS coordinate geotagging</span>
              </li>
            </ul>
          </div>

          {/* Card 2: AI Doctor on Mobile */}
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-purple-800/40 hover:border-purple-500/50 transition-all shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {language === 'te' ? 'మొబైల్ AI డాక్టర్ & అగ్రి ఇంటెలిజెన్స్' : 'Mobile AI Doctor & Agri Intelligence'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'te'
                ? 'మనిషి, పశువులు, పక్షులు, మొక్కలు, పంటలు, మరియు నేల సంరక్షణ కోసం 5 పరిష్కార మార్గాలు.'
                : '6 intelligence engines with 5 Solution Pathways (Modern, Low-Cost, Natural Jeevamrutha, Ayurveda, Yoga/Lifestyle).'}
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Multi-modal photo diagnosis for crops & skin</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Multilingual audio voice prompts & TTS</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Direct Booking & Branches */}
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-purple-800/40 hover:border-indigo-500/50 transition-all shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {language === 'te' ? '5-దశల బుకింగ్ & 9 బ్రాంచ్‌లు' : '5-Step Booking & 9 Active Hubs'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'te'
                ? 'ఆఫ్‌లైన్ (ఇంటి వద్ద) లేదా ఆన్‌లైన్ (వర్చువల్) మోడ్ సెలెక్టర్‌తో సులభమైన బుకింగ్ ఫ్లో.'
                : 'Toggle Offline (At-Home) vs Online (Tele-consultation) modes with real-time assignment across 9 city hubs.'}
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bengaluru HO, Hyderabad, Vijayawada, Vizag</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Expanding to all AP & TS mandals soon</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Action Banner */}
        <div className="bg-gradient-to-r from-purple-900/90 via-pink-900/80 to-indigo-950/90 rounded-3xl p-8 border border-purple-700/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-white">
              {language === 'te' 
                ? 'ఫ్లట్టర్ మొబైల్ యాప్‌ను ఇప్పుడే టెస్ట్ చేయండి'
                : 'Experience the Flutter Mobile Client Live'}
            </h4>
            <p className="text-xs sm:text-sm text-purple-200">
              Test all screens on the interactive simulator or inspect and export the complete Flutter Dart codebase.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-center">
            <button
              onClick={onOpenFlutterStudio}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Mobile Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenFlutterStudio}
              className="px-5 py-3 bg-slate-900/80 hover:bg-slate-900 text-purple-200 hover:text-white border border-purple-500/30 font-bold text-xs sm:text-sm rounded-2xl flex items-center gap-2 transition-all"
            >
              <Code className="w-4 h-4 text-pink-400" />
              <span>Flutter Dart Code (10 Files)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
