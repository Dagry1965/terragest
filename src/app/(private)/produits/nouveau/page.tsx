import { ProductForm }
from "@/features/produits/components/ProductForm";

export default function NouveauProduitPage() {

  return (
    <div className="space-y-6">

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Nouveau Produit
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Ajouter un produit
        </p>
      </div>

      <ProductForm />
    </div>
  );
}