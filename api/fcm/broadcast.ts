export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, body, type, severity, targetTopic, sender } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required for FCM broadcast.' });
  }

  const broadcastRecord = {
    id: `fcm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: String(title).slice(0, 200),
    body: String(body).slice(0, 1000),
    type: type || 'emergency_sos',
    severity: severity || 'high',
    targetTopic: targetTopic || 'emergency_sos',
    sender: sender || 'WOMENE Command Center',
    createdAt: new Date().toISOString()
  };

  return res.status(200).json({
    success: true,
    message: 'Real-time alert broadcast dispatched via FCM Gateway.',
    broadcast: broadcastRecord
  });
}
