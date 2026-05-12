import { notFound } from "next/navigation";

import { GenericDetailPage }
from "@/components/erp/generic/GenericDetailPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default async function AchatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const module = coreERPModules.find(
    (m) => m.metadata.key === "achats"
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