// src/platform/observability/ERPLogger.ts

export class ERPLogger {

  static info(
    message: string,
    payload?: unknown
  ) {

    console.log(
      "[INFO]",
      message,
      payload
    );
  }

  static warn(
    message: string,
    payload?: unknown
  ) {

    console.warn(
      "[WARN]",
      message,
      payload
    );
  }

  static error(
    message: string,
    payload?: unknown
  ) {

    console.error(
      "[ERROR]",
      message,
      payload
    );
  }
}