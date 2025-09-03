const mongoose = require('mongoose');

// Classes Collection Schema
const classSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // "5a", "7a", etc.
  grade: { type: Number, required: true }, // 5, 6, 7, etc.
  letter: { type: String, required: true }, // "a", "b", "v"
  title: { type: String, required: true } // "5А", "7А", etc.
});

// Teachers Collection Schema
const teacherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  shortName: { type: String, required: true },
  extId: String
});

// Subjects Collection Schema
const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  short: String
});

// Lessons Collection Schema
const lessonSchema = new mongoose.Schema({
  classCode: { type: String, required: true },
  weekday: { type: Number, required: true, min: 1, max: 7 },
  num: { type: Number, required: true, min: 1, max: 12 },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  subgroup: String, // "гум", "техн", "е/н", "и-м", "ф-м", "о/о"
  room: String
});

// Bell Schedule Schema
const bellScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  periods: [{
    num: { type: Number, required: true },
    timeStart: { type: String, required: true },
    timeEnd: { type: String, required: true }
  }]
});

// Schedule Changes Schema
const changeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  classCode: { type: String, required: true },
  num: { type: Number, required: true },
  subgroup: String,
  type: { 
    type: String, 
    required: true, 
    enum: ['cancel', 'replace', 'teacher', 'time'] 
  },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  room: String,
  timeStart: String,
  timeEnd: String,
  note: String
});

// Create models
const Class = mongoose.model('Class', classSchema, 'classes');
const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers');
const Subject = mongoose.model('Subject', subjectSchema, 'subjects');
const Lesson = mongoose.model('Lesson', lessonSchema, 'lessons');
const BellSchedule = mongoose.model('BellSchedule', bellScheduleSchema, 'bellschedules');
const Change = mongoose.model('Change', changeSchema, 'changes');

module.exports = {
  Class,
  Teacher,
  Subject,
  Lesson,
  BellSchedule,
  Change
};