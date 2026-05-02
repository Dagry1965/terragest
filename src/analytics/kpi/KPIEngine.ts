export const KPIEngine = {

  calculateRevenue(
    transactions: any[]
  ) {

    return transactions.reduce(

      (
        total,
        item
      ) =>

        total + (
          item.amount || 0
        ),

      0
    );
  },

  calculateStockRate(
    products: any[]
  ) {

    if (
      products.length === 0
    ) {

      return 0;
    }

    const available =
      products.filter(
        (
          product
        ) =>

          product.stock > 0
      );

    return Math.round(

      (
        available.length /
        products.length
      ) * 100
    );
  },
};
