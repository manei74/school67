import { Holiday } from '../types';

// Mock Holidays Data - used as fallback for calendar
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
