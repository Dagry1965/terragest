import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

type Props = {
  params: {
    id: string;
  };
};

export default function TerrainDetailPage({
  params,
}: Props) {
  return (
    <GenericDetailPage
      moduleKey="terrains"
      id={params.id}
    />
  );
}