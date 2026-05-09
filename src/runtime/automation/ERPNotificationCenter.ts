export interface ERPNotificationItem {
  id: string;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  createdAt: string;
  read?: boolean;
}

export class ERPNotificationCenter {
  private static notifications: ERPNotificationItem[] = [];

  static all() {
    return this.notifications;
  }

  static unread() {
    return this.notifications.filter(
      notification => !notification.read
    );
  }

  static push(notification: ERPNotificationItem) {
    this.notifications.push(notification);
  }

  static markAsRead(id: string) {
    const notification =
      this.notifications.find(item => item.id === id);

    if (notification) {
      notification.read = true;
    }
  }
}