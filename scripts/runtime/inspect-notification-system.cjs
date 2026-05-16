const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const folders = [
  "src/runtime",
  "src/components/erp",
  "src/features",
];

const patterns = [
  "notification",
  "Notification",
  "notify",
  "toast",
  "ERPNotification",
  "RuntimeNotification",
  "NotificationRuntime",
  "notifications",
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, files);
    } else if (
      entry.name.endsWith(".ts") ||
      entry.name.endsWith(".tsx")
    ) {
      files.push(full);
    }
  }

  return files;
}

const files = folders.flatMap((folder) => walk(path.join(ROOT, folder)));

console.log("");
console.log("=== INSPECTION NOTIFICATION SYSTEM ===");
console.log("");

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        hits.push({
          line: index + 1,
          pattern,
          text: line.trim(),
        });
      }
    }
  });

  if (hits.length > 0) {
    console.log("FILE:", path.relative(ROOT, file));

    for (const hit of hits) {
      console.log(`  L${hit.line} [${hit.pattern}] ${hit.text}`);
    }

    console.log("");
  }
}