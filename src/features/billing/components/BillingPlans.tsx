"use client";

import { CheckoutButton }
from "@/features/payments/components/CheckoutButton";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "0â‚¬",
    features: [
      "3 utilisateurs",
      "CRUD standard",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "49â‚¬",
    features: [
      "25 utilisateurs",
      "Analytics",
      "Temps réel",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sur devis",
    features: [
      "Illimité",
      "Multi-tenant",
      "Support premium",
    ],
  },
];

export const BillingPlans =
() => {

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
    >
      {plans.map((plan) => (

        <div
          key={plan.id}
          className="
            border
            rounded-2xl
            p-6
            bg-white
          "
        >
          <div
            className="
              space-y-4
            "
          >
            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {plan.name}
              </h2>

              <p
                className="
                  text-3xl
                  font-bold
                  mt-2
                "
              >
                {plan.price}
              </p>
            </div>

            <ul
              className="
                space-y-2
              "
            >
              {plan.features.map(
                (feature) => (

                <li
                  key={feature}
                  className="
                    text-gray-600
                  "
                >
                  â€¢ {feature}
                </li>
              ))}
            </ul>

            <CheckoutButton
              plan={plan.id as any}
            />
          </div>
        </div>
      ))}
    </div>
  );
};