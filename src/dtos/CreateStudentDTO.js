import { AppError } from "@/errors/AppError";

export function toCreateStudentDTO(body) {
  const data = body;
  if (!data.name || typeof data.name !== "string") throw new AppError("Name is required", 400);
  if (!data.email || typeof data.email !== "string") throw new AppError("Email is required", 400);
  if (data.gpa === undefined || typeof data.gpa !== "number") throw new AppError("GPA is required and must be a number", 400);
  return { name: data.name.trim(), email: data.email.trim().toLowerCase(), gpa: data.gpa };
}
