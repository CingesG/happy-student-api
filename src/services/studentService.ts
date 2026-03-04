import { studentRepository } from "@/repositories/studentRepository";
import type { CreateStudentDTO } from "@/dtos/CreateStudentDTO";
import { toStudentResponseDTO, type StudentResponseDTO } from "@/dtos/StudentResponseDTO";
import { AppError } from "@/errors/AppError";

export const studentService = {
  listStudents(): StudentResponseDTO[] {
    const students = studentRepository.findAll();
    return students.map(toStudentResponseDTO);
  },

  registerStudent(data: CreateStudentDTO): StudentResponseDTO {
    // Business rule: GPA must be 0-4
    if (typeof data.gpa !== "number" || isNaN(data.gpa)) {
      throw new AppError("GPA must be a number", 400);
    }
    if (data.gpa < 0 || data.gpa > 4) {
      throw new AppError("GPA must be between 0 and 4", 400);
    }

    // Duplicate email check
    const existing = studentRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError("A student with this email already exists", 409);
    }

    const student = studentRepository.create(data);
    return toStudentResponseDTO(student);
  },

  removeStudent(id: string): void {
    const deleted = studentRepository.deleteById(id);
    if (!deleted) {
      throw new AppError("Student not found", 404);
    }
  },
};
