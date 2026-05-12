import { notFound } from "next/navigation";

import { GenericEditPage }
from "@/components/erp/generic/GenericEditPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default async function VehiculesEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const module = coreERPModules.find(
    (m) => m.metadata.key === "vehicules"
  );

  if (!module) {
    notFound();
  }

  return (
    <GenericEditPage
      module={module}
      id={id}
    />
  );
}