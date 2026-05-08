import type { ERPNotification } from "./ERPNotification";

export class ERPNotificationCenter {
  static notifications(): ERPNotification[] {
    return [
      {
        id: "notif-1",
        title: "Operations stables",
        message: "Les modules principaux fonctionnent normalement.",
        level: "success",
        time: "Maintenant",
      },
      {
        id: "notif-2",
        title: "Validation en attente",
        message: "Des actions metier peuvent necessiter une validation.",
        level: "warning",
        time: "Il y a 5 min",
      },
      {
        id: "notif-3",
        title: "Synchronisation terminee",
        message: "Les donnees operationnelles sont a jour.",
        level: "info",
        time: "Il y a 10 min",
      },
    ];
  }
}