import { Class, Schedule, NewsItem, Olympiad, Holiday, Bell, Lesson } from '../types';

console.log('📊 Mock data file loading');

// Mock Classes Data
export const MOCK_CLASSES: Class[] = [
  { id: '7А', title: '7А' },
  { id: '7Б', title: '7Б' },
  { id: '7В', title: '7В' },
  { id: '8А', title: '8А' },
  { id: '8Б', title: '8Б' },
  { id: '8В', title: '8В' },
  { id: '9А', title: '9А' },
  { id: '9Б', title: '9Б' },
  { id: '9В', title: '9В' },
  { id: '10А', title: '10А' },
  { id: '10Б', title: '10Б' },
  { id: '11А', title: '11А' },
  { id: '11Б', title: '11Б' },
];

// Mock Teachers Data
export const MOCK_TEACHERS = [
  'Иванова И.А.',
  'Петрова М.С.',
  'Сидоров А.В.',
  'Кузнецова Е.П.',
  'Смирнова О.Н.',
  'Морозов В.И.',
  'Волкова Т.Р.',
  'Соколова Н.В.',
  'Лебедев П.К.',
  'Козлова Л.М.',
  'Новиков С.А.',
  'Федорова Е.В.',
  'Михайлов Д.И.',
  'Андреева Г.С.',
  'Павлов Н.П.'
];

// Mock Subjects Data
export const MOCK_SUBJECTS = [
  'Математика',
  'Русский язык',
  'Литература',
  'История',
  'Обществознание',
  'География',
  'Биология',
  'Химия',
  'Физика',
  'Английский язык',
  'Информатика',
  'ОБЖ',
  'Физическая культура',
  'Музыка',
  'ИЗО',
  'Технология'
];

// Mock Rooms Data
const ROOMS = [
  '101', '102', '103', '105', '107', '108', '110', '112',
  '201', '202', '203', '205', '207', '208', '210', '212',
  '301', '302', '303', '305', '307', '308', '310', '312',
  '401', '402', '403', '405', '407', '408', '410', '412',
  'Спортзал', 'Актовый зал', 'Библиотека', 'Мастерская'
];

// Bell Schedule
export const MOCK_BELLS: Bell[] = [
  { num: 1, timeStart: '08:30', timeEnd: '09:15', type: 'lesson' },
  { num: 1, timeStart: '09:15', timeEnd: '09:25', type: 'break' },
  { num: 2, timeStart: '09:25', timeEnd: '10:10', type: 'lesson' },
  { num: 2, timeStart: '10:10', timeEnd: '10:25', type: 'break' },
  { num: 3, timeStart: '10:25', timeEnd: '11:10', type: 'lesson' },
  { num: 3, timeStart: '11:10', timeEnd: '11:25', type: 'break' },
  { num: 4, timeStart: '11:25', timeEnd: '12:10', type: 'lesson' },
  { num: 4, timeStart: '12:10', timeEnd: '12:25', type: 'break' },
  { num: 5, timeStart: '12:25', timeEnd: '13:10', type: 'lesson' },
  { num: 5, timeStart: '13:10', timeEnd: '13:25', type: 'break' },
  { num: 6, timeStart: '13:25', timeEnd: '14:10', type: 'lesson' },
  { num: 6, timeStart: '14:10', timeEnd: '14:20', type: 'break' },
  { num: 7, timeStart: '14:20', timeEnd: '15:05', type: 'lesson' },
];

// Generate realistic lessons for different classes
const generateLessons = (classId: string, dayOffset: number = 0): Lesson[] => {
  const lessons: Lesson[] = [];
  const bellTimes = MOCK_BELLS.filter(bell => bell.type === 'lesson');
  
  // Different lesson patterns for different grades
  const isHighSchool = classId.startsWith('10') || classId.startsWith('11');
  const isMiddleSchool = classId.startsWith('8') || classId.startsWith('9');
  
  let subjectsForToday: string[] = [];
  
  if (isHighSchool) {
    // High school subjects (more specialized)
    subjectsForToday = [
      'Математика',
      'Русский язык',
      'Литература',
      'История',
      'Английский язык',
      'Физика',
      'Химия'
    ];
  } else if (isMiddleSchool) {
    subjectsForToday = [
      'Математика',
      'Русский язык',
      'География',
      'Биология',
      'История',
      'Английский язык',
      'Физическая культура'
    ];
  } else {
    // 7th grade subjects
    subjectsForToday = [
      'Математика',
      'Русский язык',
      'Литература',
      'История',
      'География',
      'Биология',
      'Физическая культура'
    ];
  }

  // Adjust subjects based on day of week
  const dayOfWeek = (new Date().getDay() + dayOffset) % 7;
  if (dayOfWeek === 1) { // Monday - more core subjects
    subjectsForToday = subjectsForToday.slice(0, 6);
  } else if (dayOfWeek === 5) { // Friday - lighter schedule
    subjectsForToday = [...subjectsForToday.slice(0, 4), 'Физическая культура', 'ИЗО'];
  }

  subjectsForToday.forEach((subject, index) => {
    if (index < bellTimes.length) {
      const bell = bellTimes[index];
      lessons.push({
        num: bell.num,
        timeStart: bell.timeStart,
        timeEnd: bell.timeEnd,
        parts: [{
          subject,
          subjectShort: subject.substring(0, 8),
          teacher: MOCK_TEACHERS[Math.floor(Math.random() * MOCK_TEACHERS.length)],
          room: ROOMS[Math.floor(Math.random() * ROOMS.length)]
        }],
        subject,
        room: ROOMS[Math.floor(Math.random() * ROOMS.length)],
        teacher: MOCK_TEACHERS[Math.floor(Math.random() * MOCK_TEACHERS.length)]
      });
    }
  });

  return lessons;
};

