import { BaseError } from "./BaseError";

export class AppError extends BaseError {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message);
  }
}
