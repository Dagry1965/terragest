"use client";

export function ERPTabs({
  tabs,
}: {
  tabs: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`
            rounded-xl px-4 py-2 text-sm font-medium transition-all
            ${
              index === 0
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
