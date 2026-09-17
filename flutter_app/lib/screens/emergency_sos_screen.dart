import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../services/api_service.dart';

class EmergencySosScreen extends StatefulWidget {
  final String currentLanguage;

  const EmergencySosScreen({Key? key, required this.currentLanguage}) : super(key: key);

  @override
  State<EmergencySosScreen> createState() => _EmergencySosScreenState();
}

class _EmergencySosScreenState extends State<EmergencySosScreen> {
  final WomeneApiService _apiService = WomeneApiService();
  bool _isSosActive = false;
  String _sosStatusMessage = '';

  Future<void> _trigger4KmSos() async {
    setState(() {
      _isSosActive = true;
      _sosStatusMessage = 'Broadcasting alert to nearest verified WOMENE coordinators within 4 KM...';
    });

    // Simulated GPS fetch and API post
    final res = await _apiService.sendEmergencySos(
      latitude: 12.9716,
      longitude: 77.5946,
      emergencyType: 'Medical & Physical Safety Alert',
      contactNumber: WomeneConstants.bookingHelpline,
      address: 'Bengaluru Coordinator Zone',
    );

    setState(() {
      _sosStatusMessage = 'Alert dispatched! WOMENE Coordinator & Nearby Volunteer notified within 4 KM radius.';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: WomeneColors.background,
      appBar: AppBar(
        backgroundColor: WomeneColors.emergencyRed,
        title: const Text('Safety & Emergency SOS', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Mandatory Disclaimer
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.amber.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.amber.shade300),
              ),
              child: Row(
                children: const [
                  Icon(Icons.shield_outlined, color: Colors.amber, size: 24),
                  SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'WOMENE is a local human-support community network, NOT a replacement for 112 Police or 108 Ambulance.',
                      style: TextStyle(color: Color(0xFF78350F), fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Big Circular 4 KM SOS Button
            GestureDetector(
              onTap: _trigger4KmSos,
              child: Container(
                width: 180,
                height: 180,
                decoration: BoxDecoration(
                  gradient: const RadialGradient(
                    colors: [Color(0xFFEF4444), Color(0xFFB91C1C)],
                  ),
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.red.withOpacity(0.4),
                      blurRadius: 20,
                      spreadRadius: 4,
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Icon(Icons.emergency, color: Colors.white, size: 48),
                    SizedBox(height: 6),
                    Text(
                      '4 KM SOS',
                      style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w900),
                    ),
                    Text(
                      'TAP TO DISPATCH',
                      style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 20),

            if (_sosStatusMessage.isNotEmpty) ...[
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.green.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.green.shade300),
                ),
                child: Text(
                  _sosStatusMessage,
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.green.shade900, fontWeight: FontWeight.bold, fontSize: 12),
                ),
              ),
              const SizedBox(height: 20),
            ],

            // Government & National Helplines (Direct Dial)
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Direct Emergency Numbers',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: WomeneColors.textPrimary),
              ),
            ),
            const SizedBox(height: 10),

            _buildDialerTile('National Emergency / Police', '112', Icons.local_police, Colors.blue),
            _buildDialerTile('Medical Ambulance Service', '108', Icons.emergency, Colors.red),
            _buildDialerTile('Women Helpline', '1091', Icons.woman, Colors.pink),
            _buildDialerTile('Childline Service', '1098', Icons.child_friendly, Colors.purple),
            _buildDialerTile('WOMENE Direct Booking & Team', WomeneConstants.bookingHelpline, Icons.support_agent, WomeneColors.primary),

            const SizedBox(height: 20),

            // WhatsApp Coordinator alert
            OutlinedButton.icon(
              style: OutlinedButton.styleFrom(
                foregroundColor: WomeneColors.successGreen,
                side: const BorderSide(color: WomeneColors.successGreen),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
              onPressed: () {
                WomeneApiService.openWhatsApp(
                  phone: WomeneConstants.bookingHelpline,
                  text: 'EMERGENCY: Need immediate assistance from nearest WOMENE representative.',
                );
              },
              icon: const Icon(Icons.chat),
              label: const Text('Send WhatsApp Emergency Alert (7989997015)', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDialerTile(String title, String number, IconData icon, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: WomeneColors.cardBorder),
        ),
        child: ListTile(
          leading: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle),
            child: Icon(icon, color: color, size: 20),
          ),
          title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          subtitle: Text(number, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 13)),
          trailing: ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: color,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            icon: const Icon(Icons.call, size: 14),
            label: const Text('CALL', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
            onPressed: () => WomeneApiService.makePhoneCall(number),
          ),
        ),
      ),
    );
  }
}
