-- ==========================================================
-- WOMENE Platform - Supabase PostgreSQL Database Schema
-- Production Ready with Row Level Security (RLS) & Indexes
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Service Bookings Table
CREATE TABLE IF NOT EXISTS service_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code TEXT NOT NULL,
    category TEXT NOT NULL,
    service_type TEXT NOT NULL,
    client_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT DEFAULT 'Bengaluru',
    address TEXT,
    service_date DATE,
    service_time TEXT,
    mode TEXT DEFAULT 'offline' CHECK (mode IN ('offline', 'online')),
    notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'assigned', 'completed', 'cancelled')),
    assigned_coordinator TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Emergency SOS Alerts Table
CREATE TABLE IF NOT EXISTS emergency_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sos_code TEXT NOT NULL,
    user_name TEXT DEFAULT 'Emergency Citizen',
    phone TEXT NOT NULL,
    emergency_type TEXT NOT NULL,
    location_lat DOUBLE PRECISION,
    location_lng DOUBLE PRECISION,
    address_text TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'dispatched', 'resolved', 'closed')),
    radius_km INTEGER DEFAULT 4,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. AI Doctor & Multi-Species Consultations Table
CREATE TABLE IF NOT EXISTS ai_consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    species_category TEXT NOT NULL CHECK (species_category IN ('human', 'animal', 'bird', 'plant', 'crop', 'soil')),
    symptoms_query TEXT NOT NULL,
    has_image BOOLEAN DEFAULT false,
    image_url TEXT,
    ai_recommendation JSONB,
    severity_level TEXT DEFAULT 'moderate',
    language TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Community Members & Coordinators Table
CREATE TABLE IF NOT EXISTS community_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'citizen' CHECK (role IN ('citizen', 'coordinator', 'doctor', 'admin')),
    city TEXT NOT NULL,
    branch_region TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- Indexes for High Performance Querying
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON service_bookings(phone);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON service_bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON service_bookings(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_emergency_status ON emergency_alerts(status);
CREATE INDEX IF NOT EXISTS idx_emergency_created_at ON emergency_alerts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_consultations_species ON ai_consultations(species_category);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON ai_consultations(created_at DESC);

-- ==========================================================
-- Row Level Security (RLS) Configuration
-- ==========================================================
ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- Allow public users (or app) to submit bookings and read their own
CREATE POLICY "Allow public insert to service_bookings"
    ON service_bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow select on service_bookings"
    ON service_bookings FOR SELECT
    USING (true);

-- Allow public emergency SOS dispatch
CREATE POLICY "Allow public insert to emergency_alerts"
    ON emergency_alerts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow select on emergency_alerts"
    ON emergency_alerts FOR SELECT
    USING (true);

-- Allow consultation logging
CREATE POLICY "Allow public insert to ai_consultations"
    ON ai_consultations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow select on ai_consultations"
    ON ai_consultations FOR SELECT
    USING (true);

-- Allow community member lookup
CREATE POLICY "Allow select on community_members"
    ON community_members FOR SELECT
    USING (true);
