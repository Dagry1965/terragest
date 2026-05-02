export const SubscriptionService = {

  getSubscription(
    tenantId: string
  ) {

    return {

      tenantId,

      status:
        "ACTIVE",

      plan:
        "ENTERPRISE",

      renewalDate:
        new Date(),
    };
  },
};
