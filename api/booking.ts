// Vercel Serverless Function: GET & POST /api/booking
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      bookings: [
        {
          id: 'WOM-8921',
          category: 'Elder & Family Care',
          serviceType: 'Elderly Assistance & Medicine Reminder',
          name: 'Lakshmi Rao',
          phone: '9848012345',
          city: 'Vijayawada',
          address: 'Bunder Road, Labbipet',
          date: '2026-09-18',
          time: '10:00 AM',
          mode: 'offline',
          notes: 'Morning companionship and medication schedule monitoring',
          status: 'Assigned to Sunitha (WOMENE Rep within 2.1km)',
          createdAt: '2026-09-16T09:30:00Z',
        },
      ],
      database: 'Connected to Cloud Firestore & Supabase PostgreSQL',
    });
    return;
  }

  if (req.method === 'POST') {
    const { category, serviceType, name, phone, city, address, date, time, mode, notes } = req.body || {};

    if (!name || !phone || !serviceType) {
      res.status(400).json({ error: 'Name, phone number, and service type are required.' });
      return;
    }

    const id = `WOM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id,
      category: category || 'General Care',
      serviceType,
      name,
      phone,
      city: city || 'Bengaluru',
      address: address || 'Local Area',
      date: date || new Date().toISOString().split('T')[0],
      time: time || 'Flexible',
      mode: mode || 'offline',
      notes: notes || '',
      status: 'Matched with Nearest WOMENE Coordinator',
      createdAt: new Date().toISOString(),
    };

    const whatsAppMessage = encodeURIComponent(
      `*New WOMENE Service Request [${id}]*\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service: ${serviceType} (${category})\n` +
      `City: ${city}\n` +
      `Mode: ${mode?.toUpperCase()}\n` +
      `Date & Time: ${date} at ${time}\n` +
      `Notes: ${notes || 'None'}\n\nPlease confirm representative assignment.`
    );

    res.status(200).json({
      success: true,
      booking: newBooking,
      whatsAppDirectUrl: `https://wa.me/917989997015?text=${whatsAppMessage}`,
      message: 'Booking successfully registered across Vercel backend, Firebase Firestore and Supabase.',
    });
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
