"use client";

export function ERPHealthBadge({
  health,
}: {
  health: "healthy" | "warning" | "critical";
}) {

  const styles = {

    healthy:
      "bg-emerald-100 text-emerald-700",

    warning:
      "bg-amber-100 text-amber-800",

    critical:
      "bg-rose-100 text-rose-800",
  };

  return (

    <div
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[health]}
      `}
    >
      {health.toUpperCase()}
    </div>

  );
}