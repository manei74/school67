# 📱 Lyceum 67 Mobile App

> Unified mobile application for students, parents and staff of Lyceum 67

[![Version](https://img.shields.io/badge/version-1.0.6-blue.svg)](package.json)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://reactnative.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-61dafb.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.11-000020.svg)](https://expo.dev/)

## 📋 About the Project

**Lyceum 67** is a modern mobile application that combines all important aspects of school life in one place:

- 📚 **Class Schedule** — up-to-date schedule with subgroups and changes
- 📅 **Calendar** — annual academic calendar and holidays
- 📰 **News** — links to official website, VKontakte and Telegram
- 🏆 **Olympiads** — information about upcoming olympiads
- 📖 **Pamphlets** — important documents and school rules
- 🎓 **For Graduates** — useful resources for exam preparation

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
# Start in development mode
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run in web browser
npm run web
```

### Production Build

```bash
# Build for Android
npm run build:android

# Build APK for preview
npm run build:apk

# Submit to Google Play
npm run submit:android
```

## 🛠 Tech Stack

### Frontend

- **Framework:** React Native 0.81.4
- **Router:** Expo Router 6.0
- **Navigation:** React Navigation 7.x
- **Storage:** AsyncStorage
- **UI Components:** Custom themed components

### Tools & Services

- **Platform:** Expo ~54.0.11
- **Build Service:** EAS (Expo Application Services)
- **Package Manager:** npm
- **Version Control:** Git

## 📁 Project Structure

```
school67/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Schedule (main screen)
│   │   ├── calendar.tsx     # Calendar and holidays
│   │   ├── news.tsx         # News
│   │   ├── olympiads.tsx    # Olympiads
│   │   ├── pamphlets.tsx    # Pamphlets
│   │   └── graduates.tsx    # For graduates
│   └── _layout.tsx          # Root layout
├── src/
│   ├── components/          # Reusable components
│   ├── screens/            # Application screens
│   ├── services/           # API services
│   ├── store/              # State management
│   ├── types/              # TypeScript types
│   ├── data/               # Mock data
│   ├── config/             # Configuration
│   └── utils/              # Utilities
├── assets/                 # Images, fonts, icons
└── app.config.js          # Expo configuration
```

## 🎯 Key Features

### 📚 Schedule

- **Today** — current day schedule
- **Week** — full week schedule
- **Navigation** — interactive school map with classrooms
- **Bells** — bell schedule (12 periods, 08:30-19:00)

### 📅 Calendar

- Annual academic calendar
- Holiday information
- Countdown to next holidays

### 🏆 Olympiads

- Information about upcoming olympiads

### 📖 Pamphlets

- School uniform regulations
- Student conduct rules
- Safety guidelines

### 🎓 For Graduates

- Direct link to FIPI website
- Exam preparation resources

## 🔧 Development

### Code Quality

```bash
# Linting
npm run lint

# TypeScript check
npx tsc --noEmit
```

## 🎨 UI/UX

- **Theme:** Light
- **Color Scheme:** Blue accents (#007AFF)
- **Typography:** System fonts for iOS and Android
- **Navigation:** Bottom tab navigation
- **Responsive:** Support for various screen sizes

## 📱 Supported Platforms

- ✅ **iOS** — iPhone (iOS 13.4+)
- ✅ **Android** — Smartphones (Android 6.0+)
- 🔄 **Web** — In development

## 📝 Available Classes

**Grades 5-9:** 5а, 5б, 5в, 6а, 6б, 6в, 7а, 7б, 7в, 8а, 8б, 8в, 9а, 9б, 9в
**Grades 10-11:** 10а, 10б, 11а

Each class may have subgroups:

- гуманитарная (гум) — humanities
- техническая (техн) — technical
- естественно-научная (е/н) — natural science
- информационно-математическая (и-м) — information-mathematics
- физико-математическая (ф-м) — physics-mathematics
- общеобразовательная (о/о) — general education

## 📄 License

Private project for Lyceum 67, Chelyabinsk

## 📞 Contact

**Feedback email:** maneev.nikita@gmail.com

---

**Current Version:** 1.0.6
**Last Updated:** October 2025
**Database Status:** ✅ MongoDB Atlas
**API Status:** ✅ Running with real data
