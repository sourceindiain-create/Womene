// Vercel Serverless Function: GET /api/team
export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    companyName: 'WOMENE Society & Technology Services',
    slogan: 'People Near You. Always.',
    pillars: 'Care • Support • Companionship',
    founder: 'Dr. Krishna Chaitanya & Core Team',
    leadershipMessage: 'Building an empowered, safe, and kinder India through trained women representatives and accessible local care.',
    contactNumbers: {
      teamHelpline1: '8125016226',
      teamHelpline2: '7981967919',
      bookingHelpline: '7989997015',
      apHelpline: '7702635919',
    },
    email: 'emfi.ceo@gmail.com',
    headOffice: {
      address: 'White Field Road, 1st Line, Ayyappa Nagar, Bengaluru',
      state: 'Karnataka',
      country: 'India',
    },
    branches: [
      { name: 'Bengaluru', status: 'Active (Head Office)', state: 'Karnataka' },
      { name: 'Hyderabad', status: 'Active Regional Hub', state: 'Telangana' },
      { name: 'Secunderabad', status: 'Active Hub', state: 'Telangana' },
      { name: 'Vijayawada', status: 'Active Regional Hub', state: 'Andhra Pradesh' },
      { name: 'Visakhapatnam', status: 'Active Coastal Hub', state: 'Andhra Pradesh' },
      { name: 'Chennai', status: 'Active Center', state: 'Tamil Nadu' },
      { name: 'Mumbai', status: 'Active Center', state: 'Maharashtra' },
      { name: 'Pune', status: 'Active Center', state: 'Maharashtra' },
      { name: 'Bhubaneswar', status: 'Active Center', state: 'Odisha' },
    ],
    availability: 'Both Offline (At-Home / In-Person) and Online (Tele-consultation / Virtual Support) available.',
    whatsAppBookingNumber: '7989997015',
    whatsAppLink: 'https://wa.me/917989997015?text=Hello%20WOMENE%20Team%2C%20I%20would%20like%20to%20get%20service',
  });
}
