import type { ERPModule } from "@/runtime/modules";
import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";

interface ERPModuleTabsProps {
  module: ERPModule;
}

export function ERPModuleTabs({ module }: ERPModuleTabsProps) {
  const composition = ERPUIComposer.compose(module);

  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
      {composition.tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          className={[
            "rounded-2xl px-5 py-3 text-sm font-bold transition",
            index === 1
              ? "bg-slate-950 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
          ].join(" ")}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}