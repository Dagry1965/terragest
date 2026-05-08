import type {
  Automation
}
from "../types/Automation";

import {
  RuntimeEventRegistry
}
from "@/runtime/events/RuntimeEventRegistry";

export const
MaterielBreakdownRule:
  Automation = {

  id:
    "AUTOMATION_MATERIEL_BREAKDOWN",

  name:
    "Materiel Breakdown Automation",

  description:
    "Automation matériel critique",

  eventType:
    RuntimeEventRegistry.MATERIEL_CREATED,

  async action(
    context
  ) {

    const payload =
      context.payload as {
        categorie?: string;
        nom?: string;
      };

    if (
      payload?.categorie?.toLowerCase()
      !== "critique"
    ) {

      return;
    }

    console.log(

      "[AUTOMATION] Maintenance workflow triggered",

      payload
    );
  },
};