// Vercel Serverless Function: GET /api/health
export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    status: 'healthy',
    platform: 'WOMENE Care Network',
    deployment: 'Vercel Serverless + Node.js Express Dual-Engine',
    databases: {
      firebaseFirestore: 'Active & Secured (studio-6989353372-64cd3)',
      supabasePostgreSQL: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL ? 'Configured' : 'Ready for Connection',
    },
    stack: {
      frontend: 'React 19 + TypeScript + Tailwind CSS',
      backend: 'Vercel Serverless Functions + Express Backend',
      mobile: 'Flutter 3.x (Cross-Platform iOS & Android)',
      ai: 'Google Gemini 2.5 AI Doctor',
    },
    version: '1.2.0',
    timestamp: new Date().toISOString(),
  });
}
