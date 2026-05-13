import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditRecoltesPage({
  params,
}: PageProps) {

  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="recoltes"
      id={id}
    />
  );
}