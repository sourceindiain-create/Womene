# WOMENE Mobile Application (Flutter Cross-Platform)

Official Flutter mobile client for **WOMENE Society & Technology Services** ("People Near You. Always.").
Engineered with Flutter 3.x for iOS, Android, and Web, connecting directly to the full-stack Node.js & Express API.

---

## 🌟 Key Architecture & Features

1. **Direct Backend Integration (`lib/services/api_service.dart`)**:
   - Communicates with Express / Node.js backend:
     - `/api/team`: Founder Dr. Krishna Chaitanya, 9 active branches & expansion roadmap
     - `/api/booking`: 5-step booking flow with Offline (At-Home) & Online (Virtual) mode toggling
     - `/api/emergency/sos`: 4-KM responder broadcast with GPS coordinates and 112/108 bridge
     - `/api/ai/doctor`: 6 specialized intelligence engines (Human, Cattle/Animal, Birds, Plants, Crops, Soil) with 5 Solution Pathways (Modern, Low-Cost, Natural/Jeevamrutha, Ayurveda, Yoga/Lifestyle)
     - `/api/ai/chat`: Multilingual Gemini Assistant in Telugu, English & Hindi

2. **Native Device Features**:
   - **One-Tap WhatsApp Connect**: Direct routing to Booking Helpline `7989997015` with pre-filled service payload.
   - **Emergency Dialer**: Direct intent calling to `112` (Police), `108` (Ambulance), `1091` (Women), `1098` (Child), `8125016226` / `7981967919` (Team).
   - **4-KM Geofencing Ready**: Local radius responder simulation.

---

## 🚀 How to Run Locally

### 1. Prerequisites
- Flutter SDK (3.10 or newer)
- Android Studio / Xcode / VS Code
- Connected Android Device or Emulator

### 2. Setup & Install Dependencies
```bash
cd flutter_app
flutter pub get
```

### 3. Run Development Build
```bash
# Run on connected device or simulator
flutter run

# Or run targeting Chrome web
flutter run -d chrome
```

### 4. Build Release APK (Android)
```bash
flutter build apk --release
# Generated APK will be in build/app/outputs/flutter-apk/app-release.apk
```

### 5. Build iOS Bundle
```bash
flutter build ipa --release
```

---

## 🏛️ Project Directory Structure

```text
flutter_app/
├── pubspec.yaml                 # Dependencies (http, url_launcher, geolocator, etc.)
├── README.md                    # Setup & build documentation
└── lib/
    ├── main.dart                # App entrypoint, Theme, Multi-language switcher & BottomNav
    ├── constants/
    │   └── theme.dart           # Brand colors, typography, and company constants
    ├── models/
    │   └── womene_models.dart   # Type definitions for Services, Bookings, AI Doctor
    ├── services/
    │   └── api_service.dart     # Node.js backend connector & WhatsApp fallback
    └── screens/
        ├── home_screen.dart         # Hero banner, SOS alert, core services grid
        ├── ai_doctor_screen.dart    # 6 engines + 5 medicine solution pathways
        ├── emergency_sos_screen.dart # 4-KM responder dispatch & 112/108 bridge
        ├── booking_screen.dart      # 5-step interactive booking flow
        ├── marketplace_screen.dart  # Direct organic village produce & farm inputs
        └── team_branches_screen.dart # Dr. Krishna Chaitanya, 9 branches & AP/TS expansion
```
