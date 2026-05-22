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

function findFunctionBlock(content, marker) {
  const start = content.indexOf(marker);

  if (start === -1) {
    throw new Error(`Marker not found: ${marker}`);
  }

  const firstBrace = content.indexOf("{", start);

  if (firstBrace === -1) {
    throw new Error(`Opening brace not found for: ${marker}`);
  }

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let index = firstBrace; index < content.length; index += 1) {
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
          /[\s;]/.test(content[end])
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

  throw new Error(`Closing brace not found for: ${marker}`);
}

const target = "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts";
const suffix = "q19h0b-replace-rdv-slot-label";

backup(target, suffix);

let content = read(target);

const marker = "const rendezvousSlotLabel = () =>";
const found = findFunctionBlock(content, marker);

const nextFunction = `const rendezvousSlotLabel = () => {
      // Generic business-time label.
      // Never use startAt/endAt ISO for visible RDV labels because ISO is UTC-based.
      // Visible labels must come from local business fields:
      // heureRendezVous + durationMinutes.
      const start =
        normalizeTimeLabel(
          value("heureRendezVous") ||
          value("heureRdv") ||
          value("heure")
        );

      const duration =
        Number(
          value("durationMinutes") ||
          60
        );

      const end =
        addMinutesToTimeLabel(
          start,
          duration
        );

      if (start && end) {
        return start + " → " + end;
      }

      return start;
    };`;

content =
  content.slice(0, found.start) +
  nextFunction +
  content.slice(found.end);

write(target, content);

console.log("");
console.log("[Q19H0B_DONE] RDV slot label now ignores ISO startAt/endAt completely.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester locked RDV relation label in intervention form");