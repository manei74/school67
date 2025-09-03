const express = require('express');
const { Lesson, Subject, Teacher, Change, BellSchedule } = require('../models');
const router = express.Router();

// Get daily schedule for a class
router.get('/', async (req, res) => {
  try {
    const { classId, date } = req.query;
    
    if (!classId || !date) {
      return res.status(400).json({ 
        error: 'Missing required parameters: classId and date' 
      });
    }

    // Parse the date
    const requestDate = new Date(date);
    const weekday = requestDate.getDay() === 0 ? 7 : requestDate.getDay(); // Convert Sunday=0 to Sunday=7
    
    console.log(`📅 Getting schedule for class ${classId} on ${date} (weekday: ${weekday})`);

    // Get base lessons for the weekday
    const lessons = await Lesson.find({ 
      classCode: classId, 
      weekday: weekday 
    })
    .populate('subjectId', 'name short')
    .populate('teacherId', 'fullName shortName')
    .sort({ num: 1 });

    // Get schedule changes for this specific date
    const changes = await Change.find({
      classCode: classId,
      date: {
        $gte: new Date(requestDate.setHours(0, 0, 0, 0)),
        $lt: new Date(requestDate.setHours(23, 59, 59, 999))
      }
    })
    .populate('subjectId', 'name short')
    .populate('teacherId', 'fullName shortName');

    // Get bell schedule
    const bellSchedule = await BellSchedule.findOne({ name: 'Стандарт' }) || {
      name: 'Стандарт',
      periods: [
        { num: 1, timeStart: '08:30', timeEnd: '09:10' },
        { num: 2, timeStart: '09:20', timeEnd: '10:00' },
        { num: 3, timeStart: '10:10', timeEnd: '10:50' },
        { num: 4, timeStart: '11:10', timeEnd: '11:50' },
        { num: 5, timeStart: '12:10', timeEnd: '12:50' },
        { num: 6, timeStart: '13:05', timeEnd: '13:45' },
        { num: 7, timeStart: '14:00', timeEnd: '14:40' },
        { num: 8, timeStart: '15:00', timeEnd: '15:40' },
        { num: 9, timeStart: '15:50', timeEnd: '16:30' },
        { num: 10, timeStart: '16:40', timeEnd: '17:20' },
        { num: 11, timeStart: '17:30', timeEnd: '18:10' },
        { num: 12, timeStart: '18:20', timeEnd: '19:00' }
      ]
    };

    // Build the schedule with changes applied
    const scheduleMap = new Map();

    // Add base lessons
    lessons.forEach(lesson => {
      const key = `${lesson.num}-${lesson.subgroup || 'main'}`;
      scheduleMap.set(key, {
        num: lesson.num,
        timeStart: bellSchedule.periods.find(p => p.num === lesson.num)?.timeStart || '00:00',
        timeEnd: bellSchedule.periods.find(p => p.num === lesson.num)?.timeEnd || '00:00',
        parts: [{
          subject: lesson.subjectId?.name || 'Предмет не указан',
          teacher: lesson.teacherId?.shortName || '',
          subgroup: lesson.subgroup,
          room: lesson.room || ''
        }]
      });
    });

    // Apply changes
    changes.forEach(change => {
      const key = `${change.num}-${change.subgroup || 'main'}`;
      
      switch (change.type) {
        case 'cancel':
          scheduleMap.delete(key);
          break;
        case 'replace':
        case 'teacher':
        case 'time':
          const existing = scheduleMap.get(key) || {
            num: change.num,
            timeStart: change.timeStart || bellSchedule.periods.find(p => p.num === change.num)?.timeStart || '00:00',
            timeEnd: change.timeEnd || bellSchedule.periods.find(p => p.num === change.num)?.timeEnd || '00:00',
            parts: []
          };
          
          if (change.type === 'replace' || change.type === 'teacher') {
            existing.parts = [{
              subject: change.subjectId?.name || existing.parts[0]?.subject || 'Предмет не указан',
              teacher: change.teacherId?.shortName || existing.parts[0]?.teacher || '',
              subgroup: change.subgroup || existing.parts[0]?.subgroup,
              room: change.room || existing.parts[0]?.room || ''
            }];
          }
          
          if (change.type === 'time') {
            existing.timeStart = change.timeStart;
            existing.timeEnd = change.timeEnd;
          }
          
          scheduleMap.set(key, existing);
          break;
      }
    });

    // Convert map to array and group by lesson number
    const lessonGroups = new Map();
    Array.from(scheduleMap.values()).forEach(lesson => {
      if (!lessonGroups.has(lesson.num)) {
        lessonGroups.set(lesson.num, {
          num: lesson.num,
          timeStart: lesson.timeStart,
          timeEnd: lesson.timeEnd,
          parts: []
        });
      }
      lessonGroups.get(lesson.num).parts.push(...lesson.parts);
    });

    const finalLessons = Array.from(lessonGroups.values()).sort((a, b) => a.num - b.num);

    const response = {
      date: date,
      classId: classId,
      lessons: finalLessons,
      bellSchedule: { name: bellSchedule.name },
      lastUpdated: new Date().toISOString(),
      etag: `W/"${classId}-${Date.now()}"`
    };

    console.log(`✅ Returning ${finalLessons.length} lessons for ${classId}`);
    res.json(response);

  } catch (error) {
    console.error('❌ Error getting schedule:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

// Get weekly schedule for a class
router.get('/week', async (req, res) => {
  try {
    const { classId, date, week } = req.query;
    
    if (!classId || (!date && !week)) {
      return res.status(400).json({ 
        error: 'Missing required parameters: classId and (date or week)' 
      });
    }

    let startDate;
    if (week) {
      // Parse week format "2025-W36"
      const [year, weekNum] = week.split('-W');
      startDate = getDateOfISOWeek(parseInt(weekNum), parseInt(year));
    } else {
      // Get start of week for given date
      startDate = new Date(date);
      startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)); // Monday
    }

    console.log(`📅 Getting week schedule for class ${classId} starting ${startDate.toISOString().split('T')[0]}`);

    const days = [];
    for (let i = 0; i < 6; i++) { // Monday to Saturday
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Get schedule for this day (reuse the daily schedule logic)
      const dayScheduleReq = { query: { classId, date: dateStr } };
      const dayScheduleRes = {
        json: (data) => data,
        status: () => ({ json: (error) => ({ error }) })
      };
      
      // This is a simplified version - in a real implementation, 
      // you'd refactor the schedule logic into a shared function
      const weekday = currentDate.getDay() === 0 ? 7 : currentDate.getDay();
      
      const lessons = await Lesson.find({ 
        classCode: classId, 
        weekday: weekday 
      })
      .populate('subjectId', 'name short')
      .populate('teacherId', 'fullName shortName')
      .sort({ num: 1 });

      const bellSchedule = await BellSchedule.findOne({ name: 'Стандарт' }) || {
        name: 'Стандарт',
        periods: [
          { num: 1, timeStart: '08:30', timeEnd: '09:10' },
          { num: 2, timeStart: '09:20', timeEnd: '10:00' },
          { num: 3, timeStart: '10:10', timeEnd: '10:50' },
          { num: 4, timeStart: '11:10', timeEnd: '11:50' },
          { num: 5, timeStart: '12:10', timeEnd: '12:50' },
          { num: 6, timeStart: '13:05', timeEnd: '13:45' },
          { num: 7, timeStart: '14:00', timeEnd: '14:40' },
          { num: 8, timeStart: '15:00', timeEnd: '15:40' },
          { num: 9, timeStart: '15:50', timeEnd: '16:30' },
          { num: 10, timeStart: '16:40', timeEnd: '17:20' },
          { num: 11, timeStart: '17:30', timeEnd: '18:10' },
          { num: 12, timeStart: '18:20', timeEnd: '19:00' }
        ]
      };

      const dayLessons = lessons.map(lesson => ({
        num: lesson.num,
        timeStart: bellSchedule.periods.find(p => p.num === lesson.num)?.timeStart || '00:00',
        timeEnd: bellSchedule.periods.find(p => p.num === lesson.num)?.timeEnd || '00:00',
        parts: [{
          subject: lesson.subjectId?.name || 'Предмет не указан',
          teacher: lesson.teacherId?.shortName || '',
          subgroup: lesson.subgroup,
          room: lesson.room || ''
        }]
      }));

      days.push({
        date: dateStr,
        lessons: dayLessons,
        bellSchedule: { name: bellSchedule.name }
      });
    }

    const weekNumber = week || getISOWeek(startDate);
    
    const response = {
      week: weekNumber,
      classId: classId,
      days: days,
      lastUpdated: new Date().toISOString(),
      etag: `W/"${classId}-${Date.now()}"`
    };

    console.log(`✅ Returning week schedule with ${days.length} days for ${classId}`);
    res.json(response);

  } catch (error) {
    console.error('❌ Error getting week schedule:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

// Helper functions for week calculations
function getDateOfISOWeek(w, y) {
  const simple = new Date(y, 0, 1 + (w - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

function getISOWeek(date) {
  const target = new Date(date.valueOf());
  const dayNum = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNum + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

module.exports = router;