# CLAUDE.md - Project Documentation for AI Assistant

## Project Overview

**Мобильное приложение «Лицей 67»** - единое React Native приложение для учеников, родителей и сотрудников Лицея 67, включающее расписание, новости, навигацию, олимпиады и нормативные документы.

### Key Features
- **Расписание:** Текущий день, неделя, навигация по школе, звонки
- **Календарь:** Годовой график, счётчик до каникул
- **Новости:** Сайт лицея, ВК, Телеграм
- **Олимпиады:** Связь с olimp74.ru
- **Памятки:** Школьная форма, правила, безопасность
- **Выпускнику:** Связь с ФИПИ

## Tech Stack

### Frontend (React Native)
- **Platform:** React Native with Expo
- **Navigation:** React Navigation (Tab + Stack)
- **State Management:** Zustand (simple store)
- **Local Storage:** AsyncStorage
- **UI Components:** Custom themed components
- **Styling:** StyleSheet

### Backend & Database
- **Database:** MongoDB Atlas
  - Cluster: `cluster0.6uahvol.mongodb.net`
  - Database: `school-schedule`
- **API:** Node.js + Express + Mongoose
- **Production API:** `https://school67-backend.onrender.com/api/v1`
- **Authentication:** Database credentials in environment

### Data Collections
- **classes:** Class information (5a-11a)
- **teachers:** Teacher profiles
- **subjects:** Subject catalog
- **lessons:** Schedule with subgroups (гум, техн, е/н, и-м, ф-м, о/о)
- **bellschedules:** 12-period schedule (08:30-19:00)
- **changes:** Schedule modifications

## Project Structure

```
/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Schedule screen (main)
│   │   ├── calendar.tsx   # Calendar & holidays
│   │   ├── news.tsx       # News from site/VK/TG
│   │   ├── olympiads.tsx  # Olympiads
│   │   ├── pamphlets.tsx  # School documents
│   │   └── graduates.tsx  # Graduate resources
│   └── _layout.tsx        # Root layout with providers
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/          # Screen components
│   │   ├── OnboardingScreen.tsx
│   │   ├── WeekScheduleScreen.tsx
│   │   ├── BellsScreen.tsx
│   │   └── SchoolNavigationScreen.tsx
│   ├── services/         # API services
│   │   └── api.ts        # Main API service
│   ├── store/           # State management
│   │   └── simpleStore.ts # Zustand store
│   ├── types/           # TypeScript interfaces
│   ├── data/            # Mock data & fallbacks
│   ├── config/          # Environment configuration
│   └── utils/           # Helper functions
└── assets/              # Images, fonts, icons
```

## API Integration

### Production Endpoints
- **Base URL:** `https://school67-backend.onrender.com/api/v1`
- **Schedule:** `GET /schedule?classId={classCode}&date={YYYY-MM-DD}`
- **Week Schedule:** `GET /schedule/week?classId={classCode}&date={YYYY-MM-DD}`
- **Health Check:** `GET /health`

### Real Data Structure
```javascript
// API Response Format
{
  "classId": "68b767eba93855b57f4dd132",
  "classCode": "8a",
  "date": "2025-09-18",
  "weekday": 4,
  "isSchoolDay": true,
  "lessons": [
    {
      "num": 1,
      "subject": "Русский язык",
      "subjectShort": "Русский яз",
      "teacher": "Евченко Екатерина Юрьевна",
      "subgroup": null,
      "room": "218а",
      "startTime": "08:30",
      "endTime": "09:10"
    }
  ]
}
```

## Development Workflow

### Auto-Commit Policy
**IMPORTANT:** All code changes must be automatically committed. Even small changes should trigger a commit.

### Mandatory Pre-Commit Workflow
**CRITICAL:** Before every commit, the following steps are MANDATORY:
1. **Run lint check:** `npm run lint` - must pass with zero errors
2. **Update app version:** Increment version number in `package.json`
3. **TypeScript check:** Ensure `npx tsc --noEmit` passes without errors
4. **Commit with proper attribution:** Include Claude Code attribution

### Version Management
- **Current Version:** 1.0.6 (as of October 2025)
- **Version Format:** MAJOR.MINOR.PATCH (semantic versioning)
- **Update Policy:** Increment version with each significant change
- **Location:** Update `version` field in `package.json`

### Commit Standards
- Use descriptive commit messages
- Include change summary and technical details
- Always add Claude Code attribution:
```
🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Code Quality
- Follow existing TypeScript patterns
- Use existing component patterns
- Maintain consistent styling with StyleSheet
- Handle errors gracefully with fallbacks to mock data
- Support both real API and offline modes

## Key Implementation Details

### Schedule Data Handling
- **Subgroups:** Handle multiple subgroups per lesson (гум/техн/е/н)
- **Real Times:** Use actual lesson times from database (not hardcoded)
- **Fallback:** Graceful degradation to mock data if API unavailable
- **Grouping:** Group lessons by number to handle split classes

### State Management
```javascript
// Zustand store structure
{
  settings: { selectedClassId?: string },
  schedule: Schedule | null,
  weekSchedule: Schedule[],
  isLoading: boolean,
  isOnboardingCompleted: boolean
}
```

### Error Handling
- API failures fall back to mock data
- Display appropriate loading states
- Show connection status to users
- Cache data locally with AsyncStorage

## Environment Configuration

### API URLs
- **Production:** `https://school67-backend.onrender.com/api/v1`
- **Local Development:** `http://localhost:3000/api/v1`
- **Configurable via:** `src/config/env.ts`

### Feature Flags
- **REAL_API:** Enable/disable real API calls
- **OFFLINE_MODE:** Enable offline data caching
- **PUSH_NOTIFICATIONS:** Enable push notifications

## Testing & Deployment

### Available Classes for Testing
- 5th Grade: 5a, 5b, 5v
- 6th Grade: 6a, 6b, 6v  
- 7th Grade: 7a, 7b, 7v
- 8th Grade: 8a, 8b, 8v
- 9th Grade: 9a, 9b, 9v
- 10th Grade: 10a, 10b
- 11th Grade: 11a

### Build Commands
```bash
npm start           # Start development server
npm run android     # Run on Android
npm run ios         # Run on iOS  
npm run web         # Run on web
npx tsc --noEmit    # Type checking
```

## Important Notes for AI Assistant

1. **Always auto-commit changes** - even minor modifications
2. **Use real database API** - primary data source is production MongoDB
3. **Handle subgroups properly** - lessons can have multiple parts (гум, техн, etc.)
4. **Maintain fallbacks** - app must work offline with mock data
5. **Follow existing patterns** - use established component and state patterns
6. **Real bell schedule** - 12 periods from 08:30 to 19:00
7. **TypeScript compliance** - maintain type safety throughout

## Current Status

- ✅ **Database Integration:** Connected to real MongoDB Atlas
- ✅ **API Integration:** Using production API endpoints  
- ✅ **Schedule Display:** Shows real lessons with subgroups
- ✅ **Bell Schedule:** Uses actual school times
- ✅ **Error Handling:** Graceful fallbacks implemented
- ✅ **Auto-commit:** Enabled for all changes

---

**Last Updated:** September 2025
**Database Status:** ✅ Live on MongoDB Atlas  
**API Status:** ✅ Functional with real data