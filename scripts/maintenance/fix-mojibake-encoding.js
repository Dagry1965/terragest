const fs = require("fs");
const path = require("path");

const root = "C:\\Users\\Admin\\terragest\\src";

const replacements = [
  ["\u00c3\u0192\u00c2\u00a9", "\u00e9"],
  ["\u00c3\u0192\u00c2\u00a8", "\u00e8"],
  ["\u00c3\u0192\u00c2\u00aa", "\u00ea"],
  ["\u00c3\u0192\u00c2\u00a0", "\u00e0"],
  ["\u00c3\u0192\u00c2\u00a2", "\u00e2"],
  ["\u00c3\u0192\u00c2\u00b4", "\u00f4"],
  ["\u00c3\u0192\u00c2\u00a7", "\u00e7"],
  ["\u00c3\u0192\u00c2\u00bb", "\u00fb"],
  ["\u00c3\u0192\u00c2\u00b9", "\u00f9"],
  ["\u00c3\u0192\u00c2\u0089", "\u00c9"],

  ["\u00c3\u00a9", "\u00e9"],
  ["\u00c3\u00a8", "\u00e8"],
  ["\u00c3\u00aa", "\u00ea"],
  ["\u00c3\u00a0", "\u00e0"],
  ["\u00c3\u00a2", "\u00e2"],
  ["\u00c3\u00b4", "\u00f4"],
  ["\u00c3\u00a7", "\u00e7"],
  ["\u00c3\u00bb", "\u00fb"],
  ["\u00c3\u00b9", "\u00f9"],
  ["\u00c3\u0089", "\u00c9"],

  ["\u00e2\u20ac\u2122", "'"],
  ["\u00e2\u20ac\u0153", "\""],
  ["\u00e2\u20ac\u009d", "\""],
  ["\u00e2\u20ac\u201c", "-"],
  ["\u00e2\u20ac\u201d", "-"],
  ["\u00e2\u2020\u2019", "\u2192"],

  ["\u00c2", ""]
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (!full.endsWith(".ts") && !full.endsWith(".tsx")) {
      continue;
    }

    let content = fs.readFileSync(full, "utf8");
    const original = content;

    for (const [bad, good] of replacements) {
      content = content.split(bad).join(good);
    }

    if (content !== original) {
      fs.copyFileSync(full, `${full}.bak-encoding`);
      fs.writeFileSync(full, content, "utf8");
      console.log("FIXED", full);
    }
  }
}

walk(root);

console.log("OK - mojibake fixed");