import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export default async function TerrainEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="terrains"
      id={id}
    />
  );
}