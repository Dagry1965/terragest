const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(file(relativePath), content, {
    encoding: "utf8",
  });

  console.log(`[WRITTEN] ${relativePath}`);
}

function backup(relativePath, suffix) {
  const source = file(relativePath);
  const target = file(`${relativePath}.bak-${suffix}`);

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relativePath}.bak-${suffix}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${relativePath}.bak-${suffix}`);
  }
}

const target = "src/components/erp/forms/enterprise/ERPFormField.tsx";
const suffix = "q19d3-disable-browser-autocomplete";

backup(target, suffix);

let content = read(target);

// Relation search input
content = content.replace(
  `            type="text"
            placeholder="Rechercher..."`,
  `            type="text"
            autoComplete="off"
            placeholder="Rechercher..."`
);

// Primitive runtime input
content = content.replace(
  `          name={field.key}
          required={field.required}`,
  `          name={field.key}
          autoComplete="off"
          required={field.required}`
);

write(target, content);

console.log("");
console.log("[Q19D3_DONE] Browser autocomplete disabled on ERP runtime inputs.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester /clientsauto/nouveau > Code client");