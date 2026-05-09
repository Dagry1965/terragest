import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export default function EditProduitPage({
  params,
}: {
  params: { id: string };
}) {
  return <GenericEditPage moduleKey="produits" id={params.id} />;
}

