import { PWAInstallButton }
from "@/features/pwa/components/PWAInstallButton";

import { OfflineStatusCard }
from "@/features/pwa/components/OfflineStatusCard";

export default function PWAPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            PWA & Offline
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Mobile et synchronisation
          </p>
        </div>

        <PWAInstallButton />
      </div>

      <OfflineStatusCard />
    </div>
  );
}