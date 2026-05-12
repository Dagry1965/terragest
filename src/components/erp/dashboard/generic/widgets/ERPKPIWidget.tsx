import Link
from "next/link";

import type {
  ERPDashboardWidgetProps,
}
from "../registry/ERPDashboardWidgetRegistry";

export function ERPKPIWidget({
  widget,
}: ERPDashboardWidgetProps) {

  const content = (

    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >

      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {widget.title}
      </p>

      <h2
        className="
          mt-3
          text-4xl
          font-bold
          text-slate-950
        "
      >
        {widget.value ?? 0}
      </h2>

    </div>
  );

  if (widget.href) {

    return (

      <Link href={widget.href}>
        {content}
      </Link>
    );
  }

  return content;
}