"use client";

import Link
from "next/link";

import {
  RuntimeNavigationEngine,
}
from "@/runtime/navigation/RuntimeNavigationEngine";

interface Props {

  module: string;

  entityId?: string;
}

export function ERPRelationNavigation({

  module,

  entityId,

}: Props) {

  const links =
    RuntimeNavigationEngine
      .getLinks(
        module,
        entityId
      );

  if (
    links.length === 0
  ) {

    return null;
  }

  return (

    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-md
      "
    >

      <h2
        className="
          mb-4
          text-xl
          font-semibold
        "
      >
        Navigation relationnelle
      </h2>

      <div
        className="
          flex
          flex-wrap
          gap-3
        "
      >

        {links.map(
          (link) => (

          <Link
            key={link.href}

            href={link.href}

            className="
              rounded-xl
              bg-slate-100
              px-4
              py-2
              text-sm
              hover:bg-slate-200
            "
          >
            {link.label}
          </Link>
        ))}

      </div>

    </div>
  );
}
