import {
  Notification,
} from "@/features/notifications/types/Notification";

const mockNotifications:
Notification[] = [
  {
    id: "1",

    title:
      "Stock faible",

    message:
      "Le stock engrais est faible.",

    severity:
      "warning",

    read: false,

    createdAt:
      new Date().toISOString(),
  },

  {
    id: "2",

    title:
      "Synchronisation réussie",

    message:
      "Les données offline sont synchronisées.",

    severity:
      "success",

    read: false,

    createdAt:
      new Date().toISOString(),
  },
];

export const NotificationService = {

  async getNotifications():
  Promise<Notification[]> {

    return mockNotifications;
  },

  async create(
    notification: Notification
  ) {

    mockNotifications.unshift({
      ...notification,

      id:
        crypto.randomUUID(),

      createdAt:
        new Date().toISOString(),
    });

    return true;
  },
};