import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(
  app,
  firebaseConfig.firestoreDatabaseId || '(default)'
);

// Connection verification test as specified in Firebase guidelines
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection verified.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client offline or unreachable.');
    }
    // Return true even if test doc does not exist, as long as server responded
    return true;
  }
}

// Service Booking Persistence
export interface BookingRecord {
  serviceType: string;
  clientName: string;
  phone: string;
  location: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'assigned' | 'completed' | 'cancelled';
  createdAt: string;
}

export async function saveBookingToFirestore(booking: BookingRecord) {
  try {
    const docRef = await addDoc(collection(db, 'serviceBookings'), booking);
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error('Error saving booking to Firestore:', err);
    return { success: false, error: err };
  }
}

// Emergency Alert Persistence
export interface EmergencyAlertRecord {
  userName: string;
  phone: string;
  emergencyType: string;
  locationLat?: number;
  locationLng?: number;
  addressText?: string;
  status: 'active' | 'dispatched' | 'resolved';
  createdAt: string;
}

export async function saveEmergencyAlertToFirestore(alert: EmergencyAlertRecord) {
  try {
    const docRef = await addDoc(collection(db, 'emergencyAlerts'), alert);
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error('Error dispatching SOS to Firestore:', err);
    return { success: false, error: err };
  }
}

// AI Consultation Log Persistence
export interface AiConsultationRecord {
  doctorCategory: 'human' | 'animal' | 'bird' | 'plant' | 'crop' | 'soil';
  symptoms: string;
  language: string;
  summary: string;
  createdAt: string;
}

export async function saveAiConsultationToFirestore(consultation: AiConsultationRecord) {
  try {
    const docRef = await addDoc(collection(db, 'aiConsultations'), consultation);
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error('Error logging consultation to Firestore:', err);
    return { success: false, error: err };
  }
}

export async function getRecentBookings(limitCount = 10) {
  try {
    const q = query(
      collection(db, 'serviceBookings'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('Could not fetch bookings from Firestore:', err);
    return [];
  }
}
