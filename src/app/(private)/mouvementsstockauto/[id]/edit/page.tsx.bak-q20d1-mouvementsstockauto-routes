import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

interface MouvementsStockAutoEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MouvementsStockAutoEditPage({
  params,
}: MouvementsStockAutoEditPageProps) {
  const { id } = await params;

  return <GenericEditPage moduleKey="mouvementsstockauto" id={id} />;
}
