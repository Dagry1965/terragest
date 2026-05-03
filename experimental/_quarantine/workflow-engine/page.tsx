"use client";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  WorkflowNotificationCenter,
} from "@/workflow/notifications/WorkflowNotificationCenter";

export default function WorkflowDashboard() {

  return (

    <AppLayout>

      <WorkflowNotificationCenter />

      <div className="
        p-10
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Workflow Engine
        </h1>

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
        ">

          <p className="
            text-lg
          ">

            Event-driven enterprise
            workflow platform active.

          </p>

        </div>

      </div>

    </AppLayout>
  );
}
