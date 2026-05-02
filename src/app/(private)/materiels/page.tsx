"use client";

import Link
from "next/link";

export default function MaterielsPage() {

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
          Matériels
        </h1>

        <Link
          href="/materiels/nouveau"
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Nouveau
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

        Module Matériels OK

      </div>

    </div>
  );
}
