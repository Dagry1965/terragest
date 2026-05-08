// src/app/(private)/platform/page.tsx

import { ERPStatusDashboard } from "@/features/platform-monitoring/components/ERPStatusDashboard";

export default function PlatformPage() {
  return (
    <div className="p-10">
      <ERPStatusDashboard />
    </div>
  );
}