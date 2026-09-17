import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../services/api_service.dart';

class TeamBranchesScreen extends StatelessWidget {
  const TeamBranchesScreen({Key? key}) : super(key: key);

  final List<Map<String, String>> _branches = const [
    {'name': 'Bengaluru', 'role': 'Headquarters', 'phone': '8125016226', 'state': 'Karnataka'},
    {'name': 'Hyderabad', 'role': 'Regional Hub', 'phone': '7981967919', 'state': 'Telangana'},
    {'name': 'Secunderabad', 'role': 'Urban Hub', 'phone': '7981967919', 'state': 'Telangana'},
    {'name': 'Vijayawada', 'role': 'Regional Hub', 'phone': '7702635919', 'state': 'Andhra Pradesh'},
    {'name': 'Visakhapatnam', 'role': 'Coastal Hub', 'phone': '7702635919', 'state': 'Andhra Pradesh'},
    {'name': 'Chennai', 'role': 'Branch Hub', 'phone': '7989997015', 'state': 'Tamil Nadu'},
    {'name': 'Mumbai', 'role': 'Branch Hub', 'phone': '7989997015', 'state': 'Maharashtra'},
    {'name': 'Pune', 'role': 'Branch Hub', 'phone': '7989997015', 'state': 'Maharashtra'},
    {'name': 'Bhubaneswar', 'role': 'Branch Hub', 'phone': '7989997015', 'state': 'Odisha'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: WomeneColors.background,
      appBar: AppBar(
        backgroundColor: WomeneColors.primary,
        title: const Text('Leadership & Branches', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Founder Leadership Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [WomeneColors.primaryDark, WomeneColors.primary],
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const CircleAvatar(
                        backgroundColor: Colors.white24,
                        child: Icon(Icons.person, color: Colors.white),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(WomeneConstants.founder, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                          Text('Founder & Leadership Team', style: TextStyle(color: Colors.pinkAccent, fontSize: 12)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Head Office: White Field Road, 1st Line, Ayyappa Nagar, Bengaluru, Karnataka.\nEmail: emfi.ceo@gmail.com',
                    style: TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: WomeneColors.primary,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        icon: const Icon(Icons.call, size: 14),
                        label: const Text('Call 8125016226', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                        onPressed: () => WomeneApiService.makePhoneCall('8125016226'),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: WomeneColors.successGreen,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        icon: const Icon(Icons.chat, size: 14),
                        label: const Text('WhatsApp 7989997015', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                        onPressed: () => WomeneApiService.openWhatsApp(
                          phone: WomeneConstants.bookingHelpline,
                          text: 'Hello Dr. Krishna Chaitanya & WOMENE Team, enquiry regarding services.',
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Expansion Alert
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.amber.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.amber.shade300),
              ),
              child: const Text(
                'Expansion Notice: Shortly starting operations in all Andhra Pradesh (AP) and Telangana mandal and zilla headquarters!',
                style: TextStyle(color: Color(0xFF78350F), fontSize: 12, fontWeight: FontWeight.bold),
              ),
            ),

            const SizedBox(height: 16),

            const Text(
              'Operating Hubs (9 Branches)',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: WomeneColors.textPrimary),
            ),
            const SizedBox(height: 10),

            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _branches.length,
              itemBuilder: (context, idx) {
                final b = _branches[idx];
                return Card(
                  margin: const EdgeInsets.only(bottom: 8),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  child: ListTile(
                    leading: const Icon(Icons.location_on, color: WomeneColors.primary),
                    title: Text('${b['name']} (${b['state']})', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    subtitle: Text('${b['role']} • Phone: ${b['phone']}', style: const TextStyle(fontSize: 11)),
                    trailing: IconButton(
                      icon: const Icon(Icons.phone, color: WomeneColors.successGreen, size: 20),
                      onPressed: () => WomeneApiService.makePhoneCall(b['phone']!),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
