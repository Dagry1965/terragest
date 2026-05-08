import type { ERPAIRecommendation } from "./ERPAIRecommendation";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function generateERPAIRecommendations(): ERPAIRecommendation[] {
  return [
    {
      id: createId("ai_reco"),
      title: "Renforcer les tests de securite",
      description: "Ajouter des cas RBAC par role, module et tenant avant production.",
      module: "security",
      impact: "high",
      actionLabel: "Ajouter tests RBAC",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_reco"),
      title: "Brancher la persistance Firestore",
      description: "Remplacer progressivement le driver in-memory par un driver Firestore tenant-aware.",
      module: "persistence",
      impact: "high",
      actionLabel: "Activer Firestore driver",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_reco"),
      title: "Activer les streams live reels",
      description: "Connecter le Realtime Gateway a Firebase, WebSocket ou SSE.",
      module: "streams",
      impact: "medium",
      actionLabel: "Connecter live backend",
      createdAt: new Date().toISOString(),
    },
  ];
}