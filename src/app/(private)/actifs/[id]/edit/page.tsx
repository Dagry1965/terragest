import { GenericEditPage }
from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

export default async function EditActifsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="actifs"
      id={id}
    />
  );
}