import 'package:flutter/material.dart';
import '../constants/theme.dart';
import '../models/womene_models.dart';
import '../services/api_service.dart';

class BookingScreen extends StatefulWidget {
  final String currentLanguage;

  const BookingScreen({Key? key, required this.currentLanguage}) : super(key: key);

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final WomeneApiService _apiService = WomeneApiService();

  int _currentStep = 0;
  String _selectedCategory = 'Elder & Senior Care';
  String _selectedService = 'Companionship & Medicine Reminder';
  String _selectedMode = 'offline'; // offline or online

  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _cityController = TextEditingController(text: 'Bengaluru');
  final _addressController = TextEditingController();
  final _notesController = TextEditingController();

  bool _isSubmitting = false;
  String? _confirmedBookingId;

  final List<String> _categories = [
    'Elder & Senior Care',
    'Food & Lunches',
    'Travel Companion',
    'Baby & Mother Care',
    'Personal Care & Massage',
    'Delivery & Daily Errands',
    'Village Farm Direct',
  ];

  Future<void> _submitBooking() async {
    if (_nameController.text.trim().isEmpty || _phoneController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter your Name and Contact Phone Number')),
      );
      return;
    }

    setState(() {
      _isSubmitting = true;
    });

    try {
      final req = BookingRequest(
        category: _selectedCategory,
        serviceType: _selectedService,
        name: _nameController.text.trim(),
        phone: _phoneController.text.trim(),
        city: _cityController.text.trim(),
        address: _addressController.text.trim(),
        date: DateTime.now().add(const Duration(days: 1)).toString().split(' ')[0],
        time: '10:00 AM',
        mode: _selectedMode,
        notes: _notesController.text.trim(),
      );

      final res = await _apiService.submitBooking(req);
      final bookingId = res['booking']?['id'] ?? 'WOM-CONFIRMED';

      setState(() {
        _confirmedBookingId = bookingId;
      });

      // Launch WhatsApp confirmation
      if (res['whatsAppDirectUrl'] != null) {
        WomeneApiService.openWhatsApp(
          phone: WomeneConstants.bookingHelpline,
          text: 'Hello WOMENE, I submitted Booking #$bookingId for $_selectedService (${_selectedMode.toUpperCase()}). Please confirm representative.',
        );
      }
    } finally {
      setState(() {
        _isSubmitting = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: WomeneColors.background,
      appBar: AppBar(
        backgroundColor: WomeneColors.primary,
        title: const Text('Book Service (Online/Offline)', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: _confirmedBookingId != null
          ? _buildSuccessView()
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Step Indicator
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: WomeneColors.cardBorder),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _buildStepNode(0, 'Service'),
                        _buildStepNode(1, 'Details'),
                        _buildStepNode(2, 'Mode'),
                        _buildStepNode(3, 'Confirm'),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  if (_currentStep == 0) _buildStep0CategorySelection(),
                  if (_currentStep == 1) _buildStep1CustomerDetails(),
                  if (_currentStep == 2) _buildStep2ModeSelection(),
                  if (_currentStep == 3) _buildStep3Summary(),

                  const SizedBox(height: 20),

                  // Navigation Buttons
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      if (_currentStep > 0)
                        OutlinedButton(
                          onPressed: () => setState(() => _currentStep--),
                          child: const Text('Back'),
                        )
                      else
                        const SizedBox.shrink(),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: WomeneColors.primary,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: _isSubmitting
                            ? null
                            : () {
                                if (_currentStep < 3) {
                                  setState(() => _currentStep++);
                                } else {
                                  _submitBooking();
                                }
                              },
                        child: _isSubmitting
                            ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                            : Text(_currentStep == 3 ? 'Confirm & WhatsApp 7989997015' : 'Next Step'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
    );
  }

  Widget _buildStepNode(int index, String label) {
    final isActive = _currentStep == index;
    final isDone = _currentStep > index;
    return Column(
      children: [
        CircleAvatar(
          radius: 14,
          backgroundColor: isDone ? WomeneColors.successGreen : isActive ? WomeneColors.primary : Colors.grey.shade300,
          child: Text(
            '${index + 1}',
            style: TextStyle(color: isDone || isActive ? Colors.white : Colors.grey.shade700, fontSize: 11, fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(fontSize: 10, fontWeight: isActive ? FontWeight.bold : FontWeight.normal, color: isActive ? WomeneColors.primary : Colors.grey),
        ),
      ],
    );
  }

  Widget _buildStep0CategorySelection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Choose Service Category', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: _categories.map((c) {
            final isSel = _selectedCategory == c;
            return ChoiceChip(
              label: Text(c),
              selected: isSel,
              selectedColor: WomeneColors.primary,
              labelStyle: TextStyle(color: isSel ? Colors.white : WomeneColors.textPrimary, fontWeight: FontWeight.bold, fontSize: 12),
              onSelected: (val) {
                if (val) setState(() => _selectedCategory = c);
              },
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildStep1CustomerDetails() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Recipient Details', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        const SizedBox(height: 10),
        _buildTextField('Full Name', _nameController, Icons.person),
        const SizedBox(height: 10),
        _buildTextField('Mobile Phone Number', _phoneController, Icons.phone, keyboardType: TextInputType.phone),
        const SizedBox(height: 10),
        _buildTextField('City / Mandal', _cityController, Icons.location_city),
        const SizedBox(height: 10),
        _buildTextField('Address / Landmark', _addressController, Icons.home),
      ],
    );
  }

  Widget _buildStep2ModeSelection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Service Delivery Mode', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        const SizedBox(height: 12),
        RadioListTile<String>(
          value: 'offline',
          groupValue: _selectedMode,
          title: const Text('Offline (At-Home / In-Person)', style: TextStyle(fontWeight: FontWeight.bold)),
          subtitle: const Text('Verified WOMENE coordinator arrives within 4 KM radius.'),
          onChanged: (v) => setState(() => _selectedMode = v!),
        ),
        RadioListTile<String>(
          value: 'online',
          groupValue: _selectedMode,
          title: const Text('Online (Virtual / Tele-Consultation)', style: TextStyle(fontWeight: FontWeight.bold)),
          subtitle: const Text('Guidance, routine checking, and remote monitoring via video/phone.'),
          onChanged: (v) => setState(() => _selectedMode = v!),
        ),
        const SizedBox(height: 10),
        _buildTextField('Special instructions / notes', _notesController, Icons.notes, maxLines: 2),
      ],
    );
  }

