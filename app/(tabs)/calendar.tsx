import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

const schoolCalendarData = {
  academicYear: {
    start: "2025-09-01",
    duration: {
      grades2to11: "34 недели",
    },
  },
  terms: {
    grades1to9: [
      {
        name: "1 триместр",
        period: "01.09.2025 – 30.11.2025",
        weeks: "11 недель",
      },
      {
        name: "2 триместр",
        period: "01.12.2025 – 28.02.2026",
        weeks: "11 недель",
      },
      {
        name: "3 триместр",
        period: "01.03.2026 – 31.05.2026",
        weeks: "12 недель",
      },
    ],
    grades10to11: [
      {
        name: "1 семестр",
        period: "01.09.2025 – 31.12.2025",
        weeks: "15 недель",
      },
      {
        name: "2 семестр",
        period: "12.01.2026 – 31.05.2026",
        weeks: "19 недель",
      },
    ],
  },
  holidays: [
    { name: "Осенние каникулы", period: "07.10–12.10.2025", days: "6 дней" },
    { name: "Осенние каникулы", period: "18.11–24.11.2025", days: "6 дней" },
    {
      name: "Зимние каникулы",
      period: "31.12.2025 – 11.01.2026",
      days: "12 дней",
    },
    { name: "Зимние каникулы", period: "22.02–26.02.2026", days: "5 дней" },
    { name: "Весенние каникулы", period: "14.04–19.04.2026", days: "6 дней" },
    { name: "Летние каникулы", period: "01.06–31.08.2026", days: "92 дня" },
  ],
  schedule: {
    workWeek: "5-дневная неделя для всех классов",
    shifts: {
      shift1: {
        start: "08:30",
        classes: [
          "1-е",
          "2а,2б,2г",
          "3а,3б",
          "4а,4б,4в",
          "5-е",
          "6а,6б",
          "7а,7б",
          "8а,8б",
          "9-е",
          "10-е",
          "11-е",
        ],
      },
      shift2: {
        start: "13:05",
        classes: ["2в", "3в", "6в", "7в", "8в"],
      },
    },
    lessonDuration: {
      grade1FirstHalf:
        "35 мин (сентябрь-октябрь: 3 урока, ноябрь-декабрь: 4 урока)",
      grade1SecondHalf: "40 мин (с января: 4 урока)",
      grades2to11: "40 мин",
    },
    timetable: {
      shift1: [
        "1 урок: 08:30–09:10",
        "2 урок: 09:20–10:00",
        "3 урок: 10:10–10:50",
        "4 урок: 11:10–11:50",
        "5 урок: 12:10–12:50",
        "6 урок: 13:05–13:45",
      ],
      shift2: [
        "1 урок: 13:05–13:45",
        "2 урок: 14:00–14:40",
        "3 урок: 15:00–15:40",
        "4 урок: 15:50–16:30",
        "5 урок: 16:40–17:20",
        "6 урок: 17:30–18:10",
        "7 урок: 18:20–19:00",
      ],
    },
  },
  assessment: [
    {
      grades: "5–6 классы",
      type: "метапредметные",
      period: "01.04–07.04.2026",
    },
    { grades: "7 классы", type: "метапредметные", period: "06.03–13.03.2026" },
    {
      grades: "8–9 классы",
      type: "метапредметные",
      period: "26.01–30.01.2026",
    },
    { grades: "10 классы", type: "метапредметные", period: "20.03–27.03.2026" },
    {
      grades: "5–8, 10 кл.",
      type: "промежуточная аттестация",
      period: "01.04–30.05.2026",
    },
    {
      grades: "9, 11 классы",
      type: "итоговая аттестация",
      period: "по срокам Минпросвещения РФ",
    },
  ],
};

