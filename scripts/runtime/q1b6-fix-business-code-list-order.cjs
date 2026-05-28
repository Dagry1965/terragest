const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
];

for (const rel of files) {
  const file = path.join(ROOT, rel);
  const original = fs.readFileSync(file, "utf8");
  let content = original;

  fs.writeFileSync(file + ".bak-q1b6-fix-business-code-list-order", original, "utf8");

  if (rel.includes("vehicules")) {
    content = content.replace(
      /key:"immatriculation"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*1\s*\}/,
      `key:"immatriculation"$1list: { visible: true, order: 2 }`
    );

    content = content.replace(
      /key:"marque"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*2\s*\}/,
      `key:"marque"$1list: { visible: true, order: 3 }`
    );

    content = content.replace(
      /key:"modele"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*3\s*\}/,
      `key:"modele"$1list: { visible: true, order: 4 }`
    );

    content = content.replace(
      /key:"clientId"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*4\s*\}/,
      `key:"clientId"$1list: { visible: true, order: 5 }`
    );

    content = content.replace(
      /key:"kilometrage"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*5\s*\}/,
      `key:"kilometrage"$1list: { visible: true, order: 6 }`
    );

    content = content.replace(
      /key:"statut"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*6\s*\}/,
      `key:"statut"$1list: { visible: true, order: 7 }`
    );
  }

  if (rel.includes("rendezvous")) {
    content = content.replace(
      /key: "vehiculeId"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*2\s*\}/,
      `key: "vehiculeId"$1list: { visible: true, order: 3 }`
    );

    content = content.replace(
      /key: "dateRendezVous"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*3\s*\}/,
      `key: "dateRendezVous"$1list: { visible: true, order: 4 }`
    );

    content = content.replace(
      /key: "heureRendezVous"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*4\s*\}/,
      `key: "heureRendezVous"$1list: { visible: true, order: 5 }`
    );

    content = content.replace(
      /key: "typeService"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*5\s*\}/,
      `key: "typeService"$1list: { visible: true, order: 6 }`
    );

    content = content.replace(
      /key: "statut"([\s\S]*?)list:\s*\{\s*visible:\s*true,\s*order:\s*6\s*\}/,
      `key: "statut"$1list: { visible: true, order: 7 }`
    );
  }

  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", rel);
}

console.log("");
console.log("[DONE] Q1-B6 ordre des colonnes codes métier corrigé.");
console.log("Next: pnpm build");
