export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    status: 'active',
    service: 'Firebase Cloud Messaging (FCM) - Vercel Serverless Gateway',
    projectId: 'studio-6989353372-64cd3',
    messagingSenderId: '366648669779',
    supportedTopics: [
      { id: 'emergency_sos', label: 'Emergency SOS & Women Safety', priority: 'critical' },
      { id: 'women_safety', label: 'Village Night Escort & Safety Patrols', priority: 'high' },
      { id: 'health_advisory', label: 'AI Doctor & Health Outbreak Advisories', priority: 'normal' },
      { id: 'weather_warning', label: 'Farmer Crop & Monsoon Weather Warnings', priority: 'high' },
      { id: 'community_update', label: 'Village Community & Service Updates', priority: 'normal' }
    ],
    serviceWorker: '/firebase-messaging-sw.js',
    timestamp: new Date().toISOString()
  });
}
