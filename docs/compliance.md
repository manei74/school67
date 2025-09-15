# Data Safety & Compliance Documentation

## Google Play Data Safety Declaration

### Data Collection Summary
Based on the current app functionality, complete this form in Play Console:

#### Personal Info
- [ ] **Name** - Not collected
- [ ] **Email address** - Not collected  
- [ ] **User IDs** - Not collected
- [ ] **Address** - Not collected
- [ ] **Phone number** - Not collected
- [ ] **Other personal info** - Not collected

#### Financial Info
- [ ] **Payment info** - Not collected
- [ ] **Purchase history** - Not collected
- [ ] **Credit score** - Not collected
- [ ] **Other financial info** - Not collected

#### Health and Fitness
- [ ] **Health info** - Not collected
- [ ] **Fitness info** - Not collected

#### Messages
- [ ] **Emails** - Not collected
- [ ] **SMS or MMS** - Not collected
- [ ] **Other in-app messages** - Not collected

#### Photos and Videos
- [ ] **Photos** - Not collected
- [ ] **Videos** - Not collected

#### Audio Files
- [ ] **Voice or sound recordings** - Not collected
- [ ] **Music files** - Not collected
- [ ] **Other audio files** - Not collected

#### Files and Docs
- [ ] **Files and docs** - Not collected

#### Calendar
- [ ] **Calendar events** - Not collected

#### Contacts
- [ ] **Contacts** - Not collected

#### App Activity
- [ ] **App interactions** - May be collected (analytics)
- [ ] **In-app search history** - Not collected
- [ ] **Installed apps** - Not collected
- [ ] **Other user-generated content** - Not collected
- [ ] **Other app activity** - Not collected

#### Web Browsing
- [ ] **Web browsing history** - Not collected

#### App Info and Performance
- [ ] **Crash logs** - May be collected (via Expo)
- [ ] **Diagnostics** - May be collected (via Expo)
- [ ] **Other app performance data** - May be collected (via Expo)

#### Device or Other IDs
- [ ] **Device or other IDs** - May be collected (Expo device ID)

### Data Sharing
- **Shared with third parties:** Yes (Expo services)
- **Shared for advertising:** No
- **Shared for analytics:** Yes (Expo Analytics)

### Data Security
- [x] **Data is encrypted in transit**
- [x] **Users can request data deletion**
- [x] **Data follows the Families Policy** (if targeting children)

## Permissions Audit

Current permissions in `app.json`:
```json
"android": {
  "permissions": [
  ]
}
```

### Permission Rationale
| Permission | Used For | Required |
|------------|----------|----------|
| INTERNET | API calls, content loading | Yes |
| ACCESS_NETWORK_STATE | Network status checking | Yes |
| WAKE_LOCK | Keep screen on during reading | Optional |

## SDK Data Collection

### Expo SDK Data Usage
- **Device Information:** Device model, OS version (for compatibility)
- **App Performance:** Crash reports, performance metrics
- **Usage Analytics:** App opens, feature usage (anonymized)

### React Native Third-party Libraries
Review each dependency for data collection:
- `@react-navigation/*` - Navigation tracking (local only)
- `expo-updates` - Update checks (anonymous)
- `@react-native-async-storage/async-storage` - Local storage (no external data)

## Children's Privacy (COPPA Compliance)

If app targets children under 13:

### Required Disclosures
- [ ] Clear privacy policy for children
- [ ] Parental consent mechanisms
- [ ] Limited data collection
- [ ] No behavioral advertising
- [ ] No location tracking

### Families Policy Requirements
- [ ] Age-appropriate content only
- [ ] No links to external sites
- [ ] No in-app purchases without parental consent
- [ ] Educational or entertainment value

## Data Retention Policy

### Local Data (AsyncStorage)
- **User preferences:** Retained until app uninstall
- **Schedule cache:** Retained for 30 days, then refreshed
- **Settings:** Retained until manually cleared

### Analytics Data
- **Expo Analytics:** Retained per Expo's policy (typically 2 years)
- **Crash Reports:** Retained for debugging purposes

## Privacy Policy Requirements

Must include:
- [ ] What data is collected
- [ ] How data is used
- [ ] Who data is shared with
- [ ] How users can control their data
- [ ] Contact information for privacy questions
- [ ] Updates to privacy policy procedures

## Compliance Checklist

### Before Submission
- [ ] Data Safety form completed accurately
- [ ] Privacy policy published at stable URL
- [ ] All permissions justified and documented
- [ ] Third-party SDK data usage reviewed
- [ ] Children's privacy requirements met (if applicable)
- [ ] GDPR compliance verified (if targeting EU)

### Regular Reviews
- [ ] Quarterly review of data collection practices
- [ ] Update privacy policy when adding new features
- [ ] Review third-party SDK updates for data changes
- [ ] Monitor Play Console policy updates

## Common Issues to Avoid

- ❌ Collecting data without declaring it
- ❌ Using sensitive permissions unnecessarily  
- ❌ Missing or broken privacy policy link
- ❌ Inconsistent data practices vs. policy
- ❌ Targeting children without proper safeguards
- ❌ Sharing data with undisclosed third parties