// Generate schedule for a specific date and class
export const generateScheduleForDate = (classId: string, date: string): Schedule => {
  const targetDate = new Date(date);
  const today = new Date();
  const daysDiff = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  return {
    date,
    classId,
    classCode: classId,
    weekday: targetDate.getDay() === 0 ? 7 : targetDate.getDay(),
    isSchoolDay: targetDate.getDay() >= 1 && targetDate.getDay() <= 6,
    lessons: generateLessons(classId, daysDiff),
    lastUpdated: new Date().toISOString(),
  };
};

// Mock News Data
export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Начало нового учебного года 2025-2026',
    content: 'Поздравляем всех учеников, родителей и преподавателей с началом нового учебного года! Желаем успехов в учебе, новых открытий и достижений. В этом году нас ждет много интересных мероприятий и проектов.',
    date: '2025-08-27',
    source: 'site',
    link: 'https://lyceum67.ru/news/new-year-2025'
  },
  {
    id: '2',
    title: 'Общешкольное родительское собрание',
    content: 'Приглашаем родителей всех учащихся на общешкольное собрание, которое состоится 30 августа в 18:00 в актовом зале. Будут рассмотрены вопросы организации учебного процесса, питания и внеурочной деятельности.',
    date: '2025-08-26',
    source: 'vk',
    link: 'https://vk.com/lyceum67'
  },
  {
    id: '3',
    title: 'Запись в кружки и секции',
    content: 'Началась запись в кружки и спортивные секции на новый учебный год. Доступны: робототехника, шахматы, волейбол, баскетбол, театральный кружок и многое другое. Записаться можно в кабинете 205.',
    date: '2025-08-25',
    source: 'site',
    link: 'https://lyceum67.ru/extracurricular'
  },
  {
    id: '4',
    title: 'Школьная форма - важное напоминание',
    content: 'Напоминаем о требованиях к школьной форме: темно-синий низ, белый верх для повседневной формы. Для торжественных мероприятий - белая рубашка и темный жилет/пиджак.',
    date: '2025-08-24',
    source: 'telegram',
  },
  {
    id: '5',
    title: 'Результаты ЕГЭ 2025 - поздравляем выпускников!',
    content: 'Наши выпускники показали отличные результаты на ЕГЭ 2025! Средний балл по математике - 78, по русскому языку - 82. 15 выпускников набрали более 90 баллов. Поздравляем!',
    date: '2025-08-23',
    source: 'site',
    link: 'https://lyceum67.ru/news/ege-results-2025'
  },
  {
    id: '6',
    title: 'График работы столовой',
    content: 'Столовая работает с 8:00 до 15:30. Горячие завтраки с 8:00 до 9:00, обеды с 11:30 до 14:00. В меню всегда есть первое, второе блюдо, салат и напиток.',
    date: '2025-08-22',
    source: 'vk'
  },
  {
    id: '7',
    title: 'День знаний - программа мероприятий',
    content: '1 сентября в 9:00 - торжественная линейка во дворе школы. Затем классные часы "Россия - мои горизонты". Для 1-х классов - экскурсия по школе.',
    date: '2025-08-21',
    source: 'telegram'
  },
  {
    id: '8',
    title: 'Библиотека пополнилась новыми учебниками',
    content: 'В школьную библиотеку поступили новые учебники на 2025-2026 учебный год. Выдача учебников будет проходить с 28 августа по 3 сентября по графику.',
    date: '2025-08-20',
    source: 'site',
    link: 'https://lyceum67.ru/library'
  }
];

