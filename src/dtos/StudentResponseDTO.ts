import type { Student } from "@/types/Student";

export interface StudentResponseDTO {
  id: string;
  name: string;
  email: string;
  gpa: number;
}

export function toStudentResponseDTO(student: Student): StudentResponseDTO {
  return {
    id: student.id,
    name: student.name,
    email: student.email,
    gpa: student.gpa,
  };
}
