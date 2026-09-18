// Vercel Serverless Function: GET /api/supabase/status
export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const isConfigured = Boolean(supabaseUrl && (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY));

  res.status(200).json({
    status: isConfigured ? 'connected' : 'ready_for_credentials',
    supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 18)}...` : 'Not configured in environment',
    tables: [
      'service_bookings',
      'emergency_alerts',
      'ai_consultations',
      'community_members'
    ],
    schemaFile: '/src/db/supabase_schema.sql',
    firestoreStatus: 'Active (studio-6989353372-64cd3)',
    instructions: 'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Settings/Environment to activate live Supabase syncing.',
  });
}
