const filters = [
  "Tous",
  "Actifs",
  "En attente",
  "Critiques",
  "ArchivÃ©s",
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
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}