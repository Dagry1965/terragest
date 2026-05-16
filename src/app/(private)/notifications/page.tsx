import { ERPNotificationsPanel } from "@/runtime/notifications/ERPNotificationsPanel";

export const dynamic = "force-dynamic";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Notifications
        </h1>

        <p className="mt-2 text-gray-500">
          Centre de notifications runtime ERP.
        </p>
      </div>

      <ERPNotificationsPanel />
    </div>
  );
}