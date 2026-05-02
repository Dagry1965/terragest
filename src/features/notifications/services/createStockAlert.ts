import { NotificationService } from "@/features/notifications/services/NotificationService";

export const createStockAlert =
  async (
    organisationId: string,
    produit: any
  ) => {

    if (
      produit.stockActuel >
      produit.seuilAlerte
    ) {
      return;
    }

    await NotificationService.create({

      organisationId,

      titre: "Stock faible",

      message:
        `${produit.nom} est sous le seuil d'alerte`,

      type: "STOCK_FAIBLE",

      lu: false,

      metadata: {
        produitId: produit.id,
      },

      createdAt:
        new Date().toISOString(),
    });
  };
