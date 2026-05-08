export type ERPNotification = {

  id: string;

  title: string;

  message: string;

  timestamp: string;
};

class ERPNotificationCenterClass {

  private notifications:
    ERPNotification[] = [];

  push(
    notification: ERPNotification
  ) {

    this.notifications.unshift(
      notification
    );

    this.notifications =
      this.notifications.slice(0, 100);
  }

  all() {

    return this.notifications;
  }
}

export const ERPNotificationCenter =
  new ERPNotificationCenterClass();