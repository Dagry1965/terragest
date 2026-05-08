import type { ERPAIAssistantMessage } from "./ERPAIAssistantMessage";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function getERPAIAssistantMessages(): ERPAIAssistantMessage[] {
  return [
    {
      id: createId("ai_msg"),
      role: "system",
      content: "AI Runtime Assistant initialise sur le contexte ERP Terragest.",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_msg"),
      role: "assistant",
      content: "Priorite recommandee : brancher la persistance reelle et renforcer les tests RBAC multi-tenant.",
      createdAt: new Date().toISOString(),
    },
  ];
}