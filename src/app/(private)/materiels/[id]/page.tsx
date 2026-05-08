import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <GenericDetailPage
      moduleKey="materiels"
      id={id}
    />
  );
}