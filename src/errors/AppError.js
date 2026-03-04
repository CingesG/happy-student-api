export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export function formatError(error) {
  if (error instanceof AppError) {
    return { message: error.message, statusCode: error.statusCode };
  }
  return { message: "Internal server error", statusCode: 500 };
}
