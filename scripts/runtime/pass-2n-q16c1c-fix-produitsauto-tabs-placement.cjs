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
  const backupPath = filePath + ".bak-q16c1c-fix-tabs-placement";
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log("[BACKUP]", path.relative(ROOT, backupPath));
  }
}

function removeObjectByKey(content, key) {
  let index = content.indexOf(`key: "${key}"`);

  while (index !== -1) {
    let start = content.lastIndexOf("{", index);
    if (start === -1) {
      return content;
    }

    let depth = 0;
    let end = -1;

    for (let i = start; i < content.length; i += 1) {
      const char = content[i];

      if (char === "{") {
        depth += 1;
      }

      if (char === "}") {
        depth -= 1;

        if (depth === 0) {
          end = i + 1;

          while (
            end < content.length &&
            (content[end] === "," ||
              content[end] === "\n" ||
              content[end] === "\r" ||
              content[end] === " ")
          ) {
            if (content[end] === "," || content[end] === "\n") {
              end += 1;
              break;
            }

            end += 1;
          }

          break;
        }
      }
    }

    if (end === -1) {
      return content;
    }

    content = content.slice(0, start) + content.slice(end);
    index = content.indexOf(`key: "${key}"`);
  }

  return content;
}

function findMatchingBracket(content, openIndex) {
  let depth = 0;

  for (let i = openIndex; i < content.length; i += 1) {
    const char = content[i];

    if (char === "[") {
      depth += 1;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return i;
      }
    }
  }

  return -1;
}

function extractFormTabsRange(content) {
  const formIndex = content.indexOf("form:");
  if (formIndex === -1) {
    throw new Error("[Q16C1C] form: introuvable");
  }

  const tabsIndex = content.indexOf("tabs:", formIndex);
  if (tabsIndex === -1) {
    throw new Error("[Q16C1C] form.tabs introuvable");
  }

  const openBracket = content.indexOf("[", tabsIndex);
  if (openBracket === -1) {
    throw new Error("[Q16C1C] crochet ouvrant tabs introuvable");
  }

  const closeBracket = findMatchingBracket(content, openBracket);
  if (closeBracket === -1) {
    throw new Error("[Q16C1C] crochet fermant tabs introuvable");
  }

  return {
    start: openBracket,
    end: closeBracket,
    tabsContent: content.slice(openBracket + 1, closeBracket),
  };
}

function addTabsInsideForm(content) {
  const range = extractFormTabsRange(content);

  if (
    range.tabsContent.includes('key: "catalogue"') &&
    range.tabsContent.includes('key: "boutique"')
  ) {
    console.log("[SKIP] catalogue/boutique already inside form.tabs");
    return content;
  }

  const descriptionIndexInTabs =
    range.tabsContent.indexOf('key: "description"');

  if (descriptionIndexInTabs === -1) {
    throw new Error('[Q16C1C] Onglet "description" introuvable dans form.tabs');
  }

  const insertAtInTabs =
    range.tabsContent.lastIndexOf("{", descriptionIndexInTabs);

  if (insertAtInTabs === -1) {
    throw new Error("[Q16C1C] début objet description introuvable");
  }

  const tabsBlock = `
      {
        key: "catalogue",
        label: "Catalogue",

        fields: [
          "contenance",
          "uniteContenance",
          "poids",
          "unitePoids",
          "taille",
          "couleur",
          "modele",
          "compatibilites",
        ],

        sections: [
          {
            key: "caracteristiques",
            title: "Caractéristiques",
            fields: [
              "contenance",
              "uniteContenance",
              "poids",
              "unitePoids",
              "taille",
              "couleur",
              "modele",
              "compatibilites",
            ],
          },
        ],
      },

      {
        key: "boutique",
        label: "Boutique",

        fields: [
          "visibleBoutique",
          "slugBoutique",
          "seoTitle",
          "seoDescription",
          "imageOriginalUrl",
          "imageThumbnailUrl",
          "imageMediumUrl",
          "imageLargeUrl",
          "imageAlt",
          "imageStoragePath",
        ],

        sections: [
          {
            key: "publication",
            title: "Publication web",
            fields: [
              "visibleBoutique",
              "slugBoutique",
              "seoTitle",
              "seoDescription",
            ],
          },
          {
            key: "image",
            title: "Image produit",
            fields: [
              "imageOriginalUrl",
              "imageThumbnailUrl",
              "imageMediumUrl",
              "imageLargeUrl",
              "imageAlt",
              "imageStoragePath",
            ],
          },
        ],
      },

`;

  const nextTabsContent =
    range.tabsContent.slice(0, insertAtInTabs) +
    tabsBlock +
    range.tabsContent.slice(insertAtInTabs);

  return (
    content.slice(0, range.start + 1) +
    nextTabsContent +
    content.slice(range.end)
  );
}

backup(file);

let content = read(file);

// Supprime les blocs onglets placés par erreur dans schema.fields ou ailleurs.
content = removeObjectByKey(content, "catalogue");
content = removeObjectByKey(content, "boutique");

// Réinsère proprement dans form.tabs.
content = addTabsInsideForm(content);

write(file, content);

console.log("");
console.log("[Q16C1C_DONE] Catalogue/Boutique déplacés dans form.tabs.");
console.log("");
console.log("Next:");
console.log("  pnpm build");