import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

interface MouvementsStockAutoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MouvementsStockAutoDetailPage({
  params,
}: MouvementsStockAutoDetailPageProps) {
  const { id } = await params;

  return <GenericDetailPage moduleKey="mouvementsstockauto" id={id} />;
}
