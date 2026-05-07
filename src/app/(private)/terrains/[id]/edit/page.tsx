import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

type Props = {
  params: {
    id: string;
  };
};

export default function TerrainEditPage({
  params,
}: Props) {
  return (
    <GenericEditPage
      moduleKey="terrains"
      id={params.id}
    />
  );
}