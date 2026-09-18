// Vercel Serverless Function: GET /api/branches
export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    headOffice: {
      location: 'White Field Road, 1st Line, Ayyappa Nagar, Bengaluru, Karnataka',
      founder: 'Dr. Krishna Chaitanya & Team',
      email: 'emfi.ceo@gmail.com',
      helplines: ['8125016226', '7981967919'],
      booking: '7989997015',
    },
    branches: [
      { id: 'blr', name: 'Bengaluru', state: 'Karnataka', phone: '8125016226', role: 'Headquarters' },
      { id: 'hyd', name: 'Hyderabad', state: 'Telangana', phone: '7981967919', role: 'Regional Hub' },
      { id: 'sec', name: 'Secunderabad', state: 'Telangana', phone: '7981967919', role: 'Urban Hub' },
      { id: 'vij', name: 'Vijayawada', state: 'Andhra Pradesh', phone: '7702635919', role: 'Regional Hub' },
      { id: 'vzg', name: 'Visakhapatnam', state: 'Andhra Pradesh', phone: '7702635919', role: 'Coastal Hub' },
      { id: 'che', name: 'Chennai', state: 'Tamil Nadu', phone: '7989997015', role: 'Active Branch' },
      { id: 'mum', name: 'Mumbai', state: 'Maharashtra', phone: '7989997015', role: 'Active Branch' },
      { id: 'pune', name: 'Pune', state: 'Maharashtra', phone: '7989997015', role: 'Active Branch' },
      { id: 'bbsr', name: 'Bhubaneswar', state: 'Odisha', phone: '7989997015', role: 'Active Branch' },
    ],
    expansionRoadmap: 'Shortly expanding to all Andhra Pradesh (AP) and Telangana mandal and zilla headquarters!',
  });
}
