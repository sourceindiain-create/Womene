import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellRing, 
  ShieldAlert, 
  Radio, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  X, 
  Copy, 
  Check, 
  Smartphone, 
  CloudLightning, 
  HeartPulse, 
  Users, 
  Flame 
} from 'lucide-react';
import { 
  requestFcmToken, 
  checkFcmSupport, 
  subscribeToRealtimeAlerts, 
  dispatchFcmBroadcast, 
  getRecentBroadcasts, 
  playAlertSound,
  FcmBroadcastPayload 
} from '../lib/fcm';

interface FcmAlertsCenterProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'te' | 'hi';
}

export const FcmAlertsCenter: React.FC<FcmAlertsCenterProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [fcmToken, setFcmToken] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active Broadcasts & Alert Feed
  const [alerts, setAlerts] = useState<FcmBroadcastPayload[]>([]);
  const [activeToast, setActiveToast] = useState<FcmBroadcastPayload | null>(null);

  // Subscribed Topics
  const [subscribedTopics, setSubscribedTopics] = useState<string[]>([
    'emergency_sos',
    'women_safety',
    'health_advisory',
    'weather_warning',
  ]);

  // Form for sending a new live broadcast
  const [broadcastTitle, setBroadcastTitle] = useState<string>('');
  const [broadcastBody, setBroadcastBody] = useState<string>('');
  const [broadcastType, setBroadcastType] = useState<FcmBroadcastPayload['type']>('emergency_sos');
  const [broadcastSeverity, setBroadcastSeverity] = useState<FcmBroadcastPayload['severity']>('high');
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchStatus, setDispatchStatus] = useState<string>('');

  // Initial check & load cached token
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
    const cachedToken = localStorage.getItem('womene_fcm_token');
    if (cachedToken) {
      setFcmToken(cachedToken);
    }

    checkFcmSupport().then((supp) => {
      setIsSupported(supp);
    });

    // Load recent broadcast history
    getRecentBroadcasts(8).then((history) => {
      if (history.length) {
        setAlerts(history);
      } else {
        // Sample baseline broadcasts
        setAlerts([
          {
            id: 'sample-1',
            title: '🚨 Rapid Response Network Active: East Godavari & Krishna Districts',
            body: '24/7 verified volunteer emergency escorts and female safety patrols are on high standby.',
            type: 'women_safety',
            severity: 'high',
            targetTopic: 'women_safety',
            sender: 'WOMENE Command Central',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 'sample-2',
            title: '🌾 Monsoon Weather Advisory for Coastal Andhra Farmers',
            body: 'Sudden rain predicted over next 48 hrs. Secure harvested paddy and check PM-Kisan crop helplines.',
            type: 'weather_warning',
            severity: 'normal',
            targetTopic: 'weather_warning',
            sender: 'WOMENE Plant & Agri AI',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
          }
        ]);
      }
    });

    // Subscribe to real-time incoming alerts across Firebase
    const unsubscribe = subscribeToRealtimeAlerts((incomingAlert) => {
      setAlerts((prev) => [incomingAlert, ...prev]);
      setActiveToast(incomingAlert);
      if (soundEnabled) {
        playAlertSound(incomingAlert.severity);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [soundEnabled]);

  const handleEnablePush = async () => {
    setIsRegistering(true);
    setDispatchStatus('');
    try {
      const res = await requestFcmToken({
        topics: subscribedTopics,
      });
      setPermission(res.permission);
      if (res.token) {
        setFcmToken(res.token);
        setDispatchStatus(
          language === 'te'
            ? 'పుష్ నోటిఫికేషన్లు యాక్టివేట్ అయ్యాయి! రియల్-టైమ్ అలర్ట్స్ సిద్ధంగా ఉన్నాయి.'
            : language === 'hi'
            ? 'पुश सूचनाएं सक्रिय हो गईं! रीयल-टाइम अलर्ट तैयार हैं।'
            : 'Push notifications active! Real-time emergency alerts are enabled.'
        );
      } else if (res.error) {
        setDispatchStatus(`Notice: ${res.error}`);
      }
    } catch (e: unknown) {
      console.error('Error enabling push:', e);
      setDispatchStatus('Error registering device token.');
    } finally {
      setIsRegistering(false);
    }
  };

  const toggleTopic = (topic: string) => {
    setSubscribedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleCopyToken = () => {
    if (!fcmToken) return;
    navigator.clipboard.writeText(fcmToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendTestBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastBody.trim()) return;

    setIsDispatching(true);
    setDispatchStatus('');

    try {
      const res = await dispatchFcmBroadcast({
        title: broadcastTitle.trim(),
        body: broadcastBody.trim(),
        type: broadcastType,
        severity: broadcastSeverity,
        targetTopic: broadcastType,
        sender: 'WOMENE Community Dispatch',
      });

      if (res.success) {
        setDispatchStatus(
          language === 'te'
            ? 'అలర్ట్ విజయవంతంగా ప్రసారం చేయబడింది! అన్ని డివైజ్‌లకు చేరింది.'
            : language === 'hi'
            ? 'अलर्ट सफलतापूर्वक प्रसारित किया गया! सभी उपकरणों तक पहुंचा।'
            : 'Alert broadcast dispatched! Synced across all connected devices in real-time.'
        );
        setBroadcastTitle('');
        setBroadcastBody('');
      } else {
        setDispatchStatus(`Dispatch error: ${res.error}`);
      }
    } catch (err: unknown) {
      setDispatchStatus('Failed to send broadcast.');
    } finally {
      setIsDispatching(false);
    }
  };

  const triggerQuickSample = (type: 'sos' | 'weather' | 'doctor') => {
    if (type === 'sos') {
      setBroadcastTitle('🚨 High-Priority SOS: Emergency Medical Assistance Requested');
      setBroadcastBody('Patient in Kankipadu requires immediate transport. Nearest WOMENE coordinator responding.');
      setBroadcastType('emergency_sos');
      setBroadcastSeverity('critical');
    } else if (type === 'weather') {
      setBroadcastTitle('⛈️ Crop Alert: High Wind & Sudden Rainfall Warning');
      setBroadcastBody('Heavy rainfall expected within 3 hours. Protect outdoor nurseries and threshing yards.');
      setBroadcastType('weather_warning');
      setBroadcastSeverity('high');
    } else {
      setBroadcastTitle('🩺 Health Advisory: Seasonal Dengue & Viral Prevention');
      setBroadcastBody('Free tele-consultations active with WOMENE AI Doctor. Drink boiled water and use neem smoke repellent.');
      setBroadcastType('health_advisory');
      setBroadcastSeverity('normal');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 bg-rose-600/20 border border-rose-500/40 rounded-xl text-rose-400">
              <Radio className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {language === 'te'
                    ? 'ఫైర్‌బేస్ క్లౌడ్ మెసేజింగ్ (FCM) & ఎమర్జెన్సీ అలర్ట్స్'
                    : language === 'hi'
                    ? 'फायरबेस क्लाउड मैसेजिंग (FCM) और इमरजेंसी अलर्ट'
                    : 'Firebase Cloud Messaging (FCM) & Emergency Hub'}
                </h2>
                <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/40 uppercase tracking-wider">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {language === 'te'
                  ? 'మహిళల భద్రత, అత్యవసర SOS మరియు వ్యవసాయ రియల్-టైమ్ అప్‌డేట్స్'
                  : language === 'hi'
                  ? 'महिला सुरक्षा, आपातकालीन SOS और कृषि रीयल-टाइम अपडेट'
                  : 'Instant push alerts, Women Safety SOS, and community advisories'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (nextState) playAlertSound('normal');
              }}
              className={`p-2 rounded-lg border transition ${
                soundEnabled 
                  ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700' 
                  : 'bg-slate-800/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title={soundEnabled ? 'Alert Sounds Active' : 'Alert Sounds Muted'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-200 text-sm">
          {/* Status Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Firebase Cloud Engine</div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active (FCM v1 / Web Push)
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Browser Push Permission</div>
                <div className="text-xs font-bold capitalize mt-0.5 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    permission === 'granted' ? 'bg-emerald-500' : permission === 'denied' ? 'bg-red-500' : 'bg-amber-500'
                  }`} />
                  <span className={permission === 'granted' ? 'text-emerald-400' : permission === 'denied' ? 'text-red-400' : 'text-amber-400'}>
                    {permission}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Device Token</div>
                <div className="text-xs font-mono font-bold text-indigo-300 truncate max-w-[140px] mt-0.5">
                  {fcmToken ? `${fcmToken.slice(0, 10)}...${fcmToken.slice(-6)}` : 'Not registered yet'}
                </div>
              </div>
            </div>
          </div>

          {/* FCM Registration Banner */}
          <div className="bg-gradient-to-r from-rose-950/60 to-purple-950/60 border border-rose-800/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-semibold text-white">
                <BellRing className="w-4 h-4 text-rose-400 animate-bounce" />
                {language === 'te'
                  ? 'రియల్-టైమ్ నోటిఫికేషన్లను ప్రారంభించండి'
                  : language === 'hi'
                  ? 'रीयल-टाइम नोटिफिकेशन सक्षम करें'
                  : 'Subscribe to Real-Time Push Alerts'}
              </div>
              <p className="text-xs text-slate-300 max-w-lg">
                {language === 'te'
                  ? 'అత్యవసర SOS అలర్ట్స్, సమీప వైద్య సలహాలు మరియు గ్రామ రక్షణ హెచ్చరికలను నేరుగా మీ మొబైల్ లేదా బ్రౌజర్‌లో అందుకోండి.'
                  : language === 'hi'
                  ? 'आपातकालीन SOS अलर्ट, आस-पास की चिकित्सा सलाह और ग्राम सुरक्षा चेतावनियाँ सीधे अपने मोबाइल या ब्राउज़र पर प्राप्त करें।'
                  : 'Receive emergency sirens, women safety warnings, weather advisories, and service dispatches directly even when offline.'}
              </p>
            </div>

            <button
              onClick={handleEnablePush}
              disabled={isRegistering}
              className="w-full sm:w-auto px-4 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 text-white font-medium rounded-xl text-xs transition shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 shrink-0"
            >
              {isRegistering ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registering Token...
                </>
              ) : permission === 'granted' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  Push Enabled (Refresh Token)
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  Enable Push Notifications
                </>
              )}
            </button>
          </div>

          {dispatchStatus && (
            <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
              <span>{dispatchStatus}</span>
              <button onClick={() => setDispatchStatus('')} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* FCM Registration Token Preview */}
          {fcmToken && (
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-2">
              <div className="truncate text-xs">
                <span className="text-slate-400 font-mono">FCM Token: </span>
                <span className="text-slate-300 font-mono select-all">{fcmToken}</span>
              </div>
              <button
                onClick={handleCopyToken}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Token'}
              </button>
            </div>
          )}

          {/* Alert Topics Subscriptions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              Subscribed Push Topics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'emergency_sos', title: 'Emergency SOS & Distress Alert', desc: 'Critical siren for life safety and medical calls', icon: ShieldAlert, color: 'text-rose-400' },
                { id: 'women_safety', title: 'Women Safety & Night Escort', desc: 'Real-time patrol updates and village safe zones', icon: BellRing, color: 'text-pink-400' },
                { id: 'weather_warning', title: 'Farmer Weather & Crop Alerts', desc: 'Heavy monsoon, cyclone, and rainfall advisories', icon: CloudLightning, color: 'text-amber-400' },
                { id: 'health_advisory', title: 'AI Doctor & Health Outbreaks', desc: 'Disease outbreak warnings and triage digests', icon: HeartPulse, color: 'text-emerald-400' },
              ].map((topic) => {
                const active = subscribedTopics.includes(topic.id);
                const IconComponent = topic.icon;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition ${
                      active
                        ? 'bg-slate-800/90 border-slate-600 text-white'
                        : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${active ? 'bg-slate-700/80' : 'bg-slate-800/50'} ${topic.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-white">{topic.title}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {active ? 'Subscribed' : 'Off'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{topic.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Broadcast Dispatcher */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-rose-400" />
                  Dispatch Real-Time Alert Broadcast (Live FCM + Firestore)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Broadcasts instant push notification to all subscribed village coordinators and user devices.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400">Quick Samples:</span>
                <button
                  type="button"
                  onClick={() => triggerQuickSample('sos')}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded border border-rose-500/30 transition"
                >
                  SOS
                </button>
                <button
                  type="button"
                  onClick={() => triggerQuickSample('weather')}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 transition"
                >
                  Weather
                </button>
                <button
                  type="button"
                  onClick={() => triggerQuickSample('doctor')}
                  className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 transition"
                >
                  Health
                </button>
              </div>
            </div>

            <form onSubmit={handleSendTestBroadcast} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">Category</label>
                  <select
                    value={broadcastType}
                    onChange={(e) => setBroadcastType(e.target.value as FcmBroadcastPayload['type'])}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="emergency_sos">🚨 Emergency SOS Distress</option>
                    <option value="women_safety">🛡️ Women Safety Escort</option>
                    <option value="weather_warning">⛈️ Weather & Crop Advisory</option>
                    <option value="health_advisory">🩺 AI Doctor Health Notice</option>
                    <option value="community_update">🏘️ Community General Care</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">Severity Level & Chime</label>
                  <select
                    value={broadcastSeverity}
                    onChange={(e) => setBroadcastSeverity(e.target.value as FcmBroadcastPayload['severity'])}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="critical">🔴 Critical Siren (Urgent distress tone)</option>
                    <option value="high">🟡 High Priority Beep (Attention advisory)</option>
                    <option value="normal">🟢 Normal Bell (Community pleasant ding)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1 font-medium">Alert Title</label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Flash Flood Warning: Krishna River Catchment Area"
                  maxLength={150}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1 font-medium">Alert Message Details</label>
                <textarea
                  rows={2}
                  value={broadcastBody}
                  onChange={(e) => setBroadcastBody(e.target.value)}
                  placeholder="Provide essential instructions, contact numbers, or safe zone locations..."
                  maxLength={500}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => playAlertSound(broadcastSeverity)}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                  Test Chime Audio
                </button>

                <button
                  type="submit"
                  disabled={isDispatching || !broadcastTitle.trim() || !broadcastBody.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:bg-slate-800 disabled:opacity-50 text-white font-medium rounded-xl text-xs flex items-center gap-2 transition shadow-md"
                >
                  {isDispatching ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Broadcasting...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Broadcast Real-Time Alert
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Real-Time Live Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                Live Emergency Feed & Broadcast Stream ({alerts.length})
              </h3>
              <span className="text-[10px] text-slate-400">Syncing via Firestore & FCM</span>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {alerts.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  No active broadcasts recorded. All sectors reported normal.
                </div>
              ) : (
                alerts.map((item, index) => {
                  const isCrit = item.severity === 'critical';
                  const isHigh = item.severity === 'high';
                  return (
                    <div
                      key={item.id || index}
                      className={`p-3 rounded-xl border transition ${
                        isCrit
                          ? 'bg-rose-950/40 border-rose-800/80 shadow-lg shadow-rose-950/30'
                          : isHigh
                          ? 'bg-amber-950/30 border-amber-800/60'
                          : 'bg-slate-800/60 border-slate-700/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            isCrit
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : isHigh
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-700 text-slate-300'
                          }`}>
                            {item.severity}
                          </span>
                          <span className="text-[11px] text-slate-400">{item.sender || 'WOMENE Network'}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white mt-1.5">{item.title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.body}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-3.5 sm:p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>FCM Project: <strong className="text-slate-200">studio-6989353372-64cd3</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
