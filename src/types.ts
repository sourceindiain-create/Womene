export type Language = 'te' | 'en' | 'hi';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
  isGuest: boolean;
  city?: string;
  token?: string;
}

export type ServiceCategory = 
  | 'food'
  | 'daily_care'
  | 'personal_care'
  | 'travel'
  | 'baby_care'
  | 'elder_care'
  | 'work_learn'
  | 'village_market'
  | 'emergency_sos'
  | 'ai_doctor';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: {
    en: string;
    te: string;
    hi: string;
  };
  subtitle: {
    en: string;
    te: string;
    hi: string;
  };
  description: {
    en: string;
    te: string;
    hi: string;
  };
  highlights: {
    en: string[];
    te: string[];
    hi: string[];
  };
  iconName: string;
  colorScheme: {
    primary: string;
    bg: string;
    badge: string;
    border: string;
  };
  popularTag?: string;
}

export interface Branch {
  id: string;
  name: {
    en: string;
    te: string;
    hi: string;
  };
  state: string;
  status: 'active' | 'head_office' | 'upcoming';
  phone: string;
  whatsapp: string;
  isHeadOffice?: boolean;
}

export interface DoctorAnalysis {
  summary: string;
  rootCauseAnalysis: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  pathways: {
    modern: string;
    lowCost: string;
    natural: string;
    ayurveda: string;
    lifestyle: string;
  };
  whenToConsultDoctor: string;
  languageResponse: string;
}

export type DoctorType = 'human' | 'animal' | 'bird' | 'plant' | 'crop' | 'soil';

export interface BookingFormState {
  category: string;
  serviceType: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  date: string;
  time: string;
  mode: 'offline' | 'online';
  notes: string;
}

// Agri Latest Technology Types
export interface AgriTechItem {
  id: string;
  title: { en: string; te: string; hi: string };
  category: 'drone' | 'iot_sensor' | 'smart_irrigation' | 'hydroponics' | 'satellite' | 'solar';
  tagline: { en: string; te: string; hi: string };
  description: { en: string; te: string; hi: string };
  keyBenefits: { en: string[]; te: string[]; hi: string[] };
  techSpecs: string;
  subsidyAvailable: { en: string; te: string; hi: string };
  applicableGovApp: string;
  iconName: string;
}

// Government Agri Apps & Portals
export interface GovernmentAgriApp {
  id: string;
  name: string;
  nativeName: { en: string; te: string; hi: string };
  ministryOrAuthority: string;
  purpose: { en: string; te: string; hi: string };
  keyFeatures: { en: string[]; te: string[]; hi: string[] };
  portalUrl: string;
  tollFreeHelpline?: string;
  badge: string;
  schemesCovered: string[];
}

// Agri Solutions Video & Demonstration Guides
export interface AgriSolutionVideo {
  id: string;
  title: { en: string; te: string; hi: string };
  category: 'natural_farming' | 'drone_spraying' | 'disease_control' | 'gov_schemes' | 'soil_health';
  duration: string;
  instructor: string;
  summary: { en: string; te: string; hi: string };
  stepByStepKeySteps: { en: string[]; te: string[]; hi: string[] };
  relatedBookOrDoc?: string;
  videoPlaceholderUrl: string;
}

// World-Wide AI Library Menu (Magazines & Books)
export type LibraryPeriodicity = 'daily' | 'weekly' | 'monthly' | 'book';
export type LibraryCategory = 
  | 'medical_health' 
  | 'agriculture_farming' 
  | 'veterinary_birds' 
  | 'women_society' 
  | 'technology_innovation';

export interface LibraryItem {
  id: string;
  title: { en: string; te: string; hi: string };
  subtitle: { en: string; te: string; hi: string };
  periodicity: LibraryPeriodicity;
  category: LibraryCategory;
  authorPublisher: string;
  edition: string;
  publicationDate: string;
  summary: { en: string; te: string; hi: string };
  highlights: { en: string[]; te: string[]; hi: string[] };
  tableOfContents: string[];
  fullArticleText: { en: string; te: string; hi: string };
  readTime: string;
  coverGradient: string;
  languageAvailable: Language[];
  tags: string[];
  pdfDownloadName: string;
}
