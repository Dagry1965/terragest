export type ERPAIAssistantMessage = {
  id: string;
  role: "assistant" | "system";
  content: string;
  createdAt: string;
};