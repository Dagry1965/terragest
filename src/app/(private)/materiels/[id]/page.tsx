import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

type Props = {
  params: {
    id: string;
  };
};

export default function MaterielDetailPage({
  params,
}: Props) {
  return (
    <GenericDetailPage
      moduleKey="materiels"
      id={params.id}
    />
  );
}