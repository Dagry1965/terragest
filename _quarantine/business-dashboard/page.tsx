"use client";

import { AppLayout }
from "@/components/layout/AppLayout";

import { Card }
from "@/components/ui/Card";

export default function BusinessDashboard() {

  return (

    <AppLayout>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        <Card title="Exploitations">

          24

        </Card>

        <Card title="Terrains">

          186

        </Card>

        <Card title="Stocks">

          98%

        </Card>

        <Card title="Interventions">

          42

        </Card>

      </div>

    </AppLayout>
  );
}
