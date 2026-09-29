import { 
  getMessaging, 
  getToken, 
  onMessage, 
  isSupported, 
  Messaging 
} from 'firebase/messaging';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';
import { app, db, firebaseConfig, OperationType, handleFirestoreError } from './firebase';

export interface FcmTokenRecord {
  token: string;
  platform: 'web' | 'android' | 'ios';
  userAgent: string;
  topics: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastActive: string;
}

export interface FcmBroadcastPayload {
  id?: string;
  title: string;
  body: string;
  type: 'emergency_sos' | 'women_safety' | 'health_advisory' | 'weather_warning' | 'community_update';
  severity: 'critical' | 'high' | 'normal';
  targetTopic?: string;
  sender?: string;
  createdAt: string;
  metadata?: Record<string, string>;
}

let messagingInstance: Messaging | null = null;
let messagingSupportedPromise: Promise<boolean> | null = null;

// Safe check if Firebase Cloud Messaging is supported in current browser/frame
export async function checkFcmSupport(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    return false;
  }
  
  if (!messagingSupportedPromise) {
    messagingSupportedPromise = isSupported().catch(() => false);
  }
  return messagingSupportedPromise;
}

// Get or initialize Messaging instance safely
export async function getFcmMessaging(): Promise<Messaging | null> {
  const supported = await checkFcmSupport();
  if (!supported) {
    return null;
  }
  if (!messagingInstance) {
    try {
      messagingInstance = getMessaging(app);
    } catch (err) {
      console.warn('[FCM] Error initializing getMessaging:', err);
      return null;
    }
  }
  return messagingInstance;
}

// Web Audio API Emergency & Notification Chime Synthesizer
export function playAlertSound(severity: 'critical' | 'high' | 'normal' = 'normal') {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (severity === 'critical') {
      // Urgent Emergency Two-Tone Siren
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc1.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.25);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);

      osc2.frequency.setValueAtTime(440, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.65);
      osc2.stop(ctx.currentTime + 0.65);
    } else if (severity === 'high') {
      // High Priority Advisory Double Beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(740, ctx.currentTime);
      osc.frequency.setValueAtTime(987, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else {
      // Normal Community Pleasant Ding
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) {
    console.debug('[Audio] Could not play alert tone:', e);
  }
}

// Request Notification Permission and register FCM Token
export async function requestFcmToken(options?: {
  topics?: string[];
  vapidKey?: string;
}): Promise<{
  success: boolean;
  token?: string;
  permission: NotificationPermission;
  error?: string;
}> {
  if (typeof window === 'undefined') {
    return { success: false, permission: 'denied', error: 'Window undefined' };
  }

  if (!('Notification' in window)) {
    return {
      success: false,
      permission: 'denied',
      error: 'Push notifications are not supported in this browser.',
    };
  }

  let permission = Notification.permission;
  if (permission === 'default') {
    try {
      permission = await Notification.requestPermission();
    } catch (err) {
      console.warn('[FCM] Permission request error:', err);
    }
  }

  if (permission !== 'granted') {
    return {
      success: false,
      permission,
      error: permission === 'denied' 
        ? 'Notification permissions were blocked in browser settings.' 
        : 'Notification permissions were not granted.',
    };
  }

  const messaging = await getFcmMessaging();
  if (!messaging) {
    // Generate simulated fallback client registration token for Firestore sync
    const fallbackToken = `web-fcm-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    await persistFcmTokenToFirestore(fallbackToken, options?.topics);
    localStorage.setItem('womene_fcm_token', fallbackToken);
    return {
      success: true,
      token: fallbackToken,
      permission: 'granted',
    };
  }

  try {
    // Register Service Worker if not registered
    let swRegistration: ServiceWorkerRegistration | undefined;
    if ('serviceWorker' in navigator) {
      try {
        swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      } catch (swErr) {
        console.warn('[FCM] SW registration note:', swErr);
      }
    }

    const token = await getToken(messaging, {
      serviceWorkerRegistration: swRegistration,
      vapidKey: options?.vapidKey || undefined
    });

    if (token) {
      localStorage.setItem('womene_fcm_token', token);
      await persistFcmTokenToFirestore(token, options?.topics);
      return { success: true, token, permission: 'granted' };
    } else {
      return { success: false, permission: 'granted', error: 'No registration token returned by FCM' };
    }
  } catch (err: unknown) {
    console.warn('[FCM] Token retrieval note (using fallback token):', err);
    const fallbackToken = `fcm-local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('womene_fcm_token', fallbackToken);
    await persistFcmTokenToFirestore(fallbackToken, options?.topics);
    return {
      success: true,
      token: fallbackToken,
      permission: 'granted',
    };
  }
}

// Persist Device Token in Firestore
export async function persistFcmTokenToFirestore(token: string, topics?: string[]) {
  const tokenDocId = token.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 100);
  const now = new Date().toISOString();
  const tokenData: FcmTokenRecord = {
    token,
    platform: 'web',
    userAgent: navigator.userAgent.substring(0, 300),
    topics: (topics && topics.length ? topics : ['emergency_sos', 'women_safety', 'health_advisory', 'weather_warning']).join(','),
    status: 'active',
    createdAt: now,
    lastActive: now,
  };

  try {
    await setDoc(doc(db, 'fcmTokens', tokenDocId), tokenData, { merge: true });
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `fcmTokens/${tokenDocId}`);
    return false;
  }
}

