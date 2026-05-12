import { notFound } from "next/navigation";

import { GenericDetailPage }
from "@/components/erp/generic/GenericDetailPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default async function RecoltesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const module = coreERPModules.find(
    (m) => m.metadata.key === "recoltes"
  );

  if (!module) {
    notFound();
  }

  return (
    <GenericDetailPage
      module={module}
      id={id}
    />
  );
}