import { notFound } from "next/navigation";

import { GenericListPage }
from "@/components/erp/generic/GenericListPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default function VehiculesPage() {

  const module = coreERPModules.find(
    (m) => m.metadata.key === "vehicules"
  );

  if (!module) {
    notFound();
  }

  return (
    <GenericListPage
      module={module}
    />
  );
}