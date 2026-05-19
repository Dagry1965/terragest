const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(root, "src/components/erp/shell/ErpSidebar.tsx");

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

const softSidebar =
  "hidden w-72 shrink-0 overflow-y-auto border-r border-white/35 bg-[rgba(248,250,252,0.38)] p-4 text-[#0F172A] shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:block";

const softLoadingSidebar =
  "hidden w-72 shrink-0 border-r border-white/35 bg-[rgba(248,250,252,0.38)] text-[#0F172A] shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:block";

content = content
  .replaceAll(
    `className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white lg:block"`,
    `className="${softLoadingSidebar}"`
  )
  .replaceAll(
    `className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-950 p-4 text-white lg:block"`,
    `className="${softSidebar}"`
  )
  .replaceAll(
    `className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-950 text-white lg:block"`,
    `className="${softSidebar}"`
  );

/**
 * Header sidebar : retirer le bloc dur, garder un bloc lisse.
 */
content = content
  .replaceAll(
    `className="flex h-20 items-center border-b border-slate-800 px-6"`,
    `className="mx-3 mt-4 flex h-20 items-center rounded-[28px] border border-white/40 bg-white/45 px-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"`
  )
  .replaceAll(
    `className="text-xl font-black text-white"`,
    `className="text-xl font-black text-[#0F172A]"`
  )
  .replaceAll(
    `className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]"`,
    `className="text-xs font-black uppercase tracking-[0.22em] text-[#0F5C4D]"`
  );

/**
 * Garage ERP en vert profond explicite.
 */
content = content.replaceAll(
  `{isAmarkhys ? "Garage ERP" : "ERP Enterprise"}`,
  `{isAmarkhys ? (
              <span className="text-[#0F5C4D]">Garage ERP</span>
            ) : (
              "ERP Enterprise"
            )}`
);

/**
 * Nav spacing et items : adoucir noir / hover.
 */
content = content
  .replaceAll(
    `className="space-y-6 px-4 py-6"`,
    `className="space-y-5 px-4 py-5"`
  )
  .replaceAll(
    `? "bg-[#334155] text-white shadow-lg shadow-slate-950/40"`,
    `? "rounded-2xl border border-white/60 bg-white/75 text-[#0F172A] shadow-[0_10px_28px_rgba(15,23,42,0.08)]"`
  )
  .replaceAll(
    `: "text-white hover:bg-slate-800"`,
    `: "text-[#475569] hover:bg-white/55 hover:text-[#0F172A]"`
  )
  .replaceAll(
    `: "text-slate-300 hover:bg-slate-800 hover:text-white"`,
    `: "text-[#475569] hover:bg-white/55 hover:text-[#0F172A]"`
  )
  .replaceAll(
    `className="rounded-2xl px-4 py-3 text-sm font-bold transition"`,
    `className="rounded-2xl border border-transparent px-4 py-3 text-sm font-bold transition"`
  )
  .replaceAll(
    `className="mt-3 space-y-1 pl-3"`,
    `className="mt-3 space-y-1 rounded-[24px] border border-white/35 bg-white/25 p-2 backdrop-blur-xl"`
  );

/**
 * Textes secondaires et erreurs.
 */
content = content
  .replaceAll("text-slate-400", "text-[#64748B]")
  .replaceAll("text-slate-300", "text-[#475569]")
  .replaceAll("bg-red-950/60", "bg-red-50")
  .replaceAll("text-red-200", "text-red-700")
  .replaceAll("border-slate-800", "border-white/35");

/**
 * Nettoyage doublons.
 */
content = content
  .replaceAll("rounded-2xl rounded-2xl", "rounded-2xl")
  .replaceAll("border border-transparent border border-transparent", "border border-transparent")
  .replaceAll("backdrop-blur-xl backdrop-blur-xl", "backdrop-blur-xl")
  .replaceAll("text-[#0F172A] text-[#0F172A]", "text-[#0F172A]");

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q9I OK: targeted AMARKHYS sidebar softened.");