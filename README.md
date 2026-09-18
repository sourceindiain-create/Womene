# WOMENE - People Near You. Always

> **Care • Support • Companionship**  
> A women-led human-support network integrating Community Care, Multimodal AI Doctor (Human, Animal, Bird, Plant, Crop, Soil), Agriculture & Government Technology Hub, and World-Wide AI Library.

---

## 🌐 Live Web App Links

| Environment | Live URL |
| :--- | :--- |
| **Public Live Production App** | [https://ais-pre-p6rzxv3lieoxp7s6smsfu2-682266057961.asia-east1.run.app](https://ais-pre-p6rzxv3lieoxp7s6smsfu2-682266057961.asia-east1.run.app) |
| **Development Preview** | [https://ais-dev-p6rzxv3lieoxp7s6smsfu2-682266057961.asia-east1.run.app](https://ais-dev-p6rzxv3lieoxp7s6smsfu2-682266057961.asia-east1.run.app) |
| **Firebase Project** | `studio-6989353372-64cd3` (`studio-6989353372-64cd3.firebaseapp.com`) |

---

## 🚀 Key Modules & Architecture

1. **Full-Stack Multi-Backend Architecture**:
   - **Frontend**: React 19 + TypeScript + Tailwind CSS with trilingual support (Telugu, Hindi, English).
   - **Backend Engine 1 (Node.js Express)**: `server.ts` with complete REST APIs for services, bookings, emergency SOS, and Gemini AI.
   - **Backend Engine 2 (Vercel Serverless)**: Modular handlers in `/api/` (`health.ts`, `booking.ts`, `team.ts`, `emergency/sos.ts`, `chat.ts`, `doctor.ts`) controlled by `vercel.json`.
   - **Dual Cloud Database**:
     - **Firebase Firestore**: `ai-studio-womenepeoplenear-df1f2517-18a3-44e6-90a8-494efbfb1833` (Active & Secured).
     - **Supabase PostgreSQL**: Ready with schema in `src/db/supabase_schema.sql` (RLS policies, UUID primary keys, and high-speed indexes).

---

## ⚡ Vercel Deployment Guide

This project is 100% configured for 1-click deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub (or import via AI Studio GitHub Export).
2. Go to **[vercel.com/new](https://vercel.com/new)** and import your `womene` repository.
3. In the Vercel project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add the following **Environment Variables** in Vercel:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `VITE_SUPABASE_URL`: Your Supabase Project URL (`https://xyz.supabase.co`).
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Public Key.
5. Click **Deploy**. Vercel will build the frontend and deploy the serverless functions in `/api/*` automatically!

---

## 🐘 Supabase PostgreSQL Setup Guide

1. Create a free project at **[supabase.com](https://supabase.com)**.
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Open `src/db/supabase_schema.sql` from this codebase, copy all contents, and click **Run**.
   - Creates `service_bookings` table
   - Creates `emergency_alerts` table
   - Creates `ai_consultations` table
   - Creates `community_members` table
   - Applies Row Level Security (RLS) policies and indexes automatically.
4. Go to **Project Settings -> API** in Supabase:
   - Copy `Project URL` into `VITE_SUPABASE_URL`
   - Copy `anon public key` into `VITE_SUPABASE_ANON_KEY`
5. The application will now sync all bookings and emergency dispatches to both Firebase Firestore and Supabase PostgreSQL in real-time!

2. **Multi-Species AI Doctor**:
   - 6 specialized diagnostic engines:
     - **Human Health AI**: Clinical triage, vitals, stress & cardiac health.
     - **Animal & Livestock Doctor**: Bovine & ruminant care with Ethno-Veterinary Medicine (EVM) protocols.
     - **Avian & Bird Doctor**: Poultry flocks, broilers, layers, and backyard birds.
     - **Plant Pathology AI**: Leaf blight, fungal rusts, powdery mildew, and pest triage.
     - **Crop AI**: Comprehensive crop protection for paddy, cotton, chilli, and horticulture.
     - **Soil Health AI**: pH balance, organic carbon, NPK ratios, and Jeevamrutha preparation.
   - Structured **5-Path Solution Engine**: Modern Medicine, Low-Cost Generics, Natural Home Remedies, Ayurveda/EVM, and Lifestyle/Agronomy.

3. **Agri Resources & Government Schemes Hub**:
   - Direct portals for PM-Kisan, Kisan Suvidha, Meghdoot Weather, e-NAM, PMFBY, and SMAM Drone Subsidies.
   - Kisan Call Centre Hotline (`1800-180-1551`).
   - Drone specifications, IoT sensors, and practical video masterclasses.

4. **World-Wide AI Library**:
   - Daily bulletins, weekly medical & veterinary journals, monthly farming magazines, and classical literature.

5. **Cross-Platform Flutter Mobile Studio**:
   - Production-ready Flutter Dart codebase in `flutter_mobile/` ready for iOS & Android builds.

---

## 🛠️ GitHub Repository Setup & Push Commands

To create and push this codebase to your own GitHub repository named `womene`:

```bash
# 1. Initialize git repository
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "feat: initial release of WOMENE full-stack platform with Firebase, AI Doctor & Agri Hub"

# 4. Set main branch
git branch -M main

# 5. Link to your GitHub repository (replace with your GitHub username)
git remote add origin https://github.com/emfi-ceo/womene.git

# 6. Push to GitHub
git push -u origin main
```

> **Note**: You can also use the **"Export to GitHub"** button in the Google AI Studio top-right settings menu to automatically create and sync the repository with your GitHub account.

---

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🛡️ Support & Inquiries
- **Official Booking WhatsApp**: [+91 79899 97015](https://wa.me/917989997015)
- **Helplines**: 8125016226, 7981967919
- **Email**: emfi.ceo@gmail.com
- **Head Office**: White Field Road, 1st Line, Ayyappa Nagar, Bengaluru, Karnataka, India
