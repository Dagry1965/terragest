import {
  CheckoutPlan,
  CheckoutSession,
} from "@/features/payments/types/Checkout";

export const PaymentService = {

  async createCheckout(
    plan: CheckoutPlan
  ): Promise<CheckoutSession> {

    // MOCK STRIPE SESSION

    return {
      url:
        "/billing/success",
      plan,
    };
  },
};