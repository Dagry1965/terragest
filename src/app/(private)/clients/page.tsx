import { notFound } from "next/navigation";

import { GenericListPage }
from "@/components/erp/generic/GenericListPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default function ClientsPage() {

  const module = coreERPModules.find(
    (m) => m.metadata.key === "clients"
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