export function toStudentResponseDTO(student) {
  return {
    id: student.id,
    name: student.name,
    email: student.email,
    gpa: student.gpa,
  };
}
