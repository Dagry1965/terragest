// src/app/page.tsx

import { ERPLayout }
from "@/components/layout/ERPLayout";

export default function HomePage() {

  return (

    <ERPLayout>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Stocks
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Maintenance
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Paiements
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Workflows
        </div>
      </div>

    </ERPLayout>
  );
}
