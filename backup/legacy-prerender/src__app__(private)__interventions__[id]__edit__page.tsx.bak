import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="interventions"
      id={id}
    />
  );
}