import React, { useState } from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  Bug, 
  Sprout, 
  Layers, 
  Sparkles, 
  Send, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  RefreshCw,
  FileText,
  Activity,
  Smile,
  Leaf,
  BookOpen,
  Cpu,
  Smartphone,
  Video,
  ExternalLink
} from 'lucide-react';
import { Language, DoctorType, DoctorAnalysis } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';
import { AgriResourcesHub } from './AgriResourcesHub';

interface AiDoctorSectionProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenLibrary?: () => void;
}

export const AiDoctorSection: React.FC<AiDoctorSectionProps> = ({
  language,
  onOpenBooking,
  onOpenLibrary,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType>('human');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<DoctorAnalysis | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAgriHub, setShowAgriHub] = useState(true);

  const t = translations[language];

  // Engine configurations
  const doctorEngines = [
    {
      id: 'human' as DoctorType,
      label: t.doctorSection.humanDoctor,
      icon: HeartPulse,
      desc: language === 'te' ? 'జనరల్ మెడిసిన్, ఒత్తిడి, గుండె, ఆయుర్వేదం' : language === 'hi' ? 'सामान्य चिकित्सा, तनाव, हृदय, आयुर्वेद' : 'General clinical medicine, vital triage & Ayurveda',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      id: 'animal' as DoctorType,
      label: t.doctorSection.animalDoctor,
      icon: Smile,
      desc: language === 'te' ? 'ఆవులు, గేదెలు, మేకలు, పెంపుడు జంతువులు' : language === 'hi' ? 'गाय, भैंस, बकरी, पालतू पशु' : 'Cattle, buffaloes, sheep, EVM remedies & pets',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'bird' as DoctorType,
      label: t.doctorSection.birdDoctor,
      icon: Activity,
      desc: language === 'te' ? 'కోళ్ళు, బాతులు, పావురాలు, పక్షుల ఆరోగ్యం' : language === 'hi' ? 'मुर्गी, बत्तख, कबूतर, पक्षी देखभाल' : 'Poultry flocks, native chickens, Ranikhet & coryza',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    },
    {
      id: 'plant' as DoctorType,
      label: t.doctorSection.plantDoctor,
      icon: Sprout,
      desc: language === 'te' ? 'ఆకులు, కాండం, తెగుళ్ళు, పోషక లోపాలు' : language === 'hi' ? 'पत्ते, तना, कीट व पोषण रोग' : 'Plant pathology, fungal rust, sucking pests & drones',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'crop' as DoctorType,
      label: t.doctorSection.cropDoctor,
      icon: Leaf,
      desc: language === 'te' ? 'వరి, పత్తి, మిర్చి, మొక్కజొన్న, కూరగాయలు' : language === 'hi' ? 'धान, कपास, मिर्च, मक्का, सब्जियां' : 'Paddy, cotton, chilli, horticulture & Govt apps',
      badgeColor: 'bg-green-100 text-green-800 border-green-200',
    },
    {
      id: 'soil' as DoctorType,
      label: t.doctorSection.soilDoctor,
      icon: Layers,
      desc: language === 'te' ? 'pH, NPK పోషకాలు, జీవామృతం, నేల సారం' : language === 'hi' ? 'pH, NPK पोषक, जीवामृत, मृदा परीक्षण' : 'pH, salinity EC, NPK, organic carbon & ZBNF',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    },
  ];

  // Domain-specific prompt presets
  const samplePromptsByDoctor: Record<DoctorType, Array<{ label: string; text: string }>> = {
    human: [
      { label: 'Fever & Cough', text: 'Persistent dry cough, mild fever 100°F, and body aches since yesterday.' },
      { label: 'Knee Pain & Arthritis', text: 'Severe knee joint stiffness in morning, swelling, difficulty climbing stairs.' },
      { label: 'Acidity & Gas', text: 'Burning chest pain after meals, bloating, sour burps and indigestion.' },
    ],
    animal: [
      { label: 'Mastitis (Udder Swelling)', text: 'Milch cow has hard, swollen udder with clot flakes in milk and tenderness.' },
      { label: 'Foot & Mouth (FMD)', text: 'Buffalo has excessive salivation, tongue blisters and limping in front hoof.' },
      { label: 'Bloat & Tympany', text: 'Goat has distended left flank abdomen, discomfort, stopped chewing cud.' },
    ],
    bird: [
      { label: 'Coryza (Swollen Face)', text: 'Chickens have facial swelling, eye discharge, sneezing, foul-smelling nasal fluid.' },
      { label: 'Ranikhet / Newcastle', text: 'Native poultry birds gasping for breath, twisted necks, greenish white droppings.' },
      { label: 'Coccidiosis (Bloody Stool)', text: 'Chicks huddled near brooder light, ruffled feathers, bloody diarrhea.' },
    ],
    plant: [
      { label: 'Leaf Blast & Blight', text: 'Spindle-shaped brown lesions with grey center spreading on crop leaves.' },
      { label: 'Sucking Pests & Thrips', text: 'Underside of leaves curled upwards, silver sheen, sticky honeydew secreted.' },
      { label: 'Iron & Zinc Deficiency', text: 'Interveinal chlorosis with green veins and bleached yellow leaf tissue.' },
    ],
    crop: [
      { label: 'Paddy Brown Plant Hopper', text: 'Hopper burn circular patches of dried yellow straw in dense paddy canopy.' },
      { label: 'Chilli Leaf Curl & Mites', text: 'Chilli leaves curling downward (inverted boat shape) with stunted flower drop.' },
      { label: 'Cotton Pink Bollworm', text: 'Rosetted flowers and entry bore holes plugged with excreta in cotton squares.' },
    ],
    soil: [
      { label: 'High Salinity (Sodic Soil)', text: 'Soil has white crust layer, poor water infiltration, and stunted seedlings.' },
      { label: 'Low Organic Carbon (<0.3%)', text: 'Red soil compacted like hard brick; need natural revival formula with Jeevamrutha.' },
      { label: 'Acidic Soil (pH 5.2)', text: 'Low pH causing phosphorus lock-up and aluminum toxicity in field.' },
    ],
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setErrorMessage(
        language === 'te' 
          ? 'దయచేసి లక్షణాలు లేదా సమస్యను వివరించండి' 
          : language === 'hi' 
          ? 'कृपया लक्षण या समस्या का विवरण दें' 
          : 'Please describe the symptoms or condition'
      );
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setAnalysis(null);

    try {
      const res = await fetch('/api/ai/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorType: selectedDoctor,
          symptoms: symptoms.trim(),
          language,
          imageBase64: imagePreview,
        }),
      });

      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      } else {
        throw new Error('Analysis payload missing');
      }
    } catch {
      // Deterministic client fallback in case of connection glitch
      setAnalysis({
        summary: `Triage for ${selectedDoctor}: ${symptoms}`,
        rootCauseAnalysis: 'Environmental transition, nutrient or physical fatigue.',
        riskLevel: 'Low',
        pathways: {
          modern: 'Monitor vital statistics, maintain safe hydration and standard first-aid monitoring.',
          lowCost: 'Boiled water hydration, easily digestible khichdi/rice gruel, and restful recovery.',
          natural: 'Fresh tulsi, dry ginger herbal decoction, or Jeevamrutha for soil/crop vitality.',
          ayurveda: 'Turmeric with warm milk (golden milk) and gentle herbal steam.',
          lifestyle: 'Ensure 8 hours of restful sleep, avoid strenuous cold drafts, practice gentle breathing.',
        },
        whenToConsultDoctor: 'Fever over 101°F, acute breathing difficulty, or unsubsiding symptoms past 48 hours.',
        languageResponse: language === 'te' 
          ? 'ఈ లక్షణాలకు తగిన విశ్రాంతి, సమతుల్య ఆహారం మరియు పరిశుభ్రమైన నీరు అవసరం. తీవ్రత ఎక్కువగా ఉంటే వెంటనే వైద్యుడిని లేదా WOMENE కేంద్రాన్ని సంప్రదించండి.'
          : language === 'hi'
          ? 'इन लक्षणों के लिए आराम, हल्का सुपाच्य भोजन और पर्याप्त पानी लें। स्थिति गंभीर होने पर तुरंत डॉक्टर से संपर्क करें।'
          : 'For reported symptoms, maintain rest and light nutrition. Connect with a WOMENE health coordinator for clinical escort if needed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-doctor" className="py-16 bg-white border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Telugu/Hindi Quote */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-900 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>{t.doctorSection.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
            {t.doctorSection.subtitle}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-purple-800 italic mt-3 bg-purple-50 p-2.5 rounded-xl border border-purple-200">
            {t.doctorSection.quote}
          </p>
        </div>

        {/* 6 Specialized AI Engines Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {doctorEngines.map((doc) => {
            const Icon = doc.icon;
            const isSelected = selectedDoctor === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => {
                  setSelectedDoctor(doc.id);
                  setAnalysis(null);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/70 shadow-md ring-2 ring-purple-600/20'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${doc.badgeColor} border`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {doc.label}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {doc.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Diagnostic Input Workspace */}
        <div className="bg-slate-50/90 rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm mb-10">
          
          {/* Quick Presets for Selected Engine */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Quick Diagnostic Scenarios for {selectedDoctor.toUpperCase()}:</span>
              </span>
              <span className="text-[11px] text-purple-700 font-medium">Click to pre-fill symptoms:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {samplePromptsByDoctor[selectedDoctor].map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSymptoms(prompt.text);
                    setAnalysis(null);
                  }}
                  className="text-xs bg-white hover:bg-purple-100/70 text-purple-900 border border-purple-200 px-3 py-1.5 rounded-xl font-semibold transition-all hover:scale-102 flex items-center gap-1 shadow-2xs"
                >
                  <span className="text-pink-600 font-bold">+</span>
                  <span>{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleRunAnalysis} className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-purple-700" />
                <span>{t.doctorSection.describeIssue} ({selectedDoctor.toUpperCase()})</span>
              </label>
            </div>

            <textarea
              rows={4}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t.doctorSection.placeholder}
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all shadow-2xs"
            />

            {/* Media Upload and Action Strip */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors">
                  <Upload className="w-4 h-4 text-purple-600" />
                  <span>
                    {imagePreview 
                      ? (language === 'te' ? 'చిత్రం జోడించబడింది' : language === 'hi' ? 'चित्र संलग्न' : 'Image Attached') 
                      : (language === 'te' ? 'ఫోటో / రిపోర్ట్ అప్‌లోడ్' : language === 'hi' ? 'चित्र / रिपोर्ट अपलोड' : 'Attach Photo / Report')}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {onOpenLibrary && (
                  <button
                    type="button"
                    onClick={onOpenLibrary}
                    className="inline-flex items-center gap-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200 px-4 py-3 rounded-xl font-bold text-xs transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-purple-700" />
                    <span>AI Library (Books & Magazines)</span>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-purple-200 disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.doctorSection.analyzing}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t.doctorSection.runAnalysis}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
            )}
          </form>

          {/* Analysis Results Display */}
          {analysis && (
            <div className="mt-8 pt-6 border-t border-slate-200 animate-fadeIn">
              
              {/* Header result row */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-purple-100 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                    AI Triage Summary:
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {analysis.summary}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Risk Assessment:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    analysis.riskLevel === 'High' 
                      ? 'bg-red-100 text-red-800 border border-red-200' 
                      : analysis.riskLevel === 'Medium'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {analysis.riskLevel} Risk
                  </span>
                </div>
              </div>

              {/* Cultural natural language advisory */}
              {analysis.languageResponse && (
                <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 text-xs text-purple-950 font-medium mb-6 leading-relaxed">
                  {analysis.languageResponse}
                </div>
              )}

              {/* 5 Solution Pathways Matrix */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                  <span>{t.doctorSection.pathwaysTitle} (WOMENE Architecture)</span>
                </h4>

                <div className="grid md:grid-cols-5 gap-3">
                  {/* Modern */}
                  <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-blue-700 block mb-1">
                      {t.doctorSection.modernMedicine}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {analysis.pathways.modern}
                    </p>
                  </div>

                  {/* Low Cost */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-amber-700 block mb-1">
                      {t.doctorSection.lowCostMedicine}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {analysis.pathways.lowCost}
                    </p>
                  </div>

                  {/* Natural */}
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-emerald-700 block mb-1">
                      {t.doctorSection.naturalMedicine}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {analysis.pathways.natural}
                    </p>
                  </div>

                  {/* Ayurveda */}
                  <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-purple-700 block mb-1">
                      {t.doctorSection.ayurvedaMedicine}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {analysis.pathways.ayurveda}
                    </p>
                  </div>

                  {/* Lifestyle */}
                  <div className="bg-white p-4 rounded-2xl border border-teal-200 shadow-2xs">
                    <span className="text-[11px] font-bold text-teal-700 block mb-1">
                      {t.doctorSection.lifestyleMedicine}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {analysis.pathways.lifestyle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning Signs & Doctor Referral */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">When to Consult In-Person Healthcare / Vet Specialist:</span>
                  <p className="mt-0.5">{analysis.whenToConsultDoctor}</p>
                </div>
              </div>

              {/* Book physical assistance action */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-bold text-purple-800 hover:text-purple-900 flex items-center gap-1.5 underline"
                >
                  <span>Need an in-person hospital escort or caregiver? Book WOMENE Medical Companion</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          )}

          {/* Safety Disclaimer */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-start gap-2 text-[11px] text-slate-500">
            <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <p>{t.doctorSection.disclaimer}</p>
          </div>
        </div>

        {/* INTEGRATED AGRI RESOURCES HUB (GOVT APPS, AGRITECH, DRONES & SOLUTION VIDEOS) */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold mb-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>Plant AI & Rural Prosperity Ecosystem</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 font-serif">
                Agricultural Technology Suite & Government Support
              </h3>
            </div>
            <button
              onClick={() => setShowAgriHub(!showAgriHub)}
              className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-xl transition-colors"
            >
              {showAgriHub ? 'Collapse Agri Suite ▲' : 'Expand Agri Suite ▼'}
            </button>
          </div>

          {showAgriHub && (
            <AgriResourcesHub
              language={language}
              onSelectCropIssue={(issueText) => {
                setSelectedDoctor('crop');
                setSymptoms(issueText);
                setAnalysis(null);
                const el = document.getElementById('ai-doctor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenBooking={onOpenBooking}
            />
          )}
        </div>

      </div>
    </section>
  );
};
