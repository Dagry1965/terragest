import {
  CheckoutPlan,
  CheckoutSession,
} from "@/features/payments/types/Checkout";

export const PaymentService = {

  async createCheckout(
    plan: CheckoutPlan
  ): Promise<CheckoutSession> {

    const response =
      await fetch(
        "/api/stripe/checkout",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            plan,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error
      );
    }

    return {
      url: data.url,
      plan,
    };
  },
};