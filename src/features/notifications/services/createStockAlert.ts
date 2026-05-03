import { NotificationService }
from "@/features/notifications/services/NotificationService";

export async function
createStockAlert(
  organizationId: string,
  productName: string
) {

  await NotificationService.create({

    title:
      "Stock faible",

    message:
      `Le stock du produit ${productName} est faible.`,

    severity:
      "warning",

    read: false,

    createdAt:
      new Date().toISOString(),
  });

  return true;
}