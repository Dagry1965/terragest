const filters = [
  "Tous",
  "Actifs",
  "En attente",
  "Critiques",
  "Archivés",
];

export function ERPQuickFilters() {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <button
          key={filter}
          type="button"
          className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
            index === 0
              ? "border-[#475569] bg-[#334155] text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-[#94A3B8] hover:text-[#1F2937]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}