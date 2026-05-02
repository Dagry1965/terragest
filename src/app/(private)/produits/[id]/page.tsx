"use client";

import {
  useParams
}
from "next/navigation";

export default function ProduitDetailPage() {

  const params =
    useParams();

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
          Produit
        </h1>

        <p>
          ID :
          {params.id}
        </p>

      </div>

    </div>
  );
}