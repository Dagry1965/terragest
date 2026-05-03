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
          "RÃ©approvisionnement immÃ©diat",
      };
    }

    if (
      stock < 50
    ) {

      return {

        risk:
          "MEDIUM",

        recommendation:
          "Surveillance recommandÃ©e",
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


