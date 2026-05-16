const tabs = [
  "Vue gÃ©nÃ©rale",
  "DonnÃ©es",
  "Workflows",
  "Audit",
  "Relations",
];

export function ERPTabNavigation() {
  return (
    <div className="mb-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
      <div className="flex min-w-max gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
              index === 0
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}