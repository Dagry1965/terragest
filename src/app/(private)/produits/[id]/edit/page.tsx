import { ProductEditForm }
from "@/features/produits/components/ProductEditForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProduitPage({
  params,
}: Props) {

  const { id } =
    await params;

  return (
    <div className="space-y-6">

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Modifier Produit
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Mise Ã  jour produit
        </p>
      </div>

      <ProductEditForm id={id} />
    </div>
  );
}