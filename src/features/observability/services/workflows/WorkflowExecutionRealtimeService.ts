import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
}
from "firebase/firestore";

import { db }
from "@/lib/firebase";

import {
  workflowExecutionStore
}
from "../../stores/workflows/workflowExecutionStore";

export class
WorkflowExecutionRealtimeService {

  subscribe() {

    const executionsQuery =
      query(

        collection(
          db,
          "runtime_workflow_executions"
        ),

        orderBy(
          "createdAt",
          "desc"
        ),

        limit(50)
      );

    return onSnapshot(

      executionsQuery,

      snapshot => {

        const executions =
          snapshot.docs.map(
            doc => {

              const data =
                doc.data();

              return {

                workflowId:
                  String(
                    data.workflowId
                  ),

                status:
                  data.status,

                startedAt:
                  Number(
                    data.startedAt
                  ),

                finishedAt:
                  data.finishedAt
                    ? Number(
                        data.finishedAt
                      )
                    : undefined,

                currentStep:
                  data.currentStep,

                error:
                  data.error,
              };
            }
          );

        workflowExecutionStore.replaceAll(
          executions
        );
      }
    );
  }
}