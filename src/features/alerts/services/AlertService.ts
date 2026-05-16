export type AlertItem = {
  id: string;

  level:
    | "info"
    | "warning"
    | "critical";

  title: string;

  description: string;
};

export const AlertService = {

  generateProductsAlerts(
    products: any[]
  ): AlertItem[] {

    const alerts: AlertItem[] = [];

    products.forEach(
      (product: any) => {

        const quantity =
          Number(
            product.quantite || 0
          );

        const value =
          Number(
            product.prix || 0
          ) * quantity;

        if (quantity < 5) {

          alerts.push({
            id:
              `${product.id}-stock`,
            level: "warning",
            title:
              "Stock faible",
            description:
              `${product.nom} faible stock`,
          });
        }

        if (!product.actif) {

          alerts.push({
            id:
              `${product.id}-inactive`,
            level: "info",
            title:
              "Produit inactif",
            description:
              `${product.nom} inactif`,
          });
        }

        if (value > 10000) {

          alerts.push({
            id:
              `${product.id}-value`,
            level: "critical",
            title:
              "Valeur élevée",
            description:
              `${product.nom} forte valeur`,
          });
        }
      }
    );

    return alerts;
  },
};