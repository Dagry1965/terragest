import { AppError } from "@/shared/errors/AppError";

export const ErrorHandler = {

  handle(
    error: any
  ) {

    console.error(error);

    if (
      error instanceof AppError
    ) {

      return {

        success: false,

        message:
          error.message,

        code:
          error.code,
      };
    }

    return {

      success: false,

      message:
        "Internal server error",
    };
  },
};
