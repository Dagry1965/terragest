import { ERPCommandPalette } from "./ERPCommandPalette";
import { ERPNotificationCenter } from "./ERPNotificationCenter";
import { ERPSavedViewsPanel } from "./ERPSavedViewsPanel";
import { ERPWorkspaceSwitcher } from "./ERPWorkspaceSwitcher";

export function ERPEnterpriseOSPanel() {
  return (
    <section className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-4">
      <ERPCommandPalette />
      <ERPNotificationCenter />
      <ERPSavedViewsPanel />
      <ERPWorkspaceSwitcher />
    </section>
  );
}