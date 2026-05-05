// src/components/erp/forms/ERPFormSection.tsx

import {
  ReactNode
}
from "react";

interface ERPFormSectionProps {

  title: string;

  children:
    ReactNode;
}

export function ERPFormSection({

  title,

  children
}: ERPFormSectionProps) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h3
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        {title}
      </h3>

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >
        {children}
      </div>

    </div>
  );
}
