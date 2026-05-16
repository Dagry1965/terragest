export const PredictiveEngine = {

  predictStockRisk(
    stock: number
  ) {

    if (
      stock < 20
    ) {

      return {

        risk:
          "HIGH",

        recommendation:
          "Réapprovisionnement immédiat",
      };
    }

    if (
      stock < 50
    ) {

      return {

        risk:
          "MEDIUM",

        recommendation:
          "Surveillance recommandée",
      };
    }

    return {

      risk:
        "LOW",

      recommendation:
        "Stock stable",
    };
  },
};


