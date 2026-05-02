export interface Organisation {
  id: string;
  nom: string;
  plan: "FREE" | "PRO" | "ENTERPRISE";
  statut: "ACTIVE" | "SUSPENDUE";
  createdAt: string;
}
