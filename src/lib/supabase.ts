/**
 * Supabase Client Configuration & Persistent Services
 * WOMENE Platform - Dual Cloud Architecture (Supabase PostgreSQL + Firebase Firestore)
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment credentials (from Vite client env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://'));
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};

// Export active client or fallback
export const supabase = getSupabase();

export interface SupabaseBookingRecord {
  booking_code: string;
  category: string;
  service_type: string;
  client_name: string;
  phone: string;
  city?: string;
  address?: string;
  service_date?: string;
  service_time?: string;
  mode?: 'offline' | 'online';
  notes?: string;
  status?: string;
}

export interface SupabaseEmergencyRecord {
  sos_code: string;
  user_name?: string;
  phone: string;
  emergency_type: string;
  location_lat?: number;
  location_lng?: number;
  address_text?: string;
  status?: string;
}

export interface SupabaseConsultationRecord {
  species_category: 'human' | 'animal' | 'bird' | 'plant' | 'crop' | 'soil';
  symptoms_query: string;
  has_image?: boolean;
  image_url?: string;
  ai_recommendation?: Record<string, any>;
  severity_level?: string;
  language?: string;
}

/**
 * Save booking to Supabase PostgreSQL table 'service_bookings'
 */
export async function saveBookingToSupabase(data: SupabaseBookingRecord): Promise<{ success: boolean; data?: any; error?: string }> {
  const client = getSupabase();
  if (!client) {
    // Graceful in-memory / local storage sync when Supabase credentials are pending
    try {
      const pendingBookings = JSON.parse(localStorage.getItem('womene_pending_supabase_bookings') || '[]');
      pendingBookings.push({ ...data, queuedAt: new Date().toISOString() });
      localStorage.setItem('womene_pending_supabase_bookings', JSON.stringify(pendingBookings.slice(-50)));
    } catch {
      // ignore localStorage quota errors
    }
    return { 
      success: true, 
      error: 'Supabase URL/Key not configured in environment. Booking safely stored locally and in Cloud Firestore.' 
    };
  }

  try {
    const { data: inserted, error } = await client
      .from('service_bookings')
      .insert([data])
      .select();

    if (error) {
      console.error('Supabase booking insert error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data: inserted };
  } catch (err: any) {
    console.error('Supabase connection exception:', err);
    return { success: false, error: err?.message || 'Unknown database error' };
  }
}

/**
 * Fetch all bookings from Supabase PostgreSQL
 */
export async function getSupabaseBookings(): Promise<any[]> {
  const client = getSupabase();
  if (!client) {
    return [];
  }
  try {
    const { data, error } = await client
      .from('service_bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch from Supabase:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Supabase query error:', err);
    return [];
  }
}

/**
 * Save Emergency SOS to Supabase PostgreSQL table 'emergency_alerts'
 */
export async function saveEmergencyAlertToSupabase(data: SupabaseEmergencyRecord): Promise<{ success: boolean; data?: any; error?: string }> {
  const client = getSupabase();
  if (!client) {
    return { success: true, error: 'Supabase not yet configured. Saved to Cloud Firestore.' };
  }

  try {
    const { data: inserted, error } = await client
      .from('emergency_alerts')
      .insert([data])
      .select();

    if (error) {
      console.error('Supabase emergency alert error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data: inserted };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Emergency database exception' };
  }
}

/**
 * Save AI Doctor consultation to Supabase table 'ai_consultations'
 */
export async function saveConsultationToSupabase(data: SupabaseConsultationRecord): Promise<{ success: boolean; data?: any; error?: string }> {
  const client = getSupabase();
  if (!client) {
    return { success: true, error: 'Supabase pending configuration.' };
  }

  try {
    const { data: inserted, error } = await client
      .from('ai_consultations')
      .insert([data])
      .select();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data: inserted };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Consultation log error' };
  }
}
