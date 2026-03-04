export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export function formatError(error: unknown): ErrorResponse {
  if (error instanceof AppError) {
    return { message: error.message, statusCode: error.statusCode };
  }
  return { message: "Internal server error", statusCode: 500 };
}
