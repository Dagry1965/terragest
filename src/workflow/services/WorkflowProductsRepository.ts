import {
  addDoc,
  collection,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firebase";

import {
  WorkflowAutomation,
} from "@/workflow/automations/WorkflowAutomation";

export const WorkflowProductsRepository = {

  async create(
    payload: any
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
