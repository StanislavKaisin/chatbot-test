export enum Subject {
  biology = "Biology",
  math = "Math",
  physics = "Physics",
  chemistry = "Chemistry",
}

export enum Sex {
  Male,
  Female,
}

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  subject: Subject;
  canTeachSubjects: Subject[];
  age: number;
  yearsOfExperience: number;
  workedInUniversities: boolean;
  sex: Sex;
}

export interface Lesson {
  id: string;
  subject: Subject;
  course: string;
  name: string;
  number: number;
}

export enum CourseLessons {
  lesson1,
  lesson2,
  lesson3,
}

export interface Course {
  id: string;
  subject: Subject;
  theme: string;
  courseLessons: CourseLessons;
  teacher: Teacher;
}

export enum timeSchedule {
  lecture1 = "08:30 - 09:50",
  lecture2 = "10:00 - 11:20",
  lecture3 = "11:30 - 12:50",
  lecture4 = "13:00 - 14:30",
  lecture5 = "14:40 - 16:00",
  lecture6 = "16:00 - 17:20",
}

export enum StudentsGroup {
  studentsGroup1,
  studentsGroup2,
  studentsGroup3,
}

export interface Schedule {
  classroom: Classroom;
  time: timeSchedule;
  subject: Subject;
  teacher: Teacher;
  studentsGroup: StudentsGroup;
}

export interface Classroom {
  number: number;
  suitableFor: Subject;
}