  Widget _buildStep3Summary() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: WomeneColors.cardBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Booking Review', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          const Divider(),
          Text('Service: $_selectedCategory', style: const TextStyle(fontWeight: FontWeight.bold)),
          Text('Name: ${_nameController.text} (${_phoneController.text})'),
          Text('Location: ${_cityController.text}'),
          Text('Mode: ${_selectedMode.toUpperCase()}'),
          const SizedBox(height: 10),
          const Text('Official Booking Helpline: 7989997015', style: TextStyle(color: WomeneColors.successGreen, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildTextField(String label, TextEditingController controller, IconData icon, {TextInputType? keyboardType, int maxLines = 1}) {
    return TextField(
      controller: controller,
      keyboardType: keyboardType,
      maxLines: maxLines,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, color: WomeneColors.primary, size: 20),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      ),
    );
  }

  Widget _buildSuccessView() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.check_circle, color: WomeneColors.successGreen, size: 64),
            const SizedBox(height: 16),
            const Text('Booking Confirmed!', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
            const SizedBox(height: 8),
            Text('Booking ID: $_confirmedBookingId', style: const TextStyle(color: WomeneColors.primary, fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 12),
            const Text(
              'A nearby WOMENE coordinator has received your request. You can track or update directly on WhatsApp at 7989997015.',
              textAlign: TextAlign.center,
              style: TextStyle(color: WomeneColors.textSecondary, fontSize: 13),
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: WomeneColors.successGreen,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              icon: const Icon(Icons.chat),
              label: const Text('Open WhatsApp Connect'),
              onPressed: () {
                WomeneApiService.openWhatsApp(
                  phone: WomeneConstants.bookingHelpline,
                  text: 'Hi WOMENE, tracking my Booking $_confirmedBookingId',
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
