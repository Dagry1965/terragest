"use client";

import Link
from "next/link";

const items = [

  {
    label: "Dashboard",
    href: "/dashboard",
  },

  {
    label: "Exploitations",
    href: "/exploitations",
  },

  {
    label: "Produits",
    href: "/products",
  },

  {
    label: "Stocks",
    href: "/stocks",
  },

  {
    label: "Interventions",
    href: "/interventions",
  },

  {
    label: "Analytics",
    href: "/analytics",
  },

  {
    label: "AI Assistant",
    href: "/ai-assistant",
  },

  {
    label: "Workflow",
    href: "/workflow-engine",
  },
];

export const AppSidebar = () => {

  return (

    <aside className="
      w-72
      min-h-screen
      bg-black
      text-white
      flex
      flex-col
      p-6
    ">

      <div className="
        text-3xl
        font-bold
        mb-10
      ">

        TERRAGEST

      </div>

      <nav className="
        flex
        flex-col
        gap-3
      ">

        {items.map(
          (item) => (

            <Link
              key={item.href}
              href={item.href}
              className="
                px-4
                py-3
                rounded-xl
                hover:bg-white/10
                transition
              "
            >

              {item.label}

            </Link>

          )
        )}

      </nav>

    </aside>
  );
}
