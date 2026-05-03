"use client";

import Link from "next/link";
import { usePathname }
from "next/navigation";

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

  const pathname =
    usePathname();

  return (
    <aside
      className="
        hidden
        md:flex
        flex-col
        w-72
        bg-black
        text-white
        min-h-screen
        p-6
      "
    >
      <div className="mb-10">

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Terragest
        </h1>

        <p
          className="
            text-sm
            text-gray-400
            mt-2
          "
        >
          ERP Agricole SaaS
        </p>
      </div>

      <nav className="space-y-2">

        {menuItems.map((item) => {

          const active =
            pathname.startsWith(
              item.href
            );

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block
                rounded-xl
                px-4
                py-3
                transition
                ${
                  active
                    ? "bg-white text-black"
                    : "hover:bg-white/10"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-10">

        <div
          className="
            rounded-xl
            bg-white/10
            p-4
          "
        >
          <p className="text-sm">
            Terragest Platform
          </p>

          <p
            className="
              text-xs
              text-gray-400
              mt-1
            "
          >
            Production Ready
          </p>
        </div>
      </div>
    </aside>
  );
};