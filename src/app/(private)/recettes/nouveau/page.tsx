import { notFound } from "next/navigation";

import { GenericCreatePage }
from "@/components/erp/generic/GenericCreatePage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default function RecettesCreatePage() {

  const module = coreERPModules.find(
    (m) => m.metadata.key === "recettes"
  );

  if (!module) {
    notFound();
  }

  return (
    <GenericCreatePage
      module={module}
    />
  );
}