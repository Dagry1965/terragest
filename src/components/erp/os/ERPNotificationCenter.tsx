import { ERPBadge } from "@/components/erp/ui";
import { ERPNotificationCenter as NotificationRuntime } from "@/runtime/os-enterprise";

export function ERPNotificationCenter() {
  const notifications = NotificationRuntime.notifications();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Notifications
          </h2>
          <p className="text-sm text-slate-500">
            Signaux importants de la plateforme.
          </p>
        </div>

        <ERPBadge tone="info">{notifications.length}</ERPBadge>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">
                  {notification.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {notification.message}
                </p>
              </div>

              <ERPBadge tone={notification.level}>
                {notification.time}
              </ERPBadge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}