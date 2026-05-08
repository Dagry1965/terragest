// src/platform/notifications/NotificationBus.ts

export class NotificationBus {

  static success(message: string) {

    console.log(
      "[SUCCESS]",
      message
    );
  }

  static warning(message: string) {

    console.log(
      "[WARNING]",
      message
    );
  }

  static error(message: string) {

    console.log(
      "[ERROR]",
      message
    );
  }

  static info(message: string) {

    console.log(
      "[INFO]",
      message
    );
  }
}
