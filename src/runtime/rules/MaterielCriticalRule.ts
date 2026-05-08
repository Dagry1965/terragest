import type {
  Rule
}
from "./types/Rule";

export const
MaterielCriticalRule:
  Rule = {

  id:
    "MATERIEL_CRITICAL_RULE",

  name:
    "Critical Materiel Rule",

  description:
    "Détection matériel critique",

  async condition(
    context
  ) {

    const payload =
      context.payload as {
        categorie?: string;
      };

    return (
      payload?.categorie?.toLowerCase()
      === "critique"
    );
  },

  async action(
    context
  ) {

    console.log(

      "[RULE] Critical materiel detected",

      context.payload
    );
  },
};