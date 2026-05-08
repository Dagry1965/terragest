import {
  ERPNotificationCenter,
} from "@/runtime/automation";

export function ERPNotificationsPanel() {

  const notifications =
    ERPNotificationCenter.all();

  return (
    <div className="space-y-4">

      {notifications.map((notification) => (

        <div
          key={notification.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <p className="text-sm font-semibold text-slate-900">
            {notification.title}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {notification.message}
          </p>

        </div>

      ))}

    </div>
  );
}