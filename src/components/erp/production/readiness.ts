// src/runtime/production/readiness.ts

export type ProductionCheck = {
  id: string;
  label: string;
  ok: boolean;
  details?: string;
};

export const ProductionReadiness = {
  checks(): ProductionCheck[] {
    return [
      {
        id: "firebase",
        label: "Connexion Firebase",
        ok: true,
      },
      {
        id: "auth",
        label: "Authentification opérationnelle",
        ok: true,
      },
      {
        id: "firestore",
        label: "Accès Firestore",
        ok: false,
        details: "Impossible de lire la collection 'settings'.",
      },
      {
        id: "storage",
        label: "Firebase Storage",
        ok: true,
      },
      {
        id: "runtime",
        label: "Runtime Next.js",
        ok: true,
      },
    ];
  },
};
