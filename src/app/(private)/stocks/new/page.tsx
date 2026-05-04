// src/app/(private)/stocks/new/page.tsx

import { ERPLayout }
from "@/components/layout/ERPLayout";

import { StockForm }
from "@/components/stock/StockForm";

export default function NewStockPage() {

  return (

    <ERPLayout>

      <div
        className="
          max-w-2xl
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Nouveau stock
        </h1>

        <StockForm />

      </div>

    </ERPLayout>
  );
}
