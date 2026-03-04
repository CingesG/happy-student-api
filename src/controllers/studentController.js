import { studentService } from "@/services/studentService";
import { toCreateStudentDTO } from "@/dtos/CreateStudentDTO";
import { formatError } from "@/errors/AppError";

export const studentController = {
  getStudents() {
    try {
      const students = studentService.listStudents();
      return { data: students, status: 200 };
    } catch (err) {
      const error = formatError(err);
      return { error, status: error.statusCode };
    }
  },

  createStudent(body) {
    try {
      const dto = toCreateStudentDTO(body);
      const student = studentService.registerStudent(dto);
      return { data: student, status: 201 };
    } catch (err) {
      const error = formatError(err);
      return { error, status: error.statusCode };
    }
  },

  deleteStudent(id) {
    try {
      studentService.removeStudent(id);
      return { data: { message: "Student deleted successfully" }, status: 200 };
    } catch (err) {
      const error = formatError(err);
      return { error, status: error.statusCode };
    }
  },
};
