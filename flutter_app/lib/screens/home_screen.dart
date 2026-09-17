import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../services/api_service.dart';

class HomeScreen extends StatelessWidget {
  final Function(int) onNavigateTab;
  final String currentLanguage; // 'en', 'te', 'hi'
  final Function(String) onLanguageChange;

  const HomeScreen({
    Key? key,
    required this.onNavigateTab,
    required this.currentLanguage,
    required this.onLanguageChange,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: WomeneColors.background,
      appBar: AppBar(
        backgroundColor: WomeneColors.primary,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.15),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.favorite, color: WomeneColors.accentPink, size: 20),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  WomeneConstants.appName,
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 18,
                    letterSpacing: 0.5,
                  ),
                ),
                Text(
                  WomeneConstants.slogan,
                  style: TextStyle(color: Colors.white70, fontSize: 10),
                ),
              ],
            ),
          ],
        ),
        actions: [
          // Language selector popup
          PopupMenuButton<String>(
            icon: const Icon(Icons.language, color: Colors.white),
            onSelected: onLanguageChange,
            itemBuilder: (context) => [
              const PopupMenuItem(value: 'te', child: Text('తెలుగు (Telugu)')),
              const PopupMenuItem(value: 'en', child: Text('English')),
              const PopupMenuItem(value: 'hi', child: Text('हिन्दी (Hindi)')),
            ],
          ),
          IconButton(
            icon: const Icon(Icons.phone_in_talk, color: Colors.white),
            onPressed: () => WomeneApiService.makePhoneCall(WomeneConstants.bookingHelpline),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top Emergency SOS Card (Within 4 KM)
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Container(
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFFB91C1C), Color(0xFFDC2626)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.red.withOpacity(0.3),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                padding: const EdgeInsets.all(18),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.emergency_share, color: Colors.white, size: 28),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'EMERGENCY SOS (WITHIN 4 KM)',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w900,
                              fontSize: 13,
                              letterSpacing: 0.5,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            currentLanguage == 'te'
                              ? 'తక్షణ మహిళా వాలంటీర్ & పోలీసు (112) సంప్రదింపు'
                              : currentLanguage == 'hi'
                              ? '4 किमी में महिला स्वयंसेवक व आपातकालीन सहायता'
                              : 'Immediate local responder dispatch & 112 / 108 bridge',
                            style: const TextStyle(color: Colors.white70, fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: WomeneColors.emergencyRed,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      ),
                      onPressed: () => onNavigateTab(3), // SOS tab
                      child: const Text(
                        'OPEN SOS',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Hero Mission Banner
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [WomeneColors.primaryDark, WomeneColors.primary],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                ),
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: WomeneColors.accentPink.withOpacity(0.3),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: WomeneColors.accentPink.withOpacity(0.5)),
                          ),
                          child: const Text(
                            'CARE • SUPPORT • COMPANIONSHIP',
                            style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                        const Spacer(),
                        const Text(
                          'Online & Offline',
                          style: TextStyle(color: Colors.greenAccent, fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      currentLanguage == 'te'
                        ? 'మీ సమీపంలో నమ్మకమైన మహిళా సంరక్షణ ప్రతినిధులు'
                        : currentLanguage == 'hi'
                        ? 'आपके निकटतम विश्वसनीय महिला साथी एवं देखभाल नेटवर्क'
                        : 'Trusted Women Caregivers & Life Companions Near You',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        height: 1.3,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Founder: ${WomeneConstants.founder} | Helplines: ${WomeneConstants.helplineTeam1} / ${WomeneConstants.bookingHelpline}',
                      style: const TextStyle(color: Colors.white60, fontSize: 11),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: WomeneColors.accentPink,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              padding: const EdgeInsets.symmetric(vertical: 12),
                            ),
                            icon: const Icon(Icons.calendar_today, size: 16),
                            label: const Text('Book Service', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                            onPressed: () => onNavigateTab(4), // Booking tab
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: OutlinedButton.icon(
                            style: OutlinedButton.styleFrom(
                              foregroundColor: Colors.white,
                              side: const BorderSide(color: Colors.white38),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              padding: const EdgeInsets.symmetric(vertical: 12),
                            ),
                            icon: const Icon(Icons.smart_toy, size: 16, color: Colors.purpleAccent),
                            label: const Text('AI Doctor', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                            onPressed: () => onNavigateTab(2), // AI Doctor tab
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 20),

            // Quick Services Grid (6 Core Categories)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Our Core Services',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: WomeneColors.textPrimary),
                  ),
                  TextButton(
                    onPressed: () => onNavigateTab(1),
                    child: const Text('View All', style: TextStyle(color: WomeneColors.accentPink, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 3,
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                childAspectRatio: 0.95,
                children: [
                  _buildServiceCard('Elder & Sick Care', Icons.elderly, Colors.purple, () => onNavigateTab(1)),
                  _buildServiceCard('Food & Lunches', Icons.restaurant, Colors.orange, () => onNavigateTab(1)),
                  _buildServiceCard('Travel Companion', Icons.directions_transit, Colors.blue, () => onNavigateTab(1)),
                  _buildServiceCard('Baby & Mother Care', Icons.child_care, Colors.pink, () => onNavigateTab(1)),
                  _buildServiceCard('Personal Care', Icons.spa, Colors.teal, () => onNavigateTab(1)),
                  _buildServiceCard('Village Market', Icons.storefront, Colors.green, () => onNavigateTab(5)),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // 9 Operating Branches Summary
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: WomeneColors.cardBorder),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.location_city, color: WomeneColors.primary, size: 20),
                        SizedBox(width: 8),
                        Text(
                          '9 Operational Branches & Expansion',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Bengaluru (HO), Hyderabad, Secunderabad, Vijayawada, Visakhapatnam, Chennai, Mumbai, Pune, Bhubaneswar.',
                      style: TextStyle(color: WomeneColors.textSecondary, fontSize: 12),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.amber.shade50,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text(
                        'Shortly starting across all AP and Telangana mandal and zilla headquarters!',
                        style: TextStyle(color: Color(0xFF92400E), fontSize: 11, fontWeight: FontWeight.w600),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }

  Widget _buildServiceCard(String title, IconData icon, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: WomeneColors.cardBorder),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        padding: const EdgeInsets.all(10),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: color.withOpacity(0.12),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(height: 8),
            Text(
              title,
              textAlign: TextAlign.center,
              maxLines: 2,
              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: WomeneColors.textPrimary),
            ),
          ],
        ),
      ),
    );
  }
}
