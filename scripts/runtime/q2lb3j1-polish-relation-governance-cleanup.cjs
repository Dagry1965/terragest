const fs = require("fs");
const path = require("path");

const root = process.cwd();

function abs(file) {
  return path.join(root, file);
}

function read(file) {
  return fs.readFileSync(abs(file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(abs(file), content, "utf8");
}

function removeFile(file) {
  const fullPath = abs(file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log("[REMOVED]", file);
  }
}

let changed = 0;

// 1) RuntimeActionEngine polish
{
  const file = "src/runtime/actions/RuntimeActionEngine.ts";
  let content = read(file);
  const before = content;

  // Remove runtime debug log.
  content = content.replace(
    /\n\s*console\.log\(\s*\n\s*"ERP ACTION EXECUTED",[\s\S]*?\n\s*\);\s*\n/,
    "\n"
  );

  // Normalize visible relation governance messages.
  content = content
    .replaceAll(
      `"Cette action n'est pas disponible car un enregistrement lié existe déjà."`,
      `"Cette action n'est pas disponible car un enregistrement lié existe déjà."`
    )
    .replaceAll(
      `"Cette action est désactivée car un enregistrement lié existe déjà."`,
      `"Cette action est désactivée car un enregistrement lié existe déjà."`
    )
    .replaceAll(
      `title: "Action désactivée",`,
      `title: "Action désactivée",`
    )
    .replaceAll(
      `status === "annulée"`,
      `status === "annulée"`
    );

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  }
}

// 2) ERPRuntimeActionBar polish: keep reason display, clean visible title if needed.
{
  const file = "src/components/erp/runtime/ERPRuntimeActionBar.tsx";
  let content = read(file);
  const before = content;

  content = content
    .replaceAll(`title = "Actions métier"`, `title = "Actions métier"`)
    .replaceAll(`Actions métier`, `Actions métier`);

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  }
}

// 3) ERPRuntimePage polish: keep generic error log, clean visible strings only.
{
  const file = "src/components/erp/runtime/ERPRuntimePage.tsx";
  let content = read(file);
  const before = content;

  content = content
    .replaceAll(`title="Actions métier"`, `title="Actions métier"`)
    .replaceAll(
      `description="Actions runtime disponibles pour cet enregistrement."`,
      `description="Actions runtime disponibles pour cet enregistrement."`
    )
    .replaceAll(`Action effectuée`, `Action effectuée`)
    .replaceAll(`Prochaine étape`, `Prochaine étape`)
    .replaceAll(` Ãƒ"š· `, ` · `);

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  }
}

// 4) Remove superseded temporary scripts.
[
  "scripts/runtime/q2lb3g2-remove-intervention-facturee-references.cjs",
  "scripts/runtime/q2lb3i-b1d-fix-runtime-action-engine-method-placement.cjs",
  "scripts/runtime/q2lb3i-b2c-show-disabled-action-reasons.cjs",
].forEach(removeFile);

console.log("[Q2-L-B3-J1] Changed source files:", changed);