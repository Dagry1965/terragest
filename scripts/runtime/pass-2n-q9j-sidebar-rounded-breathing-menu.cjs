const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(root, "src/components/erp/shell/ErpSidebar.tsx");

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * PASS 2N-Q9J
 * Sidebar AMARKHYS :
 * - arrondis haut/bas visibles
 * - sidebar détachée
 * - menu breathing hover
 * - responsive premium
 */

const mainSidebar =
  "hidden h-[calc(100vh-1.5rem)] w-72 shrink-0 overflow-hidden rounded-[34px] border border-white/45 bg-[rgba(248,250,252,0.42)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block";

const loadingSidebar =
  "hidden h-[calc(100vh-1.5rem)] w-72 shrink-0 overflow-hidden rounded-[34px] border border-white/45 bg-[rgba(248,250,252,0.42)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block";

content = content
  .replaceAll(
    `className="hidden w-72 shrink-0 border-r border-white/35 bg-[rgba(248,250,252,0.38)] text-[#0F172A] shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:block"`,
    `className="${loadingSidebar}"`
  )
  .replaceAll(
    `className="hidden w-72 shrink-0 overflow-y-auto border-r border-white/35 bg-[rgba(248,250,252,0.38)] p-4 text-[#0F172A] shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:block"`,
    `className="${mainSidebar}"`
  )
  .replaceAll(
    `className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-950 text-white lg:block"`,
    `className="${mainSidebar}"`
  )
  .replaceAll(
    `className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-950 p-4 text-white lg:block"`,
    `className="${mainSidebar}"`
  )
  .replaceAll(
    `className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white lg:block"`,
    `className="${loadingSidebar}"`
  );

/**
 * Si le précédent pass a déjà mis la sidebar en soft glass, renforcer directement.
 */
content = content
  .replaceAll(
    `className="hidden w-72 shrink-0 overflow-y-auto border-r border-white/35 bg-[rgba(248,250,252,0.38)] p-4 text-[#0F172A] shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:block"`,
    `className="${mainSidebar}"`
  )
  .replaceAll(
    `className="hidden w-72 shrink-0 border-r border-white/35 bg-[rgba(248,250,252,0.38)] text-[#0F172A] shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:block"`,
    `className="${loadingSidebar}"`
  );

/**
 * Header : arrondi visible et doux.
 */
content = content
  .replaceAll(
    `className="mx-3 mt-4 flex h-20 items-center rounded-[28px] border border-white/40 bg-white/45 px-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"`,
    `className="mb-4 flex h-20 items-center rounded-[30px] border border-white/55 bg-white/55 px-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl"`
  )
  .replaceAll(
    `className="flex h-20 items-center border-b border-slate-800 px-6"`,
    `className="mb-4 flex h-20 items-center rounded-[30px] border border-white/55 bg-white/55 px-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl"`
  );

/**
 * Zone scroll interne : conserver les arrondis visibles du shell.
 */
content = content.replaceAll(
  `className="space-y-5 px-4 py-5"`,
  `className="max-h-[calc(100vh-8.5rem)] space-y-5 overflow-y-auto rounded-[28px] px-2 py-2 pr-1"`
);

content = content.replaceAll(
  `className="space-y-6 px-4 py-6"`,
  `className="max-h-[calc(100vh-8.5rem)] space-y-5 overflow-y-auto rounded-[28px] px-2 py-2 pr-1"`
);

/**
 * Items principaux : breathing hover.
 */
content = content.replaceAll(
  `className="rounded-2xl border border-transparent px-4 py-3 text-sm font-bold transition"`,
  `className="rounded-[24px] border border-transparent px-4 py-3 text-sm font-bold transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)] active:scale-[0.99]"`
);

content = content.replaceAll(
  `className="rounded-2xl px-4 py-3 text-sm font-bold transition"`,
  `className="rounded-[24px] border border-transparent px-4 py-3 text-sm font-bold transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)] active:scale-[0.99]"`
);

/**
 * États actifs et hover.
 */
content = content
  .replaceAll(
    `? "rounded-2xl border border-white/60 bg-white/75 text-[#0F172A] shadow-[0_10px_28px_rgba(15,23,42,0.08)]"`,
    `? "rounded-[24px] border border-white/70 bg-white/85 text-[#0F172A] shadow-[0_16px_38px_rgba(15,23,42,0.12)] scale-[1.02]"`
  )
  .replaceAll(
    `: "text-[#475569] hover:bg-white/55 hover:text-[#0F172A]"`,
    `: "text-[#475569] hover:border-white/65 hover:bg-white/70 hover:text-[#0F172A]"`
  );

/**
 * Sous-menu : arrondi visible, fond très léger.
 */
content = content
  .replaceAll(
    `className="mt-3 space-y-1 rounded-[24px] border border-white/35 bg-white/25 p-2 backdrop-blur-xl"`,
    `className="mt-3 space-y-1 rounded-[28px] border border-white/45 bg-white/30 p-2 shadow-inner shadow-white/20 backdrop-blur-xl"`
  )
  .replaceAll(
    `className="mt-3 space-y-1 pl-3"`,
    `className="mt-3 space-y-1 rounded-[28px] border border-white/45 bg-white/30 p-2 shadow-inner shadow-white/20 backdrop-blur-xl"`
  );

/**
 * Sous-items : breathing plus discret.
 */
content = content.replaceAll(
  `className="block rounded-2xl px-4 py-2 text-sm font-semibold transition"`,
  `className="block rounded-[22px] border border-transparent px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/70 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] active:scale-[0.99]"`
);

content = content.replaceAll(
  `className="block rounded-xl px-4 py-2 text-sm font-semibold transition"`,
  `className="block rounded-[22px] border border-transparent px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/70 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] active:scale-[0.99]"`
);

/**
 * Couleurs résiduelles sidebar.
 */
content = content
  .replaceAll("bg-slate-950", "bg-[rgba(248,250,252,0.42)]")
  .replaceAll("text-white", "text-[#0F172A]")
  .replaceAll("border-r border-slate-200", "border border-white/45")
  .replaceAll("border-slate-800", "border-white/45")
  .replaceAll("hover:bg-slate-800", "hover:bg-white/70")
  .replaceAll("shadow-slate-950/40", "shadow-slate-300/40");

/**
 * Garage ERP : vert profond visible.
 */
content = content.replaceAll(
  `className="text-xs font-black uppercase tracking-[0.22em] text-[#0F5C4D]"`,
  `className="text-xs font-black uppercase tracking-[0.22em] text-[#064E3B]"`
);

content = content.replaceAll(
  `<span className="text-[#0F5C4D]">Garage ERP</span>`,
  `<span className="text-[#064E3B]">Garage ERP</span>`
);

/**
 * Nettoyage.
 */
content = content
  .replaceAll("transition-all duration-300 ease-out transition-all duration-300 ease-out", "transition-all duration-300 ease-out")
  .replaceAll("hover:scale-[1.035] hover:scale-[1.035]", "hover:scale-[1.035]")
  .replaceAll("hover:-translate-y-0.5 hover:-translate-y-0.5", "hover:-translate-y-0.5")
  .replaceAll("rounded-[24px] rounded-[24px]", "rounded-[24px]")
  .replaceAll("rounded-[28px] rounded-[28px]", "rounded-[28px]")
  .replaceAll("rounded-[34px] rounded-[34px]", "rounded-[34px]")
  .replaceAll("backdrop-blur-2xl backdrop-blur-2xl", "backdrop-blur-2xl")
  .replaceAll("text-[#0F172A] text-[#0F172A]", "text-[#0F172A]");

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q9J OK: sidebar rounded breathing menu applied.");