"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  SaaSOrchestrationService,
} from "@/saas/services/SaaSOrchestrationService";

export default function SaaSDashboard() {

  const [tenant,
    setTenant] =
    useState<any>(null);

  useEffect(() => {

    const result =
      SaaSOrchestrationService.initializeTenant(
        "tenant-enterprise"
      );

    setTenant(
      result
    );

  }, []);

  if (!tenant) {

    return (

      <AppLayout>

        <div className="
          p-10
        ">

          Loading SaaS platform...

        </div>

      </AppLayout>
    );
  }

  return (

    <AppLayout>

      <div className="
        p-10
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          SaaS Infrastructure
        </h1>

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
          space-y-4
        ">

          <p>

            Tenant:
            {tenant.tenant.name}

          </p>

          <p>

            Plan:
            {tenant.subscription.plan}

          </p>

          <p>

            AI Enabled:
            {tenant.features.ai
              ? "YES"
              : "NO"}

          </p>

          <p>

            Realtime:
            {tenant.features.realtime
              ? "YES"
              : "NO"}

          </p>

        </div>

      </div>

    </AppLayout>
  );
}
