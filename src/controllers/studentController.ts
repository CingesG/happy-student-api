import { studentService } from "@/services/studentService";
import { toCreateStudentDTO } from "@/dtos/CreateStudentDTO";
import { formatError, type ErrorResponse } from "@/errors/AppError";
import type { StudentResponseDTO } from "@/dtos/StudentResponseDTO";

interface ApiResponse<T> {
  data?: T;
  error?: ErrorResponse;
  status: number;
}

export const studentController = {
  getStudents(): ApiResponse<StudentResponseDTO[]> {
    try {
      const students = studentService.listStudents();
      return { data: students, status: 200 };
    } catch (err) {
      const error = formatError(err);
      return { error, status: error.statusCode };
    }
  },

  createStudent(body: unknown): ApiResponse<StudentResponseDTO> {
    try {
      const dto = toCreateStudentDTO(body);
      const student = studentService.registerStudent(dto);
      return { data: student, status: 201 };
    } catch (err) {
      const error = formatError(err);
      return { error, status: error.statusCode };
    }
  },

  deleteStudent(id: string): ApiResponse<{ message: string }> {
    try {
      studentService.removeStudent(id);
      return { data: { message: "Student deleted successfully" }, status: 200 };
    } catch (err) {
      const error = formatError(err);
      return { error, status: error.statusCode };
    }
  },
};
