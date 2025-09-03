require('dotenv').config();
const mongoose = require('mongoose');
const { Class, Subject, Teacher, Lesson, BellSchedule } = require('../models');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Class.deleteMany({}),
      Subject.deleteMany({}), 
      Teacher.deleteMany({}),
      Lesson.deleteMany({}),
      BellSchedule.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed Classes
    const classes = [
      { code: '5a', grade: 5, letter: 'а', title: '5А' },
      { code: '5b', grade: 5, letter: 'б', title: '5Б' },
      { code: '5v', grade: 5, letter: 'в', title: '5В' },
      { code: '6a', grade: 6, letter: 'а', title: '6А' },
      { code: '6b', grade: 6, letter: 'б', title: '6Б' },
      { code: '6v', grade: 6, letter: 'в', title: '6В' },
      { code: '7a', grade: 7, letter: 'а', title: '7А' },
      { code: '7b', grade: 7, letter: 'б', title: '7Б' },
      { code: '7v', grade: 7, letter: 'в', title: '7В' },
      { code: '8a', grade: 8, letter: 'а', title: '8А' },
      { code: '8b', grade: 8, letter: 'б', title: '8Б' },
      { code: '8v', grade: 8, letter: 'в', title: '8В' },
      { code: '9a', grade: 9, letter: 'а', title: '9А' },
      { code: '9b', grade: 9, letter: 'б', title: '9Б' },
      { code: '9v', grade: 9, letter: 'в', title: '9В' },
      { code: '10a', grade: 10, letter: 'а', title: '10А' },
      { code: '10b', grade: 10, letter: 'б', title: '10Б' },
      { code: '11a', grade: 11, letter: 'а', title: '11А' }
    ];
    await Class.insertMany(classes);
    console.log(`📚 Created ${classes.length} classes`);

    // Seed Subjects
    const subjects = [
      { name: 'Математика', short: 'Матем.' },
      { name: 'Русский язык', short: 'Русский' },
      { name: 'Литература', short: 'Лит-ра' },
      { name: 'Физика', short: 'Физика' },
      { name: 'Химия', short: 'Химия' },
      { name: 'Биология', short: 'Биология' },
      { name: 'История', short: 'История' },
      { name: 'Обществознание', short: 'Общест.' },
      { name: 'География', short: 'География' },
      { name: 'Английский язык', short: 'Англ.' },
      { name: 'Физическая культура', short: 'Физ-ра' },
      { name: 'Информатика', short: 'Информ.' },
      { name: 'ОБЖ', short: 'ОБЖ' },
      { name: 'Искусство', short: 'Искусство' },
      { name: 'Технология', short: 'Техн.' }
    ];
    const createdSubjects = await Subject.insertMany(subjects);
    console.log(`📖 Created ${subjects.length} subjects`);

    // Seed Teachers
    const teachers = [
      { code: 'teacher001', fullName: 'Иванова Ирина Александровна', shortName: 'Иванова И.А.', extId: 'teacher001' },
      { code: 'teacher002', fullName: 'Петров Петр Петрович', shortName: 'Петров П.П.', extId: 'teacher002' },
      { code: 'teacher003', fullName: 'Сидорова Анна Викторовна', shortName: 'Сидорова А.В.', extId: 'teacher003' },
      { code: 'teacher004', fullName: 'Козлов Михаил Сергеевич', shortName: 'Козлов М.С.', extId: 'teacher004' },
      { code: 'teacher005', fullName: 'Морозова Елена Дмитриевна', shortName: 'Морозова Е.Д.', extId: 'teacher005' },
      { code: 'teacher006', fullName: 'Волков Александр Николаевич', shortName: 'Волков А.Н.', extId: 'teacher006' },
      { code: 'teacher007', fullName: 'Лебедева Татьяна Ивановна', shortName: 'Лебедева Т.И.', extId: 'teacher007' },
      { code: 'teacher008', fullName: 'Новиков Дмитрий Александрович', shortName: 'Новиков Д.А.', extId: 'teacher008' }
    ];
    const createdTeachers = await Teacher.insertMany(teachers);
    console.log(`👨‍🏫 Created ${teachers.length} teachers`);

    // Seed Bell Schedule
    const bellSchedule = {
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
    await BellSchedule.create(bellSchedule);
    console.log('⏰ Created bell schedule');

    // Seed sample lessons for class 7a
    const mathSubject = createdSubjects.find(s => s.name === 'Математика');
    const russianSubject = createdSubjects.find(s => s.name === 'Русский язык');
    const physicsSubject = createdSubjects.find(s => s.name === 'Физика');
    const englishSubject = createdSubjects.find(s => s.name === 'Английский язык');
    const historySubject = createdSubjects.find(s => s.name === 'История');

    const teacher1 = createdTeachers[0];
    const teacher2 = createdTeachers[1]; 
    const teacher3 = createdTeachers[2];
    const teacher4 = createdTeachers[3];
    const teacher5 = createdTeachers[4];

    const sampleLessons = [
      // Monday (weekday: 1)
      { classCode: '7a', weekday: 1, num: 1, subjectId: mathSubject._id, teacherId: teacher1._id, room: '301' },
      { classCode: '7a', weekday: 1, num: 2, subjectId: russianSubject._id, teacherId: teacher2._id, room: '205' },
      { classCode: '7a', weekday: 1, num: 3, subjectId: physicsSubject._id, teacherId: teacher3._id, room: '401', subgroup: 'гум' },
      { classCode: '7a', weekday: 1, num: 3, subjectId: englishSubject._id, teacherId: teacher4._id, room: '208', subgroup: 'техн' },
      { classCode: '7a', weekday: 1, num: 4, subjectId: historySubject._id, teacherId: teacher5._id, room: '302' },

      // Tuesday (weekday: 2)  
      { classCode: '7a', weekday: 2, num: 1, subjectId: physicsSubject._id, teacherId: teacher3._id, room: '401' },
      { classCode: '7a', weekday: 2, num: 2, subjectId: mathSubject._id, teacherId: teacher1._id, room: '301' },
      { classCode: '7a', weekday: 2, num: 3, subjectId: englishSubject._id, teacherId: teacher4._id, room: '208' },
      { classCode: '7a', weekday: 2, num: 4, subjectId: russianSubject._id, teacherId: teacher2._id, room: '205' },

      // Wednesday (weekday: 3)
      { classCode: '7a', weekday: 3, num: 1, subjectId: mathSubject._id, teacherId: teacher1._id, room: '301' },
      { classCode: '7a', weekday: 3, num: 2, subjectId: historySubject._id, teacherId: teacher5._id, room: '302' },
      { classCode: '7a', weekday: 3, num: 3, subjectId: physicsSubject._id, teacherId: teacher3._id, room: '401' },

      // Add lessons for other classes
      { classCode: '8a', weekday: 1, num: 1, subjectId: russianSubject._id, teacherId: teacher2._id, room: '206' },
      { classCode: '8a', weekday: 1, num: 2, subjectId: mathSubject._id, teacherId: teacher1._id, room: '302' },
      { classCode: '9a', weekday: 1, num: 1, subjectId: physicsSubject._id, teacherId: teacher3._id, room: '402' }
    ];

    await Lesson.insertMany(sampleLessons);
    console.log(`📅 Created ${sampleLessons.length} sample lessons`);

    console.log('✅ Database seeded successfully!');
    console.log('🔍 Test the API with: http://localhost:3000/api/v1/schedule?classId=7a&date=2025-09-02');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seed function if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;