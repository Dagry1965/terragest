interface ERPKpiGridProps {
  items: {
    label: string;
    value: string;
    tone?: "default" | "success" | "info";
  }[];
}

export function ERPKpiGrid({ items }: ERPKpiGridProps) {
  return (
    <section className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const tone =
          item.tone === "success"
            ? "border-emerald-400/20 bg-emerald-950/20 text-emerald-300"
            : item.tone === "info"
              ? "border-blue-400/20 bg-blue-950/20 text-blue-300"
              : "border-white/10 bg-white/[0.06] text-white";

        return (
          <div
            key={item.label}
            className={`rounded-[2rem] border p-6 shadow-xl shadow-black/20 backdrop-blur-2xl ${tone}`}
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-black">
              {item.value}
            </p>
          </div>
        );
      })}
    </section>
  );
}
