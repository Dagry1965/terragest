export const BillingEngine = {

  calculateMonthlyCost(
    users: number,
    plan: string
  ) {

    let base = 0;

    switch (plan) {

      case "PRO":
        base = 99;
        break;

      case "ENTERPRISE":
        base = 299;
        break;

      default:
        base = 29;
    }

    return base + (
      users * 5
    );
  },
};
