"use client";

import {
  useState,
} from "react";

import {
  CheckoutPlan,
} from "@/features/payments/types/Checkout";

import { PaymentService }
from "@/features/payments/services/PaymentService";

type Props = {

  plan: CheckoutPlan;
};

export const CheckoutButton = ({
  plan,
}: Props) => {

  const [loading, setLoading] =
    useState(false);

  async function handleCheckout() {

    try {

      setLoading(true);

      const session =
        await PaymentService
          .createCheckout(
            plan
          );

      window.location.href =
        session.url;

    } finally {

      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="
        w-full
        bg-black
        text-white
        py-3
        rounded-xl
      "
    >
      {
        loading
          ? "Chargement..."
          : "Choisir"
      }
    </button>
  );
};