import { notFound } from "next/navigation";

import { GenericCreatePage }
from "@/components/erp/generic/GenericCreatePage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default function ClientCreatePage() {

  const module = coreERPModules.find(
    (m) => m.metadata.key === "clients"
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