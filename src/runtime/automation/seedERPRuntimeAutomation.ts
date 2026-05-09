import {
  ERPAutomationTimelineStore,
} from "./ERPAutomationTimelineStore";

import {
  ERPNotificationCenter,
} from "./ERPNotificationCenter";

export function seedERPRuntimeAutomation() {
  ERPAutomationTimelineStore.addItem({
    id: "automation-1",
    action: "Runtime automation initialized",
    label: "Initialisation automation",
    status: "success",
    createdAt: new Date().toISOString(),
    module: "runtime",
    trigger: "bootstrap",
  });

  ERPNotificationCenter.push({
    id: "notification-1",
    title: "Automation runtime",
    message: "Le runtime automation ERP est initialisé.",
    type: "success",
    createdAt: new Date().toISOString(),
    read: false,
  });
}