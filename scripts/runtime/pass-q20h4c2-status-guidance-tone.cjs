const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20h4c2-status-guidance-tone");

let content = read(target);

if (content.includes("Q20H4C2_STATUS_GUIDANCE_TONE")) {
  console.log("[SKIP] Q20H4C2 semble déjà appliqué.");
  process.exit(0);
}

const anchor = `  const statusGuidance =
    statusGovernance?.guidance?.[0] ?? null;`;

if (!content.includes(anchor)) {
  throw new Error("Bloc statusGuidance introuvable. Q20H4C doit être appliqué avant.");
}

const replacement = `  const statusGuidance =
    statusGovernance?.guidance?.[0] ?? null;

  const statusGuidanceToneClass =
    // Q20H4C2_STATUS_GUIDANCE_TONE
    statusGuidance?.tone === "success"
      ? "border-emerald-100 bg-emerald-50/70 text-emerald-950"
      : statusGuidance?.tone === "warning"
        ? "border-amber-200 bg-amber-50/80 text-amber-950"
        : statusGuidance?.tone === "danger"
          ? "border-rose-200 bg-rose-50/80 text-rose-950"
          : statusGuidance?.tone === "info"
            ? "border-cyan-200 bg-cyan-50/80 text-cyan-950"
            : "border-amber-200 bg-amber-50/80 text-amber-950";

  const statusGuidanceMessageClass =
    statusGuidance?.tone === "success"
      ? "text-emerald-900/80"
      : statusGuidance?.tone === "danger"
        ? "text-rose-900/80"
        : statusGuidance?.tone === "info"
          ? "text-cyan-900/80"
          : "text-amber-900/80";`;

content = content.replace(anchor, replacement);

content = content.replace(
`            className="
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50/70
              px-5
              py-4
              text-sm
              text-emerald-950
              shadow-sm
            "`,
`            className={[
              "rounded-2xl border px-5 py-4 text-sm shadow-sm",
              statusGuidanceToneClass,
            ].join(" ")}`
);

content = content.replace(
`            <p className="mt-1 leading-6 text-emerald-900/80">
              {statusGuidance.message}
            </p>`,
`            <p
              className={[
                "mt-1 leading-6",
                statusGuidanceMessageClass,
              ].join(" ")}
            >
              {statusGuidance.message}
            </p>`
);

write(target, content);

console.log("");
console.log("[Q20H4C2_DONE] Couleur guidance statut rendue dynamique.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  tester brouillon = orange, validee = vert");
