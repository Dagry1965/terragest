import type { ReactNode } from "react";

type ERPSectionProps = {
  children: ReactNode;
  className?: string;
};

export function ERPSection({
  children,
  className = "",
}: ERPSectionProps) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}