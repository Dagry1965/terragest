import { BillingPlans }
from "@/features/billing/components/BillingPlans";

export default function BillingPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Billing
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Plans et abonnements
        </p>
      </div>

      <BillingPlans />
    </div>
  );
}