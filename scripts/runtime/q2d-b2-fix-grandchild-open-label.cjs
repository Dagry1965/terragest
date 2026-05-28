const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");

fs.writeFileSync(
  file + ".bak-q2d-b2-fix-grandchild-open-label",
  original,
  "utf8"
);

let content = original;

content = content.replace(
  /getOpenLabel\(\s*grandchildGroup\.module\.metadata\.key\s*\)/g,
  "getOpenLabel(grandchildGroup.child)"
);

content = content.replace(
  /getOpenLabel\(\s*group\.module\.metadata\.key\s*\)/g,
  "getOpenLabel(group.child)"
);

content = content.replace(
  /getOpenLabel\(\s*child\.moduleKey\s*\)/g,
  "getOpenLabel(child)"
);

if (content.includes("getOpenLabel(grandchildGroup.module.metadata.key)")) {
  throw new Error("Ancien appel grandchildGroup.module.metadata.key encore présent.");
}

if (content.includes("getOpenLabel(group.module.metadata.key)")) {
  throw new Error("Ancien appel group.module.metadata.key encore présent.");
}

if (content.includes("getOpenLabel(child.moduleKey)")) {
  throw new Error("Ancien appel child.moduleKey encore présent.");
}

if (!content.includes("getOpenLabel(grandchildGroup.child)")) {
  console.log("[WARN] getOpenLabel(grandchildGroup.child) non trouvé ; vérifier si le bloc petit-enfant existe.");
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-D-B2 correction openLabel petits-enfants appliquée.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");
