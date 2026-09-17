import React, { useState } from 'react';
import {
  Smartphone,
  Cpu,
  Video,
  ExternalLink,
  Phone,
  ShieldCheck,
  Plane,
  Droplets,
  Sun,
  Activity,
  Download,
  Play,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Clock,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';
import { Language, GovernmentAgriApp, AgriTechItem, AgriSolutionVideo } from '../types';
import { governmentAgriApps, agriTechnologies, agriSolutionVideos } from '../data/agriAppsData';

interface AgriResourcesHubProps {
  language: Language;
  onSelectCropIssue?: (issueText: string) => void;
  onOpenBooking?: () => void;
}

export const AgriResourcesHub: React.FC<AgriResourcesHubProps> = ({
  language,
  onSelectCropIssue,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'gov_apps' | 'agritech' | 'videos'>('gov_apps');
  const [selectedApp, setSelectedApp] = useState<GovernmentAgriApp | null>(null);
  const [activeVideo, setActiveVideo] = useState<AgriSolutionVideo | null>(null);

  const tabLabels = {
    gov_apps: {
      en: '🏛️ Government Apps & Schemes',
      te: '🏛️ ప్రభుత్వ అగ్రి యాప్స్ & పథకాలు',
      hi: '🏛️ सरकारी कृषि ऐप व योजनाएं',
    },
    agritech: {
      en: '🛰️ Latest AgriTech & Drones',
      te: '🛰️ ఆధునిక అగ్రిటెక్ & డ్రోన్లు',
      hi: '🛰️ आधुनिक कृषि तकनीक व ड्रोन',
    },
    videos: {
      en: '🎥 Practical Solution Videos',
      te: '🎥 ఆచరణాత్మక పరిష్కార వీడియోలు',
      hi: '🎥 समाधानकारी कृषि वीडियो',
    },
  };

  return (
    <div className="bg-slate-50/70 rounded-3xl p-4 sm:p-7 border border-emerald-100 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-5 border-b border-emerald-100">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3 py-0.5 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Plant AI & Rural Prosperity Ecosystem</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {language === 'te'
              ? 'రైతుల కోసం ఆధునిక సాంకేతికత, ప్రభుత్వ యాప్స్ & వీడియోలు'
              : language === 'hi'
              ? 'किसानों हेतु नवीनतम तकनीक, सरकारी ऐप एवं वीडियो समाधान'
              : 'AgriTech Suite, Government Apps & Actionable Video Solutions'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            {language === 'te'
              ? 'డ్రోన్లు, ఐఓటీ సెన్సార్లు, పీఎం-కిసాన్, కిసాన్ సువిధ మరియు ప్రకృతి వ్యవసాయ సాధనాలకు సంపూర్ణ వేదిక.'
              : language === 'hi'
              ? 'ड्रोन, आईओटी सेंसर, पीएम-किसान, किसान सुविधा और प्राकृतिक खेती का संपूर्ण संकलन।'
              : 'Official national agricultural applications, verified drone specifications, IoT sensors, and stepwise natural farming video masterclasses.'}
          </p>
        </div>

        {/* Toll-free Hotline Callout */}
        <div className="bg-emerald-900 text-white p-3 rounded-2xl flex items-center gap-3 shrink-0 shadow-sm border border-emerald-700">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
            <Phone className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">
              Kisan Call Centre Toll-Free
            </div>
            <a href="tel:18001801551" className="text-sm font-black text-white hover:underline">
              1800-180-1551
            </a>
            <div className="text-[9px] text-emerald-300">6:00 AM – 10:00 PM (Daily)</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['gov_apps', 'agritech', 'videos'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {tabLabels[tab][language]}
          </button>
        ))}
      </div>

      {/* TAB 1: GOVERNMENT AGRI APPS & PORTALS */}
      {activeTab === 'gov_apps' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {governmentAgriApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm border border-emerald-100">
                        🏛️
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {app.nativeName[language] || app.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {app.ministryOrAuthority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                    {app.purpose[language]}
                  </p>

                  {/* Highlights */}
                  <div className="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Key Services & Benefits:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {app.keyFeatures[language]?.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-200"
                        >
                          • {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {app.tollFreeHelpline && (
                    <div className="text-[11px] text-emerald-900 font-bold mb-3 flex items-center gap-1.5 bg-emerald-50/80 px-2 py-1 rounded-lg border border-emerald-100">
                      <Phone className="w-3 h-3 text-emerald-700" />
                      <span>Helpline: {app.tollFreeHelpline}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <a
                    href={app.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Open Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-semibold">
                    {app.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Government Portal Integration Note:</strong> All portals linked above are verified official Government of India (.gov.in / .nic.in) domains. WOMENE Rural Care representatives provide hands-on offline assistance at local mandal offices for farmers who require assistance with e-KYC or land record mapping.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LATEST AGRICULTURAL TECHNOLOGIES */}
      {activeTab === 'agritech' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agriTechnologies.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-md">
                    {tech.category.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {tech.tagline[language]}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 mb-1">
                  {tech.title[language]}
                </h4>
                <p className="text-xs text-slate-600 mb-3">
                  {tech.description[language]}
                </p>

                {/* Practical Specifications */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-3">
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-purple-700" />
                    <span>Technical & Operational Specs</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {tech.techSpecs}
                  </p>
                </div>

                {/* Subsidy Info */}
                <div className="bg-emerald-50/80 rounded-xl p-2.5 border border-emerald-200 text-xs text-emerald-950 mb-3">
                  <div className="font-bold text-[10px] uppercase text-emerald-800 tracking-wider">
                    Government Subsidy / Incentive:
                  </div>
                  <div className="text-[11px] mt-0.5 font-medium">{tech.subsidyAvailable[language]}</div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onSelectCropIssue) {
                      onSelectCropIssue(
                        `Requesting expert advice and drone/tech integration for ${tech.title.en}. How to configure and apply on my crop?`
                      );
                    }
                  }}
                  className="flex-1 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-pink-300" />
                  <span>Ask Plant AI for Advice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: PRACTICAL SOLUTION VIDEOS */}
      {activeTab === 'videos' && (
        <div>
          {activeVideo ? (
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md mb-6 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  ← Back to Video Guides List
                </button>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  {activeVideo.duration}
                </span>
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-slate-950 relative border border-slate-200">
                <img
                  src={activeVideo.videoPlaceholderUrl}
                  alt={activeVideo.title.en}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider">
                      Video Demonstration Masterclass
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Instructor: {activeVideo.instructor}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 font-serif mb-2">
                {activeVideo.title[language]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                {activeVideo.summary[language]}
              </p>

              {/* Action Steps from Video */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Stepwise Formula & Action Checklist:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeVideo.stepByStepKeySteps[language]?.map((step, idx) => (
                    <div key={idx} className="text-xs text-emerald-950 flex items-start gap-2 bg-white/70 p-2 rounded-xl border border-emerald-100">
                      <span className="w-4 h-4 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {agriSolutionVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div
                    onClick={() => setActiveVideo(video)}
                    className="cursor-pointer relative"
                  >
                    <img
                      src={video.videoPlaceholderUrl}
                      alt={video.title.en}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {video.duration}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider mb-1">
                        {video.instructor}
                      </div>
                      <h4
                        onClick={() => setActiveVideo(video)}
                        className="text-sm font-black text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 cursor-pointer mb-2"
                      >
                        {video.title[language]}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {video.summary[language]}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-medium">
                        Telugu, Hindi & English
                      </span>
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                      >
                        <span>Watch Guide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
