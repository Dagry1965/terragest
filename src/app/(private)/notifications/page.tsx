import { NotificationCenter }
from "@/features/notifications/components/NotificationCenter";

export default function
NotificationsPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Notifications
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Centre de notifications
        </p>
      </div>

      <NotificationCenter />
    </div>
  );
}