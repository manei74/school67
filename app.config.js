// Import version directly to avoid __DEV__ issues in config context
const ENV_CONFIG = {
  VERSION: "1.0.6"
};

// Extract version parts for Android versionCode
const versionParts = ENV_CONFIG.VERSION.split('.');
const versionCode = parseInt(versionParts[2] || '0'); // Use patch number as versionCode

export default {
  expo: {
    name: "Lyceum 67",
    slug: "lyceum67-app",
    version: ENV_CONFIG.VERSION,
    runtimeVersion: {
      policy: "appVersion"
    },
    updates: {
      url: "https://u.expo.dev/c4814f23-4a0f-43d1-8f10-ffe8cf90d07c"
    },
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.lyceum67.app",
      buildNumber: ENV_CONFIG.VERSION,
      deploymentTarget: "13.0",
      icon: "./assets/images/icon.png",
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      config: {
        usesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.lyceum67.app",
      versionCode: versionCode,
      minSdkVersion: 21,
      compileSdkVersion: 34,
      targetSdkVersion: 34,
      buildToolsVersion: "34.0.0"
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    platforms: [
      "ios",
      "android",
      "web"
    ],
    extra: {
      eas: {
        projectId: "c4814f23-4a0f-43d1-8f10-ffe8cf90d07c"
      }
    },
    plugins: [
      "expo-router",
      "expo-web-browser"
    ]
  }
};