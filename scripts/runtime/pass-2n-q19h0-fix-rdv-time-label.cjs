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

function replaceRegexRequired(content, regex, replacement, label) {
  if (!regex.test(content)) {
    throw new Error(`Pattern not found: ${label}`);
  }

  return content.replace(regex, replacement);
}

const target = "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts";
const suffix = "q19h0-fix-rdv-time-label";

backup(target, suffix);

let content = read(target);

content = replaceRegexRequired(
  content,
  /      const end\s*=\s*[\s\S]*?addMinutesToTimeLabel\(start,\s*duration\);/m,
  `      // Do not derive visible business time from endAt ISO.
      // endAt is stored for scheduling/conflict checks and may be UTC-shifted.
      // The user-facing slot must be built from the local business time.
      const end =
        addMinutesToTimeLabel(start, duration);`,
  "rendezvousSlotLabel endAt display"
);

write(target, content);

console.log("");
console.log("[Q19H0_DONE] RDV visible time label now uses local business time + duration.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester RDV form/list/relation labels");