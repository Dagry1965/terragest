// src/components/erp/details/EntityDetailsLayout.tsx

import {
  ReactNode
}
from "react";

interface EntityDetailsLayoutProps {

  title: string;

  subtitle?: string;

  children:
    ReactNode;
}

export function EntityDetailsLayout({

  title,

  subtitle,

  children
}: EntityDetailsLayoutProps) {

  return (

    <div
      className="
        flex
        flex-col
        gap-6
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          p-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-2
          "
        >
          {title}
        </h1>

        {subtitle && (

          <p
            className="
              text-zinc-500
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {children}

    </div>
  );
}
