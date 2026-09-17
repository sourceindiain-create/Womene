import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../models/womene_models.dart';
import '../services/api_service.dart';

class AiDoctorScreen extends StatefulWidget {
  final String currentLanguage;
  final Function(int) onNavigateTab;

  const AiDoctorScreen({
    Key? key,
    required this.currentLanguage,
    required this.onNavigateTab,
  }) : super(key: key);

  @override
  State<AiDoctorScreen> createState() => _AiDoctorScreenState();
}

class _AiDoctorScreenState extends State<AiDoctorScreen> {
  final WomeneApiService _apiService = WomeneApiService();
  final TextEditingsController = TextEditingController();

  String _selectedEngine = 'human'; // human, animal, bird, plant, crop, soil
  bool _isLoading = false;
  AiDoctorAnalysis? _analysis;

  final List<Map<String, dynamic>> _engines = [
    {'id': 'human', 'title': 'Human Health', 'icon': Icons.person},
    {'id': 'animal', 'title': 'Animals & Cattle', 'icon': Icons.pets},
    {'id': 'bird', 'title': 'Birds & Poultry', 'icon': Icons.egg},
    {'id': 'plant', 'title': 'Garden Plants', 'icon': Icons.local_florist},
    {'id': 'crop', 'title': 'Farm Crops', 'icon': Icons.agriculture},
    {'id': 'soil', 'title': 'Soil & Nutrients', 'icon': Icons.terrain},
  ];

  Future<void> _handleConsult() async {
    final query = TextEditingsController.text.trim();
    if (query.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please describe the symptoms or condition')),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final res = await _apiService.consultAiDoctor(
        doctorType: _selectedEngine,
        symptoms: query,
        language: widget.currentLanguage,
      );

      setState(() {
        _analysis = res;
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: WomeneColors.background,
      appBar: AppBar(
        backgroundColor: WomeneColors.primary,
        title: const Text('AI Doctor & Agri Intelligence', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Engine selector horizontal list
            const Text(
              'Select Intelligence Engine',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: WomeneColors.textPrimary),
            ),
            const SizedBox(height: 10),
            SizedBox(
              height: 48,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: _engines.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final engine = _engines[index];
                  final isSelected = _selectedEngine == engine['id'];
                  return ChoiceChip(
                    avatar: Icon(
                      engine['icon'],
                      size: 16,
                      color: isSelected ? Colors.white : WomeneColors.primary,
                    ),
                    label: Text(engine['title']),
                    selected: isSelected,
                    selectedColor: WomeneColors.primary,
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : WomeneColors.textPrimary,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                    onSelected: (val) {
                      if (val) {
                        setState(() {
                          _selectedEngine = engine['id'];
                        });
                      }
                    },
                  );
                },
              ),
            ),

            const SizedBox(height: 16),

            // Symptoms input
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: WomeneColors.cardBorder),
              ),
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextField(
                    controller: TextEditingsController,
                    maxLines: 3,
                    decoration: InputDecoration(
                      hintText: widget.currentLanguage == 'te'
                        ? 'లక్షణాలు, పంట సమస్యలు, లేదా ఆరోగ్యం గురించి ఇక్కడ రాయండి...'
                        : widget.currentLanguage == 'hi'
                        ? 'लक्षण, फसल समस्या अथवा स्वास्थ्य स्थिति का विवरण लिखें...'
                        : 'Describe symptoms, crop leaf spots, cattle health, or soil conditions...',
                      hintStyle: const TextStyle(fontSize: 12, color: WomeneColors.textMuted),
                      border: InputBorder.none,
                    ),
                  ),
                  const Divider(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '5 Solution Pathways Active',
                        style: TextStyle(fontSize: 11, color: Colors.purple.shade700, fontWeight: FontWeight.bold),
                      ),
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: WomeneColors.primary,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: _isLoading ? null : _handleConsult,
                        icon: _isLoading
                            ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                            : const Icon(Icons.psychology, size: 16),
                        label: Text(_isLoading ? 'Analyzing...' : 'Analyze Now'),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Analysis Result with 5 Pathways
            if (_analysis != null) ...[
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: Colors.purple.shade200),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Triage Diagnosis',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: WomeneColors.primary),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: _analysis!.riskLevel.toLowerCase() == 'high'
                                ? Colors.red.shade100
                                : Colors.green.shade100,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            'Risk: ${_analysis!.riskLevel}',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: _analysis!.riskLevel.toLowerCase() == 'high' ? Colors.red.shade900 : Colors.green.shade900,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _analysis!.summary,
                      style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Root Cause: ${_analysis!.rootCauseAnalysis}',
                      style: const TextStyle(color: WomeneColors.textSecondary, fontSize: 12),
                    ),
                    const Divider(height: 24),
                    const Text(
                      '5 SOLUTION PATHWAYS',
                      style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12, letterSpacing: 0.5, color: Colors.black87),
                    ),
                    const SizedBox(height: 10),
                    _buildPathwayCard('1. Modern Medicine', _analysis!.pathways['modern'] ?? '', Icons.medication, Colors.blue),
                    _buildPathwayCard('2. Low-Cost Management', _analysis!.pathways['lowCost'] ?? '', Icons.savings, Colors.amber.shade800),
                    _buildPathwayCard('3. Natural / Jeevamrutha', _analysis!.pathways['natural'] ?? '', Icons.eco, Colors.green),
                    _buildPathwayCard('4. Ayurveda & Heritage', _analysis!.pathways['ayurveda'] ?? '', Icons.spa, Colors.purple),
                    _buildPathwayCard('5. Yoga / Prevention', _analysis!.pathways['lifestyle'] ?? '', Icons.self_improvement, Colors.teal),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.red.shade50,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: Colors.red.shade200),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.warning_amber_rounded, color: Colors.red, size: 20),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              _analysis!.whenToConsultDoctor,
                              style: TextStyle(color: Colors.red.shade900, fontSize: 11, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildPathwayCard(String title, String text, IconData icon, Color color) {
    if (text.isEmpty) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: color.withOpacity(0.06),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: color.withOpacity(0.2)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, size: 18, color: color),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: color)),
                  const SizedBox(height: 2),
                  Text(text, style: const TextStyle(fontSize: 11, color: WomeneColors.textPrimary)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
