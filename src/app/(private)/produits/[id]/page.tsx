import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

export default function ProduitDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <GenericDetailPage moduleKey="produits" id={params.id} />;
}

