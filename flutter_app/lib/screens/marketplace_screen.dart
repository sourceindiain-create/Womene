import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../services/api_service.dart';

class MarketplaceScreen extends StatelessWidget {
  final String currentLanguage;

  const MarketplaceScreen({Key? key, required this.currentLanguage}) : super(key: key);

  final List<Map<String, dynamic>> _products = const [
    {
      'title': 'Cold-Pressed Groundnut Oil',
      'price': '₹240 / L',
      'desc': 'Traditional wood-pressed natural oil from rural women farmers.',
      'tag': 'Organic Direct',
      'icon': Icons.water_drop,
    },
    {
      'title': 'Ancient Foxtail Millets (Korralu)',
      'price': '₹95 / kg',
      'desc': 'Unpolished, chemical-free native millets for diabetic care.',
      'tag': 'Farm Produce',
      'icon': Icons.grain,
    },
    {
      'title': 'Ghana Jeevamrutha Organic Bio-Cubes',
      'price': '₹180 / 5kg',
      'desc': 'Microbial soil activator crafted with desi cow dung & urine.',
      'tag': 'Natural Agri',
      'icon': Icons.eco,
    },
    {
      'title': 'Hand-Spun Natural Herbal Incense',
      'price': '₹120 / pack',
      'desc': 'Prepared by rural self-help women groups using native herbs.',
      'tag': 'Women Livelihood',
      'icon': Icons.spa,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: WomeneColors.background,
      appBar: AppBar(
        backgroundColor: WomeneColors.primary,
        title: const Text('Village Market (Plant to Wealth)', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _products.length,
        itemBuilder: (context, index) {
          final p = _products[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            elevation: 1,
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Row(
                children: [
                  Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      color: Colors.green.shade50,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(p['icon'] as IconData, color: Colors.green.shade800, size: 28),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: Colors.purple.shade50,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            p['tag'] as String,
                            style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.purple.shade800),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(p['title'] as String, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                        Text(p['desc'] as String, style: const TextStyle(fontSize: 11, color: WomeneColors.textSecondary)),
                        const SizedBox(height: 4),
                        Text(p['price'] as String, style: const TextStyle(fontWeight: FontWeight.w900, color: WomeneColors.primary, fontSize: 13)),
                      ],
                    ),
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: WomeneColors.successGreen,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    ),
                    onPressed: () {
                      WomeneApiService.openWhatsApp(
                        phone: WomeneConstants.bookingHelpline,
                        text: 'Order Enquiry: ${p['title']} (${p['price']}) from WOMENE Village Market.',
                      );
                    },
                    child: const Text('Order', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
