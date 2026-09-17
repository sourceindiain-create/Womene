import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink,
  MessageCircle,
  FileText
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { postersData, PosterItem } from '../data/postersData';
import { companyDetails } from '../data/servicesData';

interface PostersGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenBooking: () => void;
}

export const PostersGalleryModal: React.FC<PostersGalleryModalProps> = ({
  isOpen,
  onClose,
  language,
  onOpenBooking,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const t = translations[language];

  if (!isOpen) return null;

  const currentPoster = postersData[selectedIdx];

  const handlePrev = () => {
    setSelectedIdx(i => (i === 0 ? postersData.length - 1 : i - 1));
  };

  const handleNext = () => {
    setSelectedIdx(i => (i === postersData.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-200 my-6 flex flex-col max-h-[92vh]">
        
        {/* Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-700 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight">WOMENE OFFICIAL VISUAL ARCHIVE</span>
                <span className="text-[10px] bg-purple-600/40 text-purple-200 px-2 py-0.5 rounded-full font-semibold">
                  {selectedIdx + 1} / {postersData.length}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                All 6 Strategic Concept Posters & Ecosystem Blueprints
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="bg-slate-100 p-2.5 flex items-center gap-2 overflow-x-auto shrink-0 border-b border-slate-200 scrollbar-none">
          {postersData.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedIdx === idx
                  ? 'bg-purple-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-purple-50'
              }`}
            >
              <span>#{idx + 1}</span>
              <span className="max-w-[140px] truncate">{p.title}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Card Showcase */}
          <div className={`rounded-3xl bg-gradient-to-br ${currentPoster.themeColor} text-white p-6 sm:p-8 shadow-xl relative overflow-hidden`}>
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  {currentPoster.badge}
                </span>
                <span className="text-xs text-purple-200 font-semibold">
                  WOMENE Strategic Launch Kit
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
                  {language === 'te' ? currentPoster.teluguTitle : language === 'hi' ? currentPoster.hindiTitle : currentPoster.title}
                </h3>
                <p className="text-sm sm:text-base text-purple-200 mt-1 font-medium">
                  {currentPoster.subtitle}
                </p>
              </div>

              {/* Poster Key Points */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-300 block mb-2">
                  Key Strategic Components & Specifications:
                </span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {currentPoster.keyPoints.map((pt, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 flex items-start gap-2 text-xs text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sections Breakdown */}
              {currentPoster.sections && (
                <div className="pt-2">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {currentPoster.sections.map((sec, i) => (
                      <div key={i} className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <span className="text-[11px] font-bold text-pink-200 block mb-0.5">
                          {sec.name}
                        </span>
                        <p className="text-[11px] text-slate-200">
                          {sec.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Quick Actions & Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1 text-xs font-bold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Poster</span>
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1 text-xs font-bold transition-colors"
              >
                <span>Next Poster</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={companyDetails.whatsAppDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Helpline</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Book Service from Poster
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
