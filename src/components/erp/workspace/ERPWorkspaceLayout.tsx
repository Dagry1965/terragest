import type { ReactNode } from "react";
import type { ERPModule } from "@/runtime/modules";

import { ERPWorkspaceActivity } from "./ERPWorkspaceActivity";
import { ERPWorkspaceCommandCenter } from "./ERPWorkspaceCommandCenter";
import { ERPWorkspaceContextPanel } from "./ERPWorkspaceContextPanel";
import { ERPWorkspaceQuickActions } from "./ERPWorkspaceQuickActions";
import { ERPWorkspaceTabs } from "./ERPWorkspaceTabs";

import { ERPLiveOperationalPanel } from "@/components/erp/live-operational";
import { ERPSmartRuntimePanel } from "@/components/erp/smart-runtime";
import { SmartOperationalIntelligencePanel } from "@/components/erp/smart-intelligence";

interface ERPWorkspaceLayoutProps {
  module: ERPModule;
  children: ReactNode;
}

export function ERPWorkspaceLayout({
  module,
  children,
}: ERPWorkspaceLayoutProps) {
  return (
    <div className="space-y-8">
      <ERPWorkspaceQuickActions module={module} />

      <ERPWorkspaceTabs />

      <ERPLiveOperationalPanel module={module} />

      <ERPSmartRuntimePanel module={module} />

      <SmartOperationalIntelligencePanel module={module} />

      <section className="grid gap-8 2xl:grid-cols-[1fr_380px]">
        <div>{children}</div>

        <aside className="space-y-6">
          <ERPWorkspaceContextPanel module={module} />
          <ERPWorkspaceCommandCenter module={module} />
          <ERPWorkspaceActivity module={module} />
        </aside>
      </section>
    </div>
  );
}