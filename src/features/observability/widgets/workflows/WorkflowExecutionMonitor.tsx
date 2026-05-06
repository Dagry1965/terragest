"use client";

import {
  useEffect,
  useSyncExternalStore,
}
from "react";

import {
  workflowExecutionStore
}
from "../../stores/workflows/workflowExecutionStore";

import {
  WorkflowExecutionRealtimeService
}
from "../../services/workflows/WorkflowExecutionRealtimeService";

export default function WorkflowExecutionMonitor() {

  useEffect(() => {

    const service =
      new WorkflowExecutionRealtimeService();

    const unsubscribe =
      service.subscribe();

    return () => {
      unsubscribe();
    };

  }, []);

  const executions =
    useSyncExternalStore(

      workflowExecutionStore.subscribe.bind(
        workflowExecutionStore
      ),

      workflowExecutionStore.getAll.bind(
        workflowExecutionStore
      ),

      workflowExecutionStore.getAll.bind(
        workflowExecutionStore
      )
    );

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Workflow Executions
      </h2>

      {executions.length === 0 && (

        <p
          className="
            text-gray-500
          "
        >
          Aucun workflow exécuté.
        </p>
      )}

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >

        {executions.map(
          (
            execution,
            index
          ) => (

            <div
              key={
                `${execution.workflowId}-${execution.startedAt}-${index}`
              }
              className="
                border
                rounded-xl
                p-4
              "
            >

              <div
                className="
                  font-bold
                "
              >
                {
                  execution.workflowId
                }
              </div>

              <div
                className="
                  text-sm
                  mt-2
                "
              >
                Status :
                {" "}
                {
                  execution.status
                }
              </div>

              <div
                className="
                  text-sm
                "
              >
                Step :
                {" "}
                {
                  execution.currentStep ?? "-"
                }
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}