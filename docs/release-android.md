# Android Release Checklist - Lyceum 67

## Prerequisites

### One-time Setup
1. **Install EAS CLI**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure credentials (first time only)**
   ```bash
   eas credentials -p android
   ```

### Google Play Console Setup
1. Create Google Play Developer account ($25 one-time fee)
2. Create new application in Play Console
3. Complete store listing information
4. Upload required assets (icon, screenshots, feature graphic)
5. Complete Content Rating questionnaire
6. Fill out Data Safety form
7. Publish privacy policy at stable URL
8. Add privacy policy URL to store listing

## Pre-Release Checklist

### Code & Configuration
- [ ] Version bumped in `app.json` (`version` and `android.versionCode`)
- [ ] All features tested on physical devices
- [ ] Release notes prepared
- [ ] Privacy policy reviewed and updated
- [ ] Data Safety form reflects current app behavior
- [ ] Store listing content ready (title, description, keywords)

### Assets Ready
- [ ] App icon (512×512 PNG)
- [ ] Feature graphic (1024×500 PNG)  
- [ ] Screenshots (at least 2, recommended 4-8)
- [ ] Privacy policy hosted at public URL

### Compliance
- [ ] Data Safety declaration completed
- [ ] Content rating appropriate
- [ ] All required permissions justified
- [ ] Children's privacy requirements met (if applicable)

## Build & Submit Commands

### 1. Build .aab for Production
```bash
# Build Android App Bundle
npm run build:android

# Alternative direct command
eas build -p android --profile production
```

### 2. Submit to Internal Testing
```bash
# Submit to Play Console Internal Testing track
npm run submit:android

# Alternative direct command  
eas submit -p android --profile production
```

### 3. Monitor Build Status
```bash
# Check build status
eas build:list

# View specific build
eas build:view [BUILD_ID]
```

## Release Track Progression

### 1. Internal Testing (Start Here)
- **Purpose:** Team testing, initial validation
- **Users:** Up to 100 internal testers
- **Review:** No Google review required
- **Command:** Automatic with submit command

### 2. Closed Testing (Alpha/Beta)
```bash
# Promote from Internal to Closed Testing in Play Console
# OR build specifically for closed testing:
eas build -p android --profile production
eas submit -p android --profile production
```

### 3. Open Testing
- **Purpose:** Public beta testing
- **Users:** Anyone with the link
- **Review:** Basic Google review

### 4. Production Release
- **Purpose:** Full public release
- **Users:** All Google Play users
- **Review:** Full Google review (can take 7+ days)

## Troubleshooting Common Issues

### Build Failures
```bash
# Check build logs
eas build:view [BUILD_ID]

# Clear cache and retry
eas build -p android --profile production --clear-cache
```

### Submission Issues
- **Wrong keystore:** Ensure using same keystore as previous releases
- **Version conflicts:** Check versionCode is higher than previous
- **Policy violations:** Review Play Console feedback

### Credential Issues
```bash
# Reset credentials if needed
eas credentials -p android --clear

# View current credentials
eas credentials -p android
```

## Version Management

### Semantic Versioning
- **Major.Minor.Patch** format (e.g., 1.0.0)
- Increment `versionCode` by 1 for each release
- Update release notes for each version

### Release Notes Template
```
Version X.Y.Z
• Новые функции
• Исправления ошибок  
• Улучшения производительности
```

## Post-Release Tasks

### After Internal Testing
- [ ] Test downloaded APK/AAB on multiple devices
- [ ] Verify all features work correctly
- [ ] Check analytics are working
- [ ] Gather feedback from internal testers

### After Production Release
- [ ] Monitor crash reports in Play Console
- [ ] Check user reviews and ratings
- [ ] Verify analytics data
- [ ] Plan next release based on feedback

## Backup & Recovery

### Keystore Backup
```bash
# Download keystore backup
eas credentials -p android

# Store securely - if lost, you cannot update your app!
```

### Important Files to Backup
- `google-services.json` (if using Firebase)
- Keystore files and passwords
- Signing certificates
- Play Console service account keys

## Automation

### GitHub Actions (Optional)
- Configured in `.github/workflows/eas-build.yml`
- Requires `EXPO_TOKEN` secret in repository
- Triggers on version tags (e.g., `v1.0.0`)

### Manual Trigger
```bash
# Tag release and push to trigger CI
git tag v1.0.0
git push origin v1.0.0
```

## Emergency Procedures

### Rollback Release
1. In Play Console, go to Production track
2. Create release with previous version
3. Set rollout percentage to 100%

### Critical Bug Fix
1. Fix bug in code
2. Increment versionCode
3. Build and submit emergency release
4. Use "Expedited review" if available

## Contact & Support

- **Expo Support:** [https://expo.dev/support](https://expo.dev/support)
- **Play Console Help:** [https://support.google.com/googleplay](https://support.google.com/googleplay)
- **Project Issues:** [GitHub Issues](https://github.com/[your-repo]/issues)

---

## Quick Command Reference

```bash
# Essential commands
eas login                                    # Login to Expo
npm run build:android                        # Build production .aab  
npm run submit:android                       # Submit to Play Store
eas build:list                              # View build history
eas credentials -p android                   # Manage credentials

# Version management
# Update app.json: version (e.g., "1.0.1") and android.versionCode (e.g., 2)
git tag v1.0.1 && git push origin v1.0.1   # Trigger automated build
```