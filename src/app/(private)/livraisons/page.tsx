import { notFound } from "next/navigation";

import { GenericListPage }
from "@/components/erp/generic/GenericListPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default function LivraisonsPage() {

  const module = coreERPModules.find(
    (m) => m.metadata.key === "livraisons"
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