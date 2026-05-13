import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditRecettesPage({
  params,
}: PageProps) {

  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="recettes"
      id={id}
    />
  );
}