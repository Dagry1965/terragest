const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const file = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "produitsauto",
  "produitsauto.module.ts"
);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content.replace(/\r\n/g, "\n"), "utf8");
  console.log("[WRITTEN]", path.relative(ROOT, filePath));
}

function backup(filePath) {
  const backupPath = filePath + ".bak-q16c1b-catalog-tabs";
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log("[BACKUP]", path.relative(ROOT, backupPath));
  }
}

function findObjectStart(lines, keyLineIndex) {
  for (let index = keyLineIndex; index >= 0; index -= 1) {
    if (lines[index].trim() === "{") {
      return index;
    }
  }

  return -1;
}

function addCatalogTabs(content) {
  if (content.includes('key: "catalogue"') && content.includes('key: "boutique"')) {
    console.log("[SKIP] catalogue/boutique tabs already present");
    return content;
  }

  const lines = content.split("\n");

  const descriptionKeyIndex = lines.findIndex((line) =>
    line.includes('key: "description"')
  );

  if (descriptionKeyIndex === -1) {
    throw new Error(
      '[Q16C1B] Onglet "description" introuvable. Impossible d’insérer les onglets catalogue/boutique.'
    );
  }

  const insertAt = findObjectStart(lines, descriptionKeyIndex);

  if (insertAt === -1) {
    throw new Error("[Q16C1B] Début de l’onglet description introuvable.");
  }

  const tabsBlock = [
    `      {`,
    `        key: "catalogue",`,
    `        label: "Catalogue",`,
    ``,
    `        fields: [`,
    `          "contenance",`,
    `          "uniteContenance",`,
    `          "poids",`,
    `          "unitePoids",`,
    `          "taille",`,
    `          "couleur",`,
    `          "modele",`,
    `          "compatibilites",`,
    `        ],`,
    ``,
    `        sections: [`,
    `          {`,
    `            key: "caracteristiques",`,
    `            title: "Caractéristiques",`,
    `            fields: [`,
    `              "contenance",`,
    `              "uniteContenance",`,
    `              "poids",`,
    `              "unitePoids",`,
    `              "taille",`,
    `              "couleur",`,
    `              "modele",`,
    `              "compatibilites",`,
    `            ],`,
    `          },`,
    `        ],`,
    `      },`,
    ``,
    `      {`,
    `        key: "boutique",`,
    `        label: "Boutique",`,
    ``,
    `        fields: [`,
    `          "visibleBoutique",`,
    `          "slugBoutique",`,
    `          "seoTitle",`,
    `          "seoDescription",`,
    `          "imageOriginalUrl",`,
    `          "imageThumbnailUrl",`,
    `          "imageMediumUrl",`,
    `          "imageLargeUrl",`,
    `          "imageAlt",`,
    `          "imageStoragePath",`,
    `        ],`,
    ``,
    `        sections: [`,
    `          {`,
    `            key: "publication",`,
    `            title: "Publication web",`,
    `            fields: [`,
    `              "visibleBoutique",`,
    `              "slugBoutique",`,
    `              "seoTitle",`,
    `              "seoDescription",`,
    `            ],`,
    `          },`,
    `          {`,
    `            key: "image",`,
    `            title: "Image produit",`,
    `            fields: [`,
    `              "imageOriginalUrl",`,
    `              "imageThumbnailUrl",`,
    `              "imageMediumUrl",`,
    `              "imageLargeUrl",`,
    `              "imageAlt",`,
    `              "imageStoragePath",`,
    `            ],`,
    `          },`,
    `        ],`,
    `      },`,
    ``,
  ];

  lines.splice(insertAt, 0, ...tabsBlock);

  return lines.join("\n");
}

backup(file);

let content = read(file);

content = addCatalogTabs(content);

write(file, content);

console.log("");
console.log("[Q16C1B_DONE] Onglets Catalogue/Boutique ajoutés à produitsauto.");
console.log("");
console.log("Next:");
console.log("  pnpm build");