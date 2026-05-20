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

const dir = path.dirname(target);
const base = path.basename(target);

const backups = fs
  .readdirSync(dir)
  .filter((name) => name.startsWith(base + ".bak"))
  .map((name) => {
    const fullPath = path.join(dir, name);
    return {
      name,
      fullPath,
      mtime: fs.statSync(fullPath).mtimeMs,
      content: fs.readFileSync(fullPath, "utf8"),
    };
  })
  .sort((a, b) => b.mtime - a.mtime);

if (backups.length === 0) {
  throw new Error("Aucun backup ERPEnterpriseForm.tsx.bak* trouvé.");
}

const validBackup = backups.find((backup) => {
  const c = backup.content;

  return (
    c.includes("handleSubmit") &&
    c.includes("ERPFormField") &&
    c.includes("ERPFormTabs") &&
    c.includes("return (") &&
    !c.includes("Tout ton JSX reste identique") &&
    !c.includes("Le reste du code")
  );
});

if (!validBackup) {
  console.log("Backups trouvés:");
  backups.forEach((backup) => console.log("-", backup.name));
  throw new Error("Aucun backup valide contenant handleSubmit et le JSX complet n'a été trouvé.");
}

const brokenBackup = `${target}.broken-before-restore-${Date.now()}`;
fs.writeFileSync(brokenBackup, fs.readFileSync(target, "utf8"), "utf8");

fs.writeFileSync(target, validBackup.content, "utf8");

console.log("OK: ERPEnterpriseForm.tsx restauré depuis:", validBackup.name);
console.log("Backup du fichier cassé:", brokenBackup);