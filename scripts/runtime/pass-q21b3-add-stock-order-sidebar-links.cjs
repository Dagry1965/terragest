const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/shell/ErpSidebar.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21b3-add-stock-order-sidebar-links`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21b3-add-stock-order-sidebar-links`);
}

let content = fs.readFileSync(file, "utf8");

// Add AMARKHYS stock order links after Stocks.
// Do not expose lignescommandestockauto in the main menu: it is a child module.
if (!content.includes(`key: "fournisseursauto"`)) {
  content = content.replace(
    `  {
    key: "stocksauto",
    label: "Stocks",
    href: "/stocksauto",
  },
];`,
    `  {
    key: "stocksauto",
    label: "Stocks",
    href: "/stocksauto",
  },
  {
    key: "fournisseursauto",
    label: "Fournisseurs",
    href: "/fournisseursauto",
  },
  {
    key: "commandesstockauto",
    label: "Commandes stock",
    href: "/commandesstockauto",
  },
  {
    key: "receptionsstockauto",
    label: "Receptions stock",
    href: "/receptionsstockauto",
  },
];`
  );
}

// Make new AMARKHYS routes activate the AMARKHYS sidebar.
if (!content.includes(`pathname === "/fournisseursauto"`)) {
  content = content.replace(
    `    pathname === "/stocksauto" ||
    pathname.startsWith("/stocksauto/")
  );`,
    `    pathname === "/stocksauto" ||
    pathname.startsWith("/stocksauto/") ||
    pathname === "/fournisseursauto" ||
    pathname.startsWith("/fournisseursauto/") ||
    pathname === "/commandesstockauto" ||
    pathname.startsWith("/commandesstockauto/") ||
    pathname === "/lignescommandestockauto" ||
    pathname.startsWith("/lignescommandestockauto/") ||
    pathname === "/receptionsstockauto" ||
    pathname.startsWith("/receptionsstockauto/")
  );`
  );
}

// Small encoding cleanup in visible labels already present.
content = content
  .split(`label: "VÃ©hicules"`)
  .join(`label: "Vehicules"`)
  .split(`accÃ¨s Ã `)
  .join(`acces a`);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21B3_DONE] Stock order sidebar links added.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test sidebar on /commandesstockauto");