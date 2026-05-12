import { notFound } from "next/navigation";

import { GenericCreatePage }
from "@/components/erp/generic/GenericCreatePage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default function CommandeCreatePage() {

  const module = coreERPModules.find(
    (m) => m.metadata.key === "commandes"
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