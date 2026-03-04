import type { Student } from "@/types/Student";

// In-memory mock database
let students: Student[] = [
  { id: "1", name: "Bat-Erdene", email: "baterdene@example.com", gpa: 3.8, createdAt: new Date().toISOString() },
  { id: "2", name: "Solongo", email: "solongo@example.com", gpa: 3.5, createdAt: new Date().toISOString() },
  { id: "3", name: "Temuulen", email: "temuulen@example.com", gpa: 2.9, createdAt: new Date().toISOString() },
];

let nextId = 4;

export const studentRepository = {
  findAll(): Student[] {
    return [...students];
  },

  findByEmail(email: string): Student | undefined {
    return students.find((s) => s.email === email.toLowerCase());
  },

  create(data: { name: string; email: string; gpa: number }): Student {
    const student: Student = {
      id: String(nextId++),
      name: data.name,
      email: data.email,
      gpa: data.gpa,
      createdAt: new Date().toISOString(),
    };
    students.push(student);
    return student;
  },

  deleteById(id: string): boolean {
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return false;
    students.splice(index, 1);
    return true;
  },
};
