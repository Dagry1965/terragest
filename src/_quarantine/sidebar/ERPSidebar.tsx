// src/components/sidebar/ERPSidebar.tsx

"use client";

import Link
from "next/link";

const items = [

  "Dashboard",

  "Exploitations",

  "Terrains",

  "Stocks",

  "Produits",

  "MatÃ©riels",

  "Interventions",

  "Maintenance",

  "Contrats",

  "Paiements",

  "Workflows",

  "Supervision"
];

export function ERPSidebar() {

  return (

    <aside
      className="w-64 min-h-screen bg-zinc-900 text-white p-4"
    >

      <h1
        className="text-2xl font-bold mb-8"
      >
        Terragest
      </h1>

      <nav
        className="flex flex-col gap-2"
      >

        {items.map(item => (

          <Link

            key={item}

            href="#"

            className="
              px-3
              py-2
              rounded-lg
              hover:bg-zinc-800
              transition
            "
          >
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
