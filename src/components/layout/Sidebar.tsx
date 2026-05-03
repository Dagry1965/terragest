"use client";

import Link from "next/link";

const menuItems = [
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
    href: "/produits",
  },
  {
    label: "Stocks",
    href: "/stocks",
  },
  {
    label: "MatÃ©riels",
    href: "/materiels",
  },
];

export const Sidebar = () => {
  return (
    <aside
      className="
        w-64
        bg-black
        text-white
        min-h-screen
        p-6
        hidden
        md:block
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          mb-10
        "
      >
        Terragest
      </h1>

      <nav className="space-y-4">

        {menuItems.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className="
              block
              hover:bg-white/10
              rounded-lg
              p-3
              transition
            "
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};