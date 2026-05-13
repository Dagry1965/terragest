import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployesDetailPage({
  params,
}: PageProps) {

  const { id } = await params;

  return (
    <GenericDetailPage
      moduleKey="employes"
      id={id}
    />
  );
}