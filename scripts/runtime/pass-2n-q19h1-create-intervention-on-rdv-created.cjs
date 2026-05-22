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

function findObjectBlock(content, marker) {
  const markerIndex = content.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`Marker not found: ${marker}`);
  }

  let start = content.lastIndexOf("{", markerIndex);

  if (start === -1) {
    throw new Error(`Object start not found for marker: ${marker}`);
  }

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let index = start; index < content.length; index += 1) {
    const char = content[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        inString = false;
        quote = "";
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        let end = index + 1;

        while (
          end < content.length &&
          /[\s,]/.test(content[end])
        ) {
          end += 1;
        }

        return {
          start,
          end,
          block: content.slice(start, end),
        };
      }
    }
  }

  throw new Error(`Object end not found for marker: ${marker}`);
}

const target = "src/runtime/business-rules/runtimeBusinessRules.ts";
const suffix = "q19h1-create-intervention-on-rdv-created";

backup(target, suffix);

let content = read(target);

if (
  content.includes('"amarkhys-rdv-create-intervention-on-create"')
) {
  console.log("[SKIP] created rule already exists.");
  process.exit(0);
}

const updatedRule =
  findObjectBlock(
    content,
    '"amarkhys-rdv-create-intervention"'
  );

let createdRule =
  updatedRule.block
    .replace(
      '"amarkhys-rdv-create-intervention"',
      '"amarkhys-rdv-create-intervention-on-create"'
    )
    .replace(
      '"rendezvous.updated"',
      '"rendezvous.created"'
    );

createdRule =
  createdRule.replace(
    /\/\/ AMARKHYS[\s\S]*?\/\/ RDV CONFIRME -> INTERVENTION[\s\S]*?\/\/ =====================================================\s*/m,
    ""
  );

const insertion =
  `// =====================================================
// AMARKHYS
// RDV CREE CONFIRME -> INTERVENTION
// =====================================================

${createdRule}
`;

content =
  content.slice(0, updatedRule.start) +
  insertion +
  "\n" +
  content.slice(updatedRule.start);

write(target, content);

console.log("");
console.log("[Q19H1_DONE] RDV created with statut=confirme now creates intervention on first save.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester create RDV confirme -> intervention immediate");