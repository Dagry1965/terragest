import {
  addDoc,
  collection,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/config";

import {
  WorkflowAutomation,
} from "@/workflow/automations/WorkflowAutomation";

export const WorkflowProductsRepository = {

  async create(
    payload: unknown
  ) {

    const result =
      await addDoc(

        collection(
          db,
          "products"
        ),

        payload
      );

    WorkflowAutomation.onProductCreated(
      payload
    );

    return result;
  },
};
