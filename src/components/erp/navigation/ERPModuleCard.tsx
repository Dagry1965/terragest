"use client";

import Link
from "next/link";

export function ERPModuleCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {

  return (

    <Link
      href={href}
      className="
        block
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:border-slate-300
        hover:shadow-md
      "
    >

      <h3
        className="
          text-lg
          font-semibold
          text-slate-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          text-sm
          text-slate-500
        "
      >
        {description}
      </p>

    </Link>

  );
}