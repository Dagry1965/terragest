import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

type Props = {
  params: {
    id: string;
  };
};

export default function MaterielEditPage({
  params,
}: Props) {
  return (
    <GenericEditPage
      moduleKey="materiels"
      id={params.id}
    />
  );
}