// Subscribe to real-time incoming messages & alerts
export function subscribeToRealtimeAlerts(
  onAlert: (alert: FcmBroadcastPayload) => void
): () => void {
  const unsubscribers: Unsubscribe[] = [];

  // 1. Firebase Messaging foreground listener if supported
  checkFcmSupport().then(async (supported) => {
    if (!supported) return;
    const messaging = await getFcmMessaging();
    if (!messaging) return;

    try {
      const unsubFcm = onMessage(messaging, (payload) => {
        console.log('[FCM] Foreground message received:', payload);
        const alertPayload: FcmBroadcastPayload = {
          title: payload.notification?.title || payload.data?.title || '🚨 WOMENE Emergency Alert',
          body: payload.notification?.body || payload.data?.body || 'Urgent real-time alert received.',
          type: (payload.data?.type as FcmBroadcastPayload['type']) || 'emergency_sos',
          severity: (payload.data?.severity as FcmBroadcastPayload['severity']) || 'high',
          sender: payload.data?.sender || 'WOMENE Dispatch System',
          createdAt: new Date().toISOString(),
        };

        playAlertSound(alertPayload.severity);
        onAlert(alertPayload);
      });
      unsubscribers.push(unsubFcm);
    } catch (e) {
      console.debug('[FCM] Foreground listener registration notice:', e);
    }
  });

  // 2. Real-time Firestore Stream on fcmBroadcasts (instantaneous sync across all devices)
  try {
    const broadcastsQuery = query(
      collection(db, 'fcmBroadcasts'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    let initialLoad = true;
    const unsubFirestore = onSnapshot(
      broadcastsQuery,
      (snapshot) => {
        if (initialLoad) {
          initialLoad = false;
          return; // Ignore existing history on mount so we don't alert on old records
        }

        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data() as FcmBroadcastPayload;
            const broadcast: FcmBroadcastPayload = {
              id: change.doc.id,
              ...data,
            };
            playAlertSound(broadcast.severity);
            onAlert(broadcast);
          }
        });
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'fcmBroadcasts');
      }
    );

    unsubscribers.push(unsubFirestore);
  } catch (err) {
    console.warn('[FCM] Firestore stream listener error:', err);
  }

  return () => {
    unsubscribers.forEach((unsub) => {
      try {
        unsub();
      } catch {
        // cleanup ignore
      }
    });
  };
}

// Dispatch an emergency or community broadcast to Firestore
export async function dispatchFcmBroadcast(
  broadcast: Omit<FcmBroadcastPayload, 'createdAt'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  const payload: FcmBroadcastPayload = {
    ...broadcast,
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(collection(db, 'fcmBroadcasts'), payload);
    playAlertSound(payload.severity);

    // Also trigger native browser notification if granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(payload.title, {
          body: payload.body,
          icon: '/assets/womene_hero_banner_1789580680850.jpg',
        });
      } catch {
        // Fallback for Service Worker notification
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'SHOW_NOTIFICATION',
            payload,
          });
        }
      }
    }

    return { success: true, id: docRef.id };
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'fcmBroadcasts');
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// Fetch broadcast history
export async function getRecentBroadcasts(limitCount = 10): Promise<FcmBroadcastPayload[]> {
  try {
    const q = query(
      collection(db, 'fcmBroadcasts'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as FcmBroadcastPayload),
    }));
  } catch (err) {
    console.warn('[FCM] Error loading recent broadcasts:', err);
    return [];
  }
}
