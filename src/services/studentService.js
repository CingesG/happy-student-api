import { studentRepository } from "@/repositories/studentRepository";
import { toStudentResponseDTO } from "@/dtos/StudentResponseDTO";
import { AppError } from "@/errors/AppError";

export const studentService = {
  listStudents() {
    const students = studentRepository.findAll();
    return students.map(toStudentResponseDTO);
  },

  registerStudent(data) {
    if (typeof data.gpa !== "number" || isNaN(data.gpa)) {
      throw new AppError("GPA must be a number", 400);
    }
    if (data.gpa < 0 || data.gpa > 4) {
      throw new AppError("GPA must be between 0 and 4", 400);
    }

    const existing = studentRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError("A student with this email already exists", 409);
    }

    const student = studentRepository.create(data);
    return toStudentResponseDTO(student);
  },

  removeStudent(id) {
    const deleted = studentRepository.deleteById(id);
    if (!deleted) {
      throw new AppError("Student not found", 404);
    }
  },
};