// Mock Olympiads Data
export const MOCK_OLYMPIADS: Olympiad[] = [
  {
    id: '1',
    title: 'Всероссийская олимпиада школьников по математике (школьный этап)',
    subject: 'Математика',
    dateTimeStart: '2025-09-15T14:00:00Z',
    location: 'Кабинет 302',
    stage: 'школьный',
    classId: '9А',
    link: 'https://olimp74.ru/math'
  },
  {
    id: '2',
    title: 'Региональная олимпиада по физике',
    subject: 'Физика',
    dateTimeStart: '2025-09-20T15:00:00Z',
    location: 'Кабинет 401',
    stage: 'региональный'
  },
  {
    id: '3',
    title: 'Олимпиада "Русский медвежонок"',
    subject: 'Русский язык',
    dateTimeStart: '2025-11-14T13:00:00Z',
    location: 'Актовый зал',
    stage: 'всероссийский',
    link: 'https://rm.kirov.ru/'
  },
  {
    id: '4',
    title: 'Всероссийская олимпиада по истории (школьный этап)',
    subject: 'История',
    dateTimeStart: '2025-10-03T14:00:00Z',
    location: 'Кабинет 203',
    stage: 'школьный',
    classId: '10А'
  },
  {
    id: '5',
    title: 'Олимпиада "Кенгуру" по математике',
    subject: 'Математика',
    dateTimeStart: '2025-03-20T12:00:00Z',
    location: 'Актовый зал',
    stage: 'международный'
  },
  {
    id: '6',
    title: 'Всероссийская олимпиада по английскому языку',
    subject: 'Английский язык',
    dateTimeStart: '2025-10-10T15:30:00Z',
    location: 'Кабинет 208',
    stage: 'школьный',
    classId: '11Б'
  },
  {
    id: '7',
    title: 'Олимпиада по информатике "Bebras"',
    subject: 'Информатика',
    dateTimeStart: '2025-11-25T14:00:00Z',
    location: 'Компьютерный класс',
    stage: 'международный'
  },
  {
    id: '8',
    title: 'Всероссийская олимпиада по биологии',
    subject: 'Биология',
    dateTimeStart: '2025-09-28T13:30:00Z',
    location: 'Кабинет 305',
    stage: 'школьный',
    classId: '8Б'
  }
];

// Mock Holidays Data
export const MOCK_HOLIDAYS: Holiday[] = [
  {
    id: '1',
    title: 'Осенние каникулы',
    startDate: '2025-10-28',
    endDate: '2025-11-05',
    type: 'vacation'
  },
  {
    id: '2',
    title: 'Зимние каникулы',
    startDate: '2025-12-28',
    endDate: '2026-01-12',
    type: 'vacation'
  },
  {
    id: '3',
    title: 'Весенние каникулы',
    startDate: '2026-03-23',
    endDate: '2026-03-31',
    type: 'vacation'
  },
  {
    id: '4',
    title: 'Летние каникулы',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    type: 'vacation'
  },
  {
    id: '5',
    title: 'День учителя',
    startDate: '2025-10-05',
    endDate: '2025-10-05',
    type: 'holiday'
  },
  {
    id: '6',
    title: 'День народного единства',
    startDate: '2025-11-04',
    endDate: '2025-11-04',
    type: 'holiday'
  },
  {
    id: '7',
    title: 'Новогодние праздники',
    startDate: '2025-12-31',
    endDate: '2026-01-08',
    type: 'holiday'
  },
  {
    id: '8',
    title: 'День защитника Отечества',
    startDate: '2026-02-23',
    endDate: '2026-02-23',
    type: 'holiday'
  },
  {
    id: '9',
    title: 'Международный женский день',
    startDate: '2026-03-08',
    endDate: '2026-03-08',
    type: 'holiday'
  },
  {
    id: '10',
    title: 'День Победы',
    startDate: '2026-05-09',
    endDate: '2026-05-09',
    type: 'holiday'
  }
];

// Helper function to get current week schedule
export const generateWeekSchedule = (classId: string, week: string): Schedule[] => {
  const schedules: Schedule[] = [];
  const startDate = new Date(); // Current week for simplicity
  
  // Generate Monday to Friday schedules
  for (let i = 0; i < 5; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - startDate.getDay() + 1 + i); // Monday + i
    
    schedules.push(generateScheduleForDate(classId, date.toISOString().split('T')[0]));
  }
  
  return schedules;
};

// Helper function to get next holiday
export const getNextHoliday = (): Holiday | null => {
  const now = new Date();
  const futureHolidays = MOCK_HOLIDAYS.filter(
    holiday => new Date(holiday.startDate) > now
  );
  
  futureHolidays.sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  return futureHolidays[0] || null;
};