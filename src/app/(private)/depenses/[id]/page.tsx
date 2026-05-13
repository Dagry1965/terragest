import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DepensesDetailPage({
  params,
}: PageProps) {

  const { id } = await params;

  return (
    <GenericDetailPage
      moduleKey="depenses"
      id={id}
    />
  );
}