# Firebase Setup for Android

## Overview
This app currently does not use push notifications or Firebase services. This document provides instructions for setting up Firebase if you decide to add these features.

## Setting up Firebase (if needed)

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing one
3. Add Android app with package name: `com.lyceum67.app`

### 2. Get SHA Fingerprints
You need to add SHA-1 and SHA-256 fingerprints to Firebase:

#### From EAS Build (Production)
```bash
# After your first EAS build, get the keystore info
eas credentials -p android

# Download the keystore and get fingerprints
keytool -list -v -keystore your-keystore.jks -alias your-alias
```

#### From Play Console
1. Go to Play Console → Your App → Release → Setup → App Signing
2. Copy SHA-1 and SHA-256 from "App signing certificate"
3. Add these to Firebase project settings

### 3. Download google-services.json
1. In Firebase project settings, download `google-services.json`
2. Place it in the root directory of your project
3. Ensure it's added to `.gitignore` if it contains sensitive data

### 4. Configure App
If adding Firebase, install required packages:
```bash
npx expo install expo-notifications
# or for full Firebase SDK
npm install @react-native-firebase/app @react-native-firebase/messaging
```

Update `app.json`:
```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

## Common Issues Checklist

- [ ] Wrong package name in Firebase (must match `com.lyceum67.app`)
- [ ] Missing SHA-1/SHA-256 fingerprints
- [ ] `google-services.json` not in project root
- [ ] Fingerprints from debug keystore instead of production
- [ ] Server key not configured in backend (if using server-to-device messaging)

## Push Notifications Setup

If implementing push notifications:

1. Add to `app.json`:
```json
{
  "expo": {
    "notification": {
      "icon": "./assets/images/notification-icon.png",
      "color": "#ffffff"
    }
  }
}
```

2. Request permissions in app:
```javascript
import * as Notifications from 'expo-notifications';

// Request permissions
const { status } = await Notifications.requestPermissionsAsync();
```

3. Get server key from Firebase Console → Project Settings → Cloud Messaging → Server Key