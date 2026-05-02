"use client";

export const dynamic =
  "force-dynamic";

export default function NouveauProduitPage() {

  return (

    <div className="p-10">

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Nouveau Produit
        </h1>

        <p>
          Formulaire sécurisé SSR OK
        </p>

      </div>

    </div>
  );
}
