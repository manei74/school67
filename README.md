# 📱 Мобильное приложение «Лицей 67»

> Единое мобильное приложение для учеников, родителей и сотрудников Лицея 67

[![Version](https://img.shields.io/badge/version-1.0.6-blue.svg)](package.json)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://reactnative.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-61dafb.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.11-000020.svg)](https://expo.dev/)

## 📋 О проекте

**Лицей 67** — это современное мобильное приложение, объединяющее все важные аспекты школьной жизни в одном месте:

- 📚 **Расписание уроков** — актуальное расписание с учетом подгрупп и замен
- 📅 **Календарь** — годовой график учебного процесса и каникул
- 📰 **Новости** — интеграция с официальным сайтом, ВКонтакте и Telegram
- 🏆 **Олимпиады** — информация о предстоящих олимпиадах
- 📖 **Памятки** — важные документы и правила школы
- 🎓 **Выпускнику** — полезные ресурсы для подготовки к экзаменам

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск приложения

```bash
# Запуск в режиме разработки
npm start

# Запуск на Android
npm run android

# Запуск на iOS
npm run ios

# Запуск в веб-браузере
npm run web
```

### Сборка для продакшена

```bash
# Сборка для Android
npm run build:android

# Сборка APK для предварительного просмотра
npm run build:apk

# Публикация в Google Play
npm run submit:android
```

## 🛠 Технологический стек

### Frontend
- **Framework:** React Native 0.81.4
- **Router:** Expo Router 6.0
- **Navigation:** React Navigation 7.x
- **State Management:** Zustand
- **Storage:** AsyncStorage
- **UI Components:** Custom themed components

### Backend & API
- **Database:** MongoDB Atlas
- **API:** Node.js + Express + Mongoose
- **Production API:** `https://school67-backend.onrender.com/api/v1`

### Tools & Services
- **Platform:** Expo ~54.0.11
- **Build Service:** EAS (Expo Application Services)
- **Package Manager:** npm
- **Version Control:** Git

## 📁 Структура проекта

```
school67/
├── app/                      # Expo Router экраны
│   ├── (tabs)/              # Табовая навигация
│   │   ├── index.tsx        # Расписание (главный экран)
│   │   ├── calendar.tsx     # Календарь и каникулы
│   │   ├── news.tsx         # Новости
│   │   ├── olympiads.tsx    # Олимпиады
│   │   ├── pamphlets.tsx    # Памятки
│   │   └── graduates.tsx    # Выпускникам
│   └── _layout.tsx          # Корневой layout
├── src/
│   ├── components/          # Переиспользуемые компоненты
│   ├── screens/            # Экраны приложения
│   ├── services/           # API сервисы
│   ├── store/              # Zustand store
│   ├── types/              # TypeScript типы
│   ├── data/               # Моковые данные
│   ├── config/             # Конфигурация
│   └── utils/              # Утилиты
├── assets/                 # Изображения, шрифты, иконки
└── app.config.js          # Expo конфигурация
```

## 🎯 Основные функции

### 📚 Расписание
- **Сегодня** — актуальное расписание на текущий день
- **Неделя** — расписание на всю неделю
- **Навигация** — интерактивная карта школы с кабинетами
- **Звонки** — расписание звонков (12 уроков, 08:30-19:00)

### 📅 Календарь
- Годовой график учебного процесса
- Информация о каникулах
- Счетчик дней до следующих каникул

### 📰 Новости
- Новости с официального сайта лицея
- Посты из группы ВКонтакте
- Сообщения из Telegram-канала

### 🏆 Олимпиады
- Связь с olimp74.ru
- Информация о предстоящих олимпиадах

### 📖 Памятки
- Положение о школьной форме
- Правила поведения учащихся
- Памятка по безопасности

### 🎓 Выпускникам
- Прямая ссылка на сайт ФИПИ
- Ресурсы для подготовки к экзаменам

## 🔧 Разработка

### Проверка кода

```bash
# Линтинг
npm run lint

# TypeScript проверка
npx tsc --noEmit
```

### Обновления через OTA

```bash
# Продакшн обновление
npm run update:production

# Превью обновление
npm run update:preview

# Автоматическое обновление
npm run update:auto
```

### Управление версиями

Версия приложения управляется централизованно из трех файлов:

1. `src/config/env.ts` → `VERSION: "X.Y.Z"`
2. `app.config.js` → `VERSION: "X.Y.Z"`
3. `package.json` → `"version": "X.Y.Z"`

При обновлении версии необходимо изменить все три файла.

## 📊 API интеграция

### Базовый URL
```
https://school67-backend.onrender.com/api/v1
```

### Основные эндпоинты

#### Расписание
```
GET /schedule?classId={classCode}&date={YYYY-MM-DD}
GET /schedule/week?classId={classCode}&date={YYYY-MM-DD}
```

#### Здоровье сервиса
```
GET /health
```

### Формат данных

```json
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

## 🎨 UI/UX

- **Тема:** Светлая (планируется Dark Mode)
- **Цветовая схема:** Синие акценты (#007AFF)
- **Типографика:** System fonts для iOS и Android
- **Навигация:** Табовая навигация внизу экрана
- **Адаптивность:** Поддержка различных размеров экранов

## 📱 Поддерживаемые платформы

- ✅ **iOS** — iPhone (iOS 13.4+)
- ✅ **Android** — Смартфоны (Android 6.0+)
- 🔄 **Web** — В разработке

## 🔐 Безопасность

- Конфигурационные файлы с sensitive data исключены из Git
- API ключи хранятся в переменных окружения
- HTTPS для всех API запросов

## 📝 Доступные классы

**5-9 классы:** 5а, 5б, 5в, 6а, 6б, 6в, 7а, 7б, 7в, 8а, 8б, 8в, 9а, 9б, 9в
**10-11 классы:** 10а, 10б, 11а

Каждый класс может иметь подгруппы:
- гуманитарная (гум)
- техническая (техн)
- естественно-научная (е/н)
- информационно-математическая (и-м)
- физико-математическая (ф-м)
- общеобразовательная (о/о)

## 🤝 Вклад в проект

При работе над проектом необходимо:

1. ✅ Запустить `npm run lint` перед коммитом
2. ✅ Убедиться, что `npx tsc --noEmit` проходит без ошибок
3. ✅ Обновить версию приложения при значительных изменениях
4. ✅ Использовать описательные commit messages

### Формат коммитов

```
🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## 📄 Лицензия

Частный проект для Лицея 67, Челябинск

## 📞 Контакты

**Email для обратной связи:** maneev.nikita@gmail.com

---

**Текущая версия:** 1.0.6
**Последнее обновление:** Октябрь 2025
**Статус базы данных:** ✅ MongoDB Atlas
**Статус API:** ✅ Функционирует с реальными данными
