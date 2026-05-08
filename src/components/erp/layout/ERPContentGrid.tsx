import type { ReactNode } from "react";

interface ERPContentGridProps {
  main: ReactNode;
  side?: ReactNode;
}

export function ERPContentGrid({ main, side }: ERPContentGridProps) {
  if (!side) {
    return <section>{main}</section>;
  }

  return (
    <section className="grid gap-8 2xl:grid-cols-[1.7fr_0.75fr]">
      <div>{main}</div>
      <aside className="space-y-6">{side}</aside>
    </section>
  );
}