export default function CalendarScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [daysUntilHoliday, setDaysUntilHoliday] = useState<number | null>(null);
  const [nextHolidayName, setNextHolidayName] = useState<string>('');
  const [isInHoliday, setIsInHoliday] = useState<boolean>(false);

  useEffect(() => {
    loadCalendarData();
  }, []);

  const parseHolidayDates = (period: string): { start: Date | null, end: Date | null } => {
    // Parse dates like "07.10–12.10.2025" or "31.12.2025 – 11.01.2026"
    
    // Full format with years: "31.12.2025 – 11.01.2026"
    const fullMatch = period.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})\s*[–-]\s*(\d{1,2})\.(\d{1,2})\.(\d{4})/);
    if (fullMatch) {
      const [, startDay, startMonth, startYear, endDay, endMonth, endYear] = fullMatch;
      return {
        start: new Date(parseInt(startYear), parseInt(startMonth) - 1, parseInt(startDay)),
        end: new Date(parseInt(endYear), parseInt(endMonth) - 1, parseInt(endDay))
      };
    }
    
    // Short format: "07.10–12.10.2025"
    const shortMatch = period.match(/(\d{1,2})\.(\d{1,2})[–-](\d{1,2})\.(\d{1,2})\.(\d{4})/);
    if (shortMatch) {
      const [, startDay, startMonth, endDay, endMonth, year] = shortMatch;
      return {
        start: new Date(parseInt(year), parseInt(startMonth) - 1, parseInt(startDay)),
        end: new Date(parseInt(year), parseInt(endMonth) - 1, parseInt(endDay))
      };
    }
    
    return { start: null, end: null };
  };

  const findNextHoliday = () => {
    const today = new Date();
    let nextHoliday = null;
    let minDaysDiff = Infinity;
    let currentHoliday = null;

    for (const holiday of schoolCalendarData.holidays) {
      const { start, end } = parseHolidayDates(holiday.period);
      if (start && end) {
        // Check if we're currently in this holiday
        if (today >= start && today <= end) {
          const timeDiffToEnd = end.getTime() - today.getTime();
          const daysDiffToEnd = Math.ceil(timeDiffToEnd / (1000 * 3600 * 24));
          currentHoliday = {
            name: holiday.name,
            days: daysDiffToEnd,
            isActive: true
          };
          break; // If we're in a holiday, use this one
        }
        
        // Check for next upcoming holiday (start date)
        const timeDiffToStart = start.getTime() - today.getTime();
        const daysDiffToStart = Math.ceil(timeDiffToStart / (1000 * 3600 * 24));
        
        if (daysDiffToStart > 0 && daysDiffToStart < minDaysDiff) {
          minDaysDiff = daysDiffToStart;
          nextHoliday = {
            name: holiday.name,
            days: daysDiffToStart,
            isActive: false
          };
        }
      }
    }
    
    return currentHoliday || nextHoliday;
  };

  const loadCalendarData = async () => {
    const nextHoliday = findNextHoliday();
    
    if (nextHoliday) {
      setDaysUntilHoliday(nextHoliday.days);
      setNextHolidayName(nextHoliday.name);
      setIsInHoliday(nextHoliday.isActive || false);
    } else {
      setDaysUntilHoliday(null);
      setNextHolidayName('');
      setIsInHoliday(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCalendarData();
    setRefreshing(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Календарь</ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Holiday Counter */}
        <ThemedView style={[styles.counterCard, isInHoliday && styles.holidayActiveCard]}>
          <ThemedText type="subtitle" style={styles.counterTitle}>
            {isInHoliday ? 'До конца каникул осталось' : 'До каникул осталось'}
          </ThemedText>
          {daysUntilHoliday !== null ? (
            <>
              <ThemedText type="title" style={[styles.counterNumber, isInHoliday && styles.holidayActiveNumber]}>
                {daysUntilHoliday}{" "}
                {(() => {
                  const lastDigit = daysUntilHoliday % 10;
                  const lastTwoDigits = daysUntilHoliday % 100;

                  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
                    return "дней";
                  } else if (lastDigit === 1) {
                    return "день";
                  } else if (lastDigit >= 2 && lastDigit <= 4) {
                    return "дня";
                  } else {
                    return "дней";
                  }
                })()}
              </ThemedText>
            </>
          ) : (
            <ThemedText style={styles.counterLoading}>Загрузка...</ThemedText>
          )}
        </ThemedView>

        {/* Academic Year Info */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📅 Учебный год 2025–2026
          </ThemedText>
        </ThemedView>

        {/* Terms */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.infoCard}>
            <ThemedText type="defaultSemiBold" style={styles.termTitle}>
              1–9 классы → триместры:
            </ThemedText>
            {schoolCalendarData.terms.grades1to9.map((term, index) => (
              <ThemedView key={index} style={styles.termItem}>
                <ThemedText style={styles.termName}>{term.name}</ThemedText>
                <ThemedText style={styles.termPeriod}>{term.period}</ThemedText>
                <ThemedText style={styles.termWeeks}>({term.weeks})</ThemedText>
              </ThemedView>
            ))}

            <ThemedText
              type="defaultSemiBold"
              style={[styles.termTitle, { marginTop: 16 }]}
            >
              10–11 классы → семестры:
            </ThemedText>
            {schoolCalendarData.terms.grades10to11.map((term, index) => (
              <ThemedView key={index} style={styles.termItem}>
                <ThemedText style={styles.termName}>{term.name}</ThemedText>
                <ThemedText style={styles.termPeriod}>{term.period}</ThemedText>
                <ThemedText style={styles.termWeeks}>({term.weeks})</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Holidays */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📖 Каникулы
          </ThemedText>
          <ThemedView style={styles.holidaysList}>
            {schoolCalendarData.holidays.map((holiday, index) => (
              <ThemedView key={index} style={styles.holidayCard}>
                <ThemedText type="defaultSemiBold" style={styles.holidayTitle}>
                  {holiday.name}
                </ThemedText>
                <ThemedText style={styles.holidayDates}>
                  {holiday.period}
                </ThemedText>
                <ThemedView style={styles.vacationBadge}>
                  <ThemedText style={styles.holidayTypeText}>
                    {holiday.days}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Schedule */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📅 Учебная неделя и сменность
          </ThemedText>
          <ThemedView style={styles.infoCard}>
            <ThemedText style={styles.infoText}>
              <ThemedText type="defaultSemiBold">Учебная неделя:</ThemedText>{" "}
              {schoolCalendarData.schedule.workWeek}
            </ThemedText>

            <ThemedText
              type="defaultSemiBold"
              style={[styles.termTitle, { marginTop: 16 }]}
            >
              ⏰ Сменность:
            </ThemedText>
            <ThemedView style={styles.shiftItem}>
              <ThemedText type="defaultSemiBold" style={styles.shiftTitle}>
                1 смена (начало{" "}
                {schoolCalendarData.schedule.shifts.shift1.start}):
              </ThemedText>
              <ThemedText style={styles.shiftClasses}>
                {schoolCalendarData.schedule.shifts.shift1.classes.join(", ")}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.shiftItem}>
              <ThemedText type="defaultSemiBold" style={styles.shiftTitle}>
                2 смена (начало{" "}
                {schoolCalendarData.schedule.shifts.shift2.start}):
              </ThemedText>
              <ThemedText style={styles.shiftClasses}>
                {schoolCalendarData.schedule.shifts.shift2.classes.join(", ")}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Assessment */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📊 Аттестация
          </ThemedText>
          <ThemedView style={styles.holidaysList}>
            {schoolCalendarData.assessment.map((assessment, index) => (
              <ThemedView key={index} style={styles.assessmentCard}>
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.assessmentGrades}
                >
                  {assessment.grades}
                </ThemedText>
                <ThemedText style={styles.assessmentType}>
                  {assessment.type}
                </ThemedText>
                <ThemedText style={styles.assessmentPeriod}>
                  {assessment.period}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  scrollView: {
    flex: 1,
  },
  counterCard: {
    backgroundColor: "#4CAF50",
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  counterTitle: {
    color: "#FFFFFF",
    marginBottom: 16,
  },
  countdownContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  timeUnit: {
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  counterNumber: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },
  timeLabel: {
    color: "#FFFFFF",
    opacity: 0.9,
    fontSize: 12,
    textAlign: "center",
  },
  counterSubtitle: {
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  counterLoading: {
    color: "#FFFFFF",
    opacity: 0.8,
  },
  holidayNameText: {
    color: "#FFFFFF",
    opacity: 0.9,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
  holidayActiveCard: {
    background: "linear-gradient(135deg, #FF9800, #FFB74D)",
    backgroundColor: "#FF9800", // Fallback for non-gradient support
  },
  holidayActiveNumber: {
    color: "#FFFFFF",
    textShadowColor: "#E65100",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  holidayActiveText: {
    color: "#FFFFFF",
    opacity: 0.95,
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoText: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  infoSubText: {
    marginLeft: 16,
    marginBottom: 4,
    fontSize: 14,
    color: "#666",
  },
  termTitle: {
    marginBottom: 8,
    fontSize: 14,
  },
  termItem: {
    marginLeft: 16,
    marginBottom: 8,
    paddingVertical: 4,
  },
  termName: {
    fontWeight: "600",
    marginBottom: 2,
  },
  termPeriod: {
    color: "#666",
    fontSize: 13,
  },
  termWeeks: {
    color: "#888",
    fontSize: 12,
    fontStyle: "italic",
  },
  shiftItem: {
    marginLeft: 16,
    marginBottom: 12,
  },
  shiftTitle: {
    marginBottom: 4,
    fontSize: 14,
  },
  shiftClasses: {
    color: "#666",
    fontSize: 13,
    lineHeight: 18,
  },
  timetableItem: {
    marginLeft: 16,
    marginBottom: 4,
    fontSize: 13,
    color: "#666",
  },
  assessmentCard: {
    backgroundColor: "#fff3cd",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ffc107",
  },
  assessmentGrades: {
    marginBottom: 4,
    color: "#856404",
  },
  assessmentType: {
    marginBottom: 4,
    fontSize: 14,
    color: "#856404",
  },
  assessmentPeriod: {
    fontSize: 13,
    color: "#6c757d",
  },
  holidaysList: {
    gap: 12,
  },
  holidayCard: {
    backgroundColor: "#e3f2fd",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196f3",
  },
  holidayTitle: {
    marginBottom: 8,
  },
  holidayDates: {
    color: "#666",
    marginBottom: 12,
  },
  holidayTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  vacationBadge: {
    backgroundColor: "#E3F2FD",
  },
  holidayBadge: {
    backgroundColor: "#FFF3E0",
  },
  holidayTypeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
});
