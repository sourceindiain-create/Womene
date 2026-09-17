import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RefreshCw, 
  Phone, 
  MessageCircle, 
  Calendar,
  ShieldCheck,
  User
} from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { translations } from '../translations';
import { companyDetails } from '../data/servicesData';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  language,
  onOpenBooking,
  onOpenEmergency,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  // Initialize welcome message when language changes
  useEffect(() => {
    const welcomeText = language === 'te'
      ? 'నమస్కారం! నేను మీ WOMENE AI అసిస్టెంట్‌ని. వృద్ధుల సంరక్షణ, భోజన సేవలు, ప్రయాణ తోడు, AI డాక్టర్ లేదా అత్యవసర సేవల గురించి మీకు ఎలా సహాయపడగలను?'
      : language === 'hi'
      ? 'नमस्ते! मैं आपका WOMENE AI सहायक हूँ। बुजुर्गों की देखभाल, भोजन सेवाएं, यात्रा में साथी, AI डॉक्टर या आपातकालीन सहायता के बारे में मैं आपकी क्या मदद कर सकता हूँ?'
      : 'Hello! I am your WOMENE AI Assistant. How can I assist you with Elder Care, Food, Travel Companions, AI Doctor, or Emergency Services?';

    setMessages([
      {
        id: 'welcome-msg',
        sender: 'ai',
        text: welcomeText,
        timestamp: new Date(),
      }
    ]);
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (customText?: string) => {
    const messageToSend = customText || inputText;
    if (!messageToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageToSend.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend.trim(),
          language,
          conversationHistory: messages.slice(-6).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply,
            timestamp: new Date(),
          }
        ]);
      } else {
        throw new Error('No reply from server');
      }
    } catch {
      // Deterministic fallback response
      const fallback = language === 'te'
        ? 'WOMENE సేవలను ఆన్‌లైన్ లేదా ఆఫ్‌లైన్‌లో బుక్ చేసుకోవడానికి మీరు మా బుకింగ్ బటన్ నొక్కవచ్చు లేదా నేరుగా 7989997015 నంబర్‌కు వాట్సాప్ చేయవచ్చు. మా హెల్ప్‌లైన్: 8125016226.'
        : language === 'hi'
        ? 'WOMENE सेवाओं को ऑनलाइन या ऑफलाइन बुक करने के लिए आप बुकिंग बटन दबा सकते हैं या सीधे 7989997015 पर व्हाट्सएप कर सकते हैं। हेल्पलाइन: 8125016226.'
        : 'You can book WOMENE services directly via our 5-step booking flow or connect instantly on WhatsApp at 7989997015. Helpline: 8125016226.';

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: fallback,
          timestamp: new Date(),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = language === 'te'
    ? [
        'వృద్ధుల సంరక్షణ సర్వీస్ వివరాలు ఏమిటి?',
        '4 కి.మీ అత్యవసర SOS ఎలా పనిచేస్తుంది?',
        'డాక్టర్ కృష్ణ చైతన్య & టీమ్ గురించి తెలపండి',
        'గ్రామీణ మార్కెట్ ఆర్గానిక్ ఉత్పత్తులు ఏమిటి?',
      ]
    : language === 'hi'
    ? [
        'बुजुर्ग देखभाल सेवा कैसे काम करती है?',
        '4 किमी आपातकालीन SOS क्या है?',
        'डॉ. कृष्ण चैतन्य एवं टीम के बारे में बताएं',
        'AI डॉक्टर के 5 समाधान मार्ग क्या हैं?',
      ]
    : [
        'How does Elder Care & Hospital Escort work?',
        'Explain the 4 KM emergency SOS network',
        'Tell me about Dr. Krishna Chaitanya & Team',
        'What are the 5 AI Doctor solution pathways?',
      ];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col animate-slideUp">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-800 text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-pink-300">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm">WOMENE AI ASSISTANT</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-purple-200">
              Fluent in Telugu, English & Hindi
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-purple-700 text-white rounded-br-xs shadow-xs'
                  : 'bg-white text-slate-800 border border-purple-100 rounded-bl-xs shadow-2xs'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-purple-700 p-3 rounded-2xl border border-purple-100 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Thinking in {language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'}...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 scrollbar-none shrink-0">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="whitespace-nowrap bg-purple-50 hover:bg-purple-100 text-purple-900 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-purple-100 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === 'te' ? 'మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...' : language === 'hi' ? 'अपना प्रश्न यहां लिखें...' : 'Ask anything about WOMENE...'}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="p-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Action Buttons */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button
            onClick={onOpenBooking}
            className="text-purple-700 hover:underline font-bold flex items-center gap-1"
          >
            <Calendar className="w-3 h-3" />
            <span>Book Service</span>
          </button>

          <a
            href={companyDetails.whatsAppDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp 7989997015</span>
          </a>

          <button
            onClick={onOpenEmergency}
            className="text-red-600 hover:underline font-bold flex items-center gap-1"
          >
            <span>SOS</span>
          </button>
        </div>
      </div>

    </div>
  );
};
