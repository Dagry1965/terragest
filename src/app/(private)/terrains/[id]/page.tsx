import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

export default async function TerrainDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <GenericDetailPage
      moduleKey="terrains"
      id={id}
    />
  );
}