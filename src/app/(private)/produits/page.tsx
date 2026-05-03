"use client";

import Link
from "next/link";

export default function ProduitsPage() {

  return (

    <div className="p-10">

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Produits
        </h1>

        <Link
          href="/produits"
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Rafraîchir
        </Link>

      </div>

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        Module Produits OK

      </div>

    </div>
  );
}