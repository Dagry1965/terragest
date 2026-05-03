import { PageHeader }
from "@/components/crud/PageHeader";

import { ProductsTable }
from "@/features/produits/components/ProductsTable";

export default function ProduitsPage() {

  return (
    <div className="space-y-6">

      <PageHeader
        title="Produits"
        description="
          Gestion des produits agricoles
        "
        buttonLabel="Nouveau Produit"
        buttonHref="/produits/nouveau"
      />

      <ProductsTable />
    </div>
  );
}