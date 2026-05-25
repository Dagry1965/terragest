const fs = require("fs");
const path = require("path");

const root = process.cwd();

const includeDirs = [
  "src/runtime",
  "src/components/erp",
  "src/app",
];

const ignoreDirs = [
  ".next",
  "node_modules",
  ".git",
];

const extensions = new Set([
  ".ts",
  ".tsx",
]);

const patterns = [
  {
    key: "RuntimeRelationLabelResolver",
    label: "Resolver labels relationnels Q22E-8B",
    regex: /RuntimeRelationLabelResolver/g,
  },
  {
    key: "ERPRelationDataLoader",
    label: "Loader relationnel existant formulaire/select",
    regex: /ERPRelationDataLoader/g,
  },
  {
    key: "ERPRelationResolver",
    label: "Resolver relationnel existant",
    regex: /ERPRelationResolver/g,
  },
  {
    key: "RuntimeContextEnforcer",
    label: "Contexte runtime parent/enfant",
    regex: /RuntimeContextEnforcer/g,
  },
  {
    key: "processRuntimeBeforeMutationGuards",
    label: "Guards mutation runtime",
    regex: /processRuntimeBeforeMutationGuards/g,
  },
  {
    key: "parentRecordId",
    label: "Parent record id",
    regex: /parentRecordId/g,
  },
  {
    key: "parentModuleKey",
    label: "Parent module key",
    regex: /parentModuleKey/g,
  },
  {
    key: "parentForeignKey",
    label: "Parent foreign key",
    regex: /parentForeignKey/g,
  },
  {
    key: "composition.children",
    label: "Composition enfants",
    regex: /composition[\s\S]{0,80}children|children:\s*\[/g,
  },
  {
    key: "prefillFromParent",
    label: "Préremplissage depuis parent",
    regex: /prefillFromParent/g,
  },
  {
    key: "lockFields",
    label: "Verrouillage champs contexte",
    regex: /lockFields/g,
  },
  {
    key: "foreignKey",
    label: "Clés étrangères enfants",
    regex: /foreignKey/g,
  },
  {
    key: "requiresParentContext",
    label: "Parent obligatoire",
    regex: /requiresParentContext/g,
  },
  {
    key: "allowedParents",
    label: "Parents autorisés",
    regex: /allowedParents/g,
  },
  {
    key: "ERPRelatedRecordsPanel",
    label: "Panneaux enfants liés",
    regex: /ERPRelatedRecordsPanel/g,
  },
  {
    key: "ERPContextBanner",
    label: "Bandeau contexte métier",
    regex: /ERPContextBanner/g,
  },
  {
    key: "contextBanner",
    label: "Metadata contextBanner",
    regex: /contextBanner/g,
  },
  {
    key: "labelFields",
    label: "Labels métier metadata",
    regex: /labelFields/g,
  },
  {
    key: "subtitleFields",
    label: "Sous-labels metadata",
    regex: /subtitleFields/g,
  },
  {
    key: "relation:",
    label: "Déclarations relation",
    regex: /relation\s*:/g,
  },
  {
    key: "filterBy",
    label: "Filtres relationnels dépendants",
    regex: /filterBy/g,
  },
  {
    key: "RuntimeDataBinding.list",
    label: "Chargement générique de collections",
    regex: /RuntimeDataBinding\.list/g,
  },
];

function shouldIgnore(filePath) {
  return ignoreDirs.some((dir) =>
    filePath.split(path.sep).includes(dir)
  );
}

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (shouldIgnore(fullPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!extensions.has(path.extname(entry.name))) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

const allFiles =
  includeDirs.flatMap((dir) =>
    walk(path.join(root, dir))
  );

const results = new Map();

for (const pattern of patterns) {
  results.set(pattern.key, {
    ...pattern,
    matches: [],
  });
}

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const rel = path.relative(root, filePath);

  for (const pattern of patterns) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match;

    while ((match = regex.exec(content)) !== null) {
      results.get(pattern.key).matches.push({
        file: rel,
        line: lineNumberAt(content, match.index),
        text: match[0].replace(/\s+/g, " ").slice(0, 160),
      });

      if (!regex.global) {
        break;
      }
    }
  }
}

console.log("\n[Q22E-8D-A] Audit runtime relations / IDs / contexte\n");

for (const item of results.values()) {
  console.log(`\n## ${item.label}`);
  console.log(`Pattern: ${item.key}`);
  console.log(`Matches: ${item.matches.length}`);

  const grouped = new Map();

  for (const match of item.matches) {
    if (!grouped.has(match.file)) {
      grouped.set(match.file, []);
    }

    grouped.get(match.file).push(match);
  }

  for (const [file, matches] of grouped.entries()) {
    console.log(` - ${file}`);

    for (const match of matches.slice(0, 8)) {
      console.log(`   L${match.line}: ${match.text}`);
    }

    if (matches.length > 8) {
      console.log(`   ... +${matches.length - 8} autres`);
    }
  }
}

console.log("\n[RECOMMANDATION]");
console.log("- Ne pas brancher RuntimeRelationLabelResolver dans ERPRuntimeTable avant analyse.");
console.log("- Vérifier d'abord s'il faut renforcer un moteur existant : ERPRelationDataLoader, ERPRelationResolver, RuntimeContextEnforcer, ou créer un RuntimeRecordDisplayResolver commun.");
console.log("- Objectif : un seul mécanisme générique pour labels, IDs, parent/enfant, frères, petits-fils.");