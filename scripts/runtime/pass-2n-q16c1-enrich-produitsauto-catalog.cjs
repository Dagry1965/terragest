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
  const backupPath = filePath + ".bak-q16c1-catalog-v2";
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

function insertSchemaFields(content) {
  if (content.includes('key: "typeRecord"')) {
    console.log("[SKIP] Schema already contains catalog fields");
    return content;
  }

  const lines = content.split("\n");

  const markerCandidates = [
    'key: "categorie"',
    'key: "typeProduit"',
    'key: "unite"',
    'key: "prixAchat"',
  ];

  let insertAt = -1;

  for (const marker of markerCandidates) {
    const keyLineIndex = lines.findIndex((line) => line.includes(marker));

    if (keyLineIndex !== -1) {
      insertAt = findObjectStart(lines, keyLineIndex);
      break;
    }
  }

  if (insertAt === -1) {
    throw new Error(
      "[Q16C1] Aucun marqueur trouvé pour insérer les champs catalogue. Lance: Select-String -Path .\\src\\runtime\\modules\\generated\\produitsauto\\produitsauto.module.ts -Pattern 'key:'"
    );
  }

  const fieldsBlock = [
    `      {`,
    `        key: "typeRecord",`,
    `        label: "Type fiche",`,
    `        type: "select",`,
    `        defaultValue: "simple",`,
    `        options: [`,
    `          { label: "Produit simple", value: "simple" },`,
    `          { label: "Famille", value: "family" },`,
    `          { label: "Variante", value: "variant" },`,
    `        ],`,
    `        list: { order: 0 },`,
    `        grid: { cols: 6 },`,
    `      },`,
    `      {`,
    `        key: "parentProductId",`,
    `        label: "Famille produit",`,
    `        type: "relation",`,
    `        relation: { module: "produitsauto" },`,
    `        searchable: true,`,
    `        grid: { cols: 6 },`,
    `      },`,
    `      {`,
    `        key: "typeArticle",`,
    `        label: "Type article",`,
    `        type: "select",`,
    `        defaultValue: "piece",`,
    `        options: [`,
    `          { label: "Pièce", value: "piece" },`,
    `          { label: "Main d’œuvre", value: "main_oeuvre" },`,
    `          { label: "Service", value: "service" },`,
    `          { label: "Remise", value: "remise" },`,
    `        ],`,
    `        list: { order: 3 },`,
    `        grid: { cols: 6 },`,
    `      },`,
    `      {`,
    `        key: "sousCategorie",`,
    `        label: "Sous-catégorie",`,
    `        type: "text",`,
    `        searchable: true,`,
    `        list: { order: 5 },`,
    `        grid: { cols: 6 },`,
    `      },`,
    `      {`,
    `        key: "tauxTVA",`,
    `        label: "Taux TVA",`,
    `        type: "number",`,
    `        defaultValue: 18,`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "prixPromo",`,
    `        label: "Prix promotionnel",`,
    `        type: "number",`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "stockable",`,
    `        label: "Stockable",`,
    `        type: "checkbox",`,
    `        defaultValue: true,`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "contenance",`,
    `        label: "Contenance",`,
    `        type: "number",`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "uniteContenance",`,
    `        label: "Unité contenance",`,
    `        type: "select",`,
    `        options: [`,
    `          { label: "ml", value: "ml" },`,
    `          { label: "L", value: "L" },`,
    `        ],`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "poids",`,
    `        label: "Poids",`,
    `        type: "number",`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "unitePoids",`,
    `        label: "Unité poids",`,
    `        type: "select",`,
    `        options: [`,
    `          { label: "g", value: "g" },`,
    `          { label: "kg", value: "kg" },`,
    `        ],`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "taille",`,
    `        label: "Taille",`,
    `        type: "text",`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "couleur",`,
    `        label: "Couleur",`,
    `        type: "text",`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "modele",`,
    `        label: "Modèle",`,
    `        type: "text",`,
    `        searchable: true,`,
    `        grid: { cols: 6 },`,
    `      },`,
    `      {`,
    `        key: "compatibilites",`,
    `        label: "Compatibilités",`,
    `        type: "textarea",`,
    `        grid: { cols: 12 },`,
    `      },`,
    `      {`,
    `        key: "visibleBoutique",`,
    `        label: "Visible boutique",`,
    `        type: "checkbox",`,
    `        defaultValue: false,`,
    `        grid: { cols: 4 },`,
    `      },`,
    `      {`,
    `        key: "slugBoutique",`,
    `        label: "Slug boutique",`,
    `        type: "text",`,
    `        searchable: true,`,
    `        grid: { cols: 8 },`,
    `      },`,
    `      {`,
    `        key: "seoTitle",`,
    `        label: "Titre SEO",`,
    `        type: "text",`,
    `        grid: { cols: 6 },`,
    `      },`,
    `      {`,
    `        key: "seoDescription",`,
    `        label: "Description SEO",`,
    `        type: "textarea",`,
    `        grid: { cols: 12 },`,
    `      },`,
    `      {`,
    `        key: "imageOriginalUrl",`,
    `        label: "Image originale",`,
    `        type: "text",`,
    `        grid: { cols: 12 },`,
    `      },`,
    `      {`,
    `        key: "imageThumbnailUrl",`,
    `        label: "Image miniature",`,
    `        type: "text",`,
    `        grid: { cols: 12 },`,
    `      },`,
    `      {`,
    `        key: "imageMediumUrl",`,
    `        label: "Image moyenne",`,
    `        type: "text",`,
    `        grid: { cols: 12 },`,
    `      },`,
    `      {`,
    `        key: "imageLargeUrl",`,
    `        label: "Image large",`,
    `        type: "text",`,
    `        grid: { cols: 12 },`,
    `      },`,
    `      {`,
    `        key: "imageAlt",`,
    `        label: "Texte alternatif image",`,
    `        type: "text",`,
    `        grid: { cols: 12 },`,
    `      },`,
    `      {`,
    `        key: "imageStoragePath",`,
    `        label: "Chemin stockage image",`,
    `        type: "text",`,
    `        grid: { cols: 12 },`,
    `      },`,
  ];

  lines.splice(insertAt, 0, ...fieldsBlock);

  return lines.join("\n");
}

function appendMissingField(block, field, beforeField = null) {
  if (block.includes(`"${field}"`)) {
    return block;
  }

  const line = `              "${field}",`;

  if (beforeField && block.includes(`"${beforeField}"`)) {
    return block.replace(
      new RegExp(`(\\s*"${beforeField}",)`),
      `\n${line}$1`
    );
  }

  return block.replace(/\n\s*\],/, `\n${line}\n            ],`);
}

function enrichFirstMatchingFieldsBlock(content, requiredFields, fieldsToAdd, label) {
  const regex = /fields:\s*\[[\s\S]*?\]/g;
  const matches = [...content.matchAll(regex)];

  for (const match of matches) {
    const block = match[0];

    const matchesAllRequired = requiredFields.every((field) =>
      block.includes(`"${field}"`)
    );

    if (!matchesAllRequired) {
      continue;
    }

    let nextBlock = block;

    for (const item of fieldsToAdd) {
      nextBlock = appendMissingField(
        nextBlock,
        item.field,
        item.before
      );
    }

    if (nextBlock !== block) {
      return content.replace(block, nextBlock);
    }

    console.log("[SKIP]", label, "already enriched");
    return content;
  }

  console.log("[WARN] fields block not found:", label);
  return content;
}

function insertCatalogTabs(content) {
  if (content.includes('key: "catalogue"')) {
    console.log("[SKIP] catalogue/boutique tabs already present");
    return content;
  }

  const lines = content.split("\n");
  const notesKeyIndex = lines.findIndex((line) =>
    line.includes('key: "notes"')
  );

  if (notesKeyIndex === -1) {
    console.log("[WARN] notes tab not found, form tabs not patched");
    return content;
  }

  const tabStartIndex = findObjectStart(lines, notesKeyIndex);

  if (tabStartIndex === -1) {
    console.log("[WARN] notes tab start not found, form tabs not patched");
    return content;
  }

  const catalogTabs = [
    `      {`,
    `        key: "catalogue",`,
    `        label: "Catalogue",`,
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

  lines.splice(tabStartIndex, 0, ...catalogTabs);

  return lines.join("\n");
}

backup(file);

let content = read(file);

content = insertSchemaFields(content);

content = enrichFirstMatchingFieldsBlock(
  content,
  ["reference", "nom"],
  [
    { field: "typeRecord", before: "categorie" },
    { field: "parentProductId", before: "categorie" },
    { field: "typeArticle", before: "categorie" },
    { field: "sousCategorie", before: "typeProduit" },
    { field: "stockable", before: "unite" },
  ],
  "main infos"
);

content = enrichFirstMatchingFieldsBlock(
  content,
  ["prixAchat", "prixVente"],
  [
    { field: "tauxTVA", before: "seuilMinimum" },
    { field: "prixPromo", before: "seuilMinimum" },
  ],
  "prices"
);

content = insertCatalogTabs(content);

write(file, content);

console.log("");
console.log("[Q16C1_DONE] produitsauto enriched as central catalogue.");
console.log("");
console.log("Next:");
console.log("  pnpm build");