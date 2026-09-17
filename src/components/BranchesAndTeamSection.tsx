import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Clock,
  Compass
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';

interface BranchesAndTeamSectionProps {
  language: Language;
  onOpenBooking: () => void;
}

export const BranchesAndTeamSection: React.FC<BranchesAndTeamSectionProps> = ({
  language,
  onOpenBooking,
}) => {
  const t = translations[language];

  return (
    <section id="branches-team" className="py-16 bg-white border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Building2 className="w-3.5 h-3.5 text-purple-700" />
            <span>ORGANIZATION & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
            {t.teamInfo.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.missionSummary}
          </p>
        </div>

        {/* Company Leadership & Headquarters Hero Card */}
        <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-12 border border-purple-800">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Leadership Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-400/30 px-3 py-1 rounded-full text-xs font-semibold text-pink-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Founding Leadership & Team</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">
                  {companyDetails.founder}
                </h3>
                <p className="text-pink-200 text-sm font-medium mt-1">
                  WOMENE Society & Technology Care Network
                </p>
              </div>

              <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                {language === 'te'
                  ? 'మహిళా సాధికారత మరియు సమాజ శ్రేయస్సు కోసం ప్రారంభించబడిన వినూత్న వ్యవస్థ. 4 కి.మీ పరిధిలో విశ్వసనీయమైన మహిళా ప్రతినిధుల ద్వారా వృద్ధుల సంరక్షణ, పిల్లల పోషణ, ఆరోగ్య భద్రత మరియు గ్రామీణ ఉత్పత్తుల మార్కెటింగ్‌ను సులభతరం చేస్తుంది.'
                  : language === 'hi'
                  ? 'महिला सशक्तिकरण और समाज कल्याण के लिए समर्पित एक अनूठी मानवीय पहल। 4 किमी के दायरे में बुजुर्गों की देखभाल, बच्चों का पोषण, स्वास्थ्य सहायता और ग्रामीण उत्पादों का वितरण उपलब्ध कराता है।'
                  : 'A mission-driven organization deploying verified women caregivers and multi-modal life intelligence to safeguard elders, assist travelers, support working parents, and empower rural livelihoods.'}
              </p>

              {/* Verified Contact Details Grid */}
              <div className="pt-2 grid sm:grid-cols-2 gap-3.5 text-xs">
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-pink-300 font-bold uppercase tracking-wider block mb-1">
                    {t.teamInfo.teamHelpline}
                  </span>
                  <p className="text-sm font-bold text-white">
                    {companyDetails.contacts.team1} / {companyDetails.contacts.team2}
                  </p>
                </div>

                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                    {t.teamInfo.bookingHelpline}
                  </span>
                  <p className="text-sm font-bold text-emerald-300">
                    {companyDetails.contacts.bookingHelpline}
                  </p>
                  <span className="text-[10px] text-purple-200 block">Offline & Online Available</span>
                </div>

                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-purple-300 font-bold uppercase tracking-wider block mb-1">
                    {t.teamInfo.emailTitle}
                  </span>
                  <p className="text-sm font-bold text-white truncate">
                    {companyDetails.email}
                  </p>
                </div>

                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider block mb-1">
                    WhatsApp Direct Connect
                  </span>
                  <a
                    href={companyDetails.whatsAppDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-300 hover:underline flex items-center gap-1 mt-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open 7989997015 on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Head Office Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
              <div className="flex items-center gap-2 text-pink-300">
                <MapPin className="w-5 h-5 shrink-0" />
                <span className="font-bold text-sm tracking-wide uppercase">
                  {t.teamInfo.officeLocation}
                </span>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-sm font-bold text-white leading-snug">
                  {companyDetails.officeLocation}
                </p>
                <p className="text-xs text-purple-200 mt-1">
                  Bengaluru, Karnataka, India
                </p>
              </div>

              {/* Expansion Notice Banner */}
              <div className="bg-amber-400/20 border border-amber-300/40 p-4 rounded-xl text-amber-200 text-xs leading-relaxed">
                <span className="font-bold text-amber-100 block mb-1">
                  {language === 'te' ? 'రాష్ట్రవ్యాప్త విస్తరణ సమాచారం:' : language === 'hi' ? 'राज्यव्यापी विस्तार सूचना:' : 'State-Wide Expansion Notice:'}
                </span>
                <p>{companyDetails.expansionRoadmap[language]}</p>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Book Service Now (Online/Offline)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Operating Branches Grid */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {t.teamInfo.branchesTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {t.teamInfo.branchesSubtitle}
              </p>
            </div>
            <span className="text-xs bg-purple-50 text-purple-800 font-bold px-3 py-1 rounded-full border border-purple-200">
              9 Primary Hubs + Mandal/Zilla Expansion
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyDetails.branches.map((branch) => (
              <div
                key={branch.id}
                className={`p-5 rounded-2xl border transition-all ${
                  branch.isHeadOffice
                    ? 'border-purple-300 bg-purple-50/50 shadow-xs ring-1 ring-purple-400'
                    : 'border-slate-200 bg-white hover:border-purple-200 shadow-2xs'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-700" />
                    <span>{branch.name[language]}</span>
                  </h4>

                  {branch.isHeadOffice ? (
                    <span className="text-[10px] font-bold bg-purple-700 text-white px-2 py-0.5 rounded-md">
                      Head Office
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      Active Branch
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 font-medium mb-3">
                  {branch.state} • Operational Coverage within 4 KM
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${branch.phone}`}
                    className="font-bold text-slate-700 hover:text-purple-700 flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-purple-600" />
                    <span>{branch.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/91${branch.whatsapp}?text=${encodeURIComponent(
                      `Hello WOMENE ${branch.name.en} branch, I need service assistance.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
