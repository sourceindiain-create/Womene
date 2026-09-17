import 'package:flutter/material.dart';
import 'constants/theme.dart';
import 'screens/home_screen.dart';
import 'screens/ai_doctor_screen.dart';
import 'screens/emergency_sos_screen.dart';
import 'screens/booking_screen.dart';
import 'screens/marketplace_screen.dart';
import 'screens/team_branches_screen.dart';

void main() {
  runApp(const WomeneApp());
}

class WomeneApp extends StatefulWidget {
  const WomeneApp({Key? key}) : super(key: key);

  @override
  State<WomeneApp> createState() => _WomeneAppState();
}

class _WomeneAppState extends State<WomeneApp> {
  String _currentLanguage = 'en'; // 'en', 'te', 'hi'

  void _setLanguage(String lang) {
    setState(() {
      _currentLanguage = lang;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WOMENE Care Network',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: WomeneColors.primary,
        colorScheme: ColorScheme.fromSeed(
          seedColor: WomeneColors.primary,
          primary: WomeneColors.primary,
          secondary: WomeneColors.accentPink,
        ),
        scaffoldBackgroundColor: WomeneColors.background,
        fontFamily: 'Roboto',
      ),
      home: MainNavigationContainer(
        currentLanguage: _currentLanguage,
        onLanguageChange: _setLanguage,
      ),
    );
  }
}

class MainNavigationContainer extends StatefulWidget {
  final String currentLanguage;
  final Function(String) onLanguageChange;

  const MainNavigationContainer({
    Key? key,
    required this.currentLanguage,
    required this.onLanguageChange,
  }) : super(key: key);

  @override
  State<MainNavigationContainer> createState() => _MainNavigationContainerState();
}

class _MainNavigationContainerState extends State<MainNavigationContainer> {
  int _currentIndex = 0;

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> pages = [
      HomeScreen(
        onNavigateTab: _onTabTapped,
        currentLanguage: widget.currentLanguage,
        onLanguageChange: widget.onLanguageChange,
      ),
      BookingScreen(currentLanguage: widget.currentLanguage), // Services & Booking
      AiDoctorScreen(
        currentLanguage: widget.currentLanguage,
        onNavigateTab: _onTabTapped,
      ),
      EmergencySosScreen(currentLanguage: widget.currentLanguage),
      BookingScreen(currentLanguage: widget.currentLanguage),
      MarketplaceScreen(currentLanguage: widget.currentLanguage),
      const TeamBranchesScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: pages,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex > 4 ? 0 : _currentIndex,
          onTap: _onTabTapped,
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.white,
          selectedItemColor: WomeneColors.primary,
          unselectedItemColor: Colors.grey.shade500,
          selectedFontSize: 11,
          unselectedFontSize: 10,
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_outlined),
              activeIcon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.medical_services_outlined),
              activeIcon: Icon(Icons.medical_services),
              label: 'Services',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.smart_toy_outlined),
              activeIcon: Icon(Icons.smart_toy),
              label: 'AI Doctor',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.emergency_outlined),
              activeIcon: Icon(Icons.emergency, color: Colors.red),
              label: '4KM SOS',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.calendar_month_outlined),
              activeIcon: Icon(Icons.calendar_month),
              label: 'Book',
            ),
          ],
        ),
      ),
    );
  }
}
