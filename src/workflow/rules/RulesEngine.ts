export const RulesEngine = {

  evaluateStock(
    stock: number
  ) {

    if (
      stock < 50
    ) {

      return {

        alert: true,

        level:
          "HIGH",
      };
    }

    return {

      alert: false,
    };
  },
};
