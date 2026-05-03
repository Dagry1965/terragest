"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  DataOrchestrationService,
} from "@/data-platform/services/DataOrchestrationService";

export default function DataPlatformDashboard() {

  const [result,
    setResult] =
    useState<any>(null);

  useEffect(() => {

    const load =
      async () => {

        const response =
          await DataOrchestrationService.processBusinessData({

            history:
              [10, 20, 40],

            revenue:
              120000,
          });

        setResult(
          response
        );
      };

    load();

  }, []);

  if (!result) {

    return (

      <AppLayout>

        <div className="
          p-10
        ">

          Loading data platform...

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
          Enterprise Data Platform
        </h1>

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
          space-y-4
        ">

          {result.insights.map(
            (
              insight: string
            ) => (

              <div
                key={insight}
              >

                {insight}

              </div>

            )
          )}

        </div>

      </div>

    </AppLayout>
  );
}
