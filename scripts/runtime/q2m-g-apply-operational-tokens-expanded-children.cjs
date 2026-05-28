const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalExpandedChildren.tsx"
);

const tokensFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "operational",
  "operationalUiTokens.ts"
);

const backup = `${target}.bak-q2m-g-apply-operational-tokens-expanded-children`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function info(message) {
  console.log(`[INFO] ${message}`);
}

if (!fs.existsSync(target)) {
  fail(`Target not found: ${target}`);
}

if (!fs.existsSync(tokensFile)) {
  fail(`Tokens file not found: ${tokensFile}`);
}

const original = fs.readFileSync(target, "utf8");

if (original.includes("RuntimeOperationalChildrenResolver")) {
  info("Resolver reference detected. Script will not modify resolver usage.");
}

if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, original, "utf8");
  ok(`Backup created: ${path.relative(root, backup)}`);
} else {
  info(`Backup already exists: ${path.relative(root, backup)}`);
}

let next = original;

const tokenImport = `import { operationalUiTokens } from "./operationalUiTokens";`;

if (!next.includes(tokenImport)) {
  const importLines = next.match(/^import[\s\S]*?;\n+/gm);
  if (!importLines || importLines.length === 0) {
    fail("No import block found. Manual inspection required.");
  }

  const lastImport = importLines[importLines.length - 1];
  next = next.replace(lastImport, `${lastImport}${tokenImport}\n`);
  ok("Added operationalUiTokens import");
} else {
  info("operationalUiTokens import already present");
}

const helperBlock = `
const getOperationalToken = (path: string, fallback: string): string => {
  const value = path
    .split(".")
    .reduce<unknown>((acc, key) => {
      if (!acc || typeof acc !== "object") {
        return undefined;
      }

      return (acc as Record<string, unknown>)[key];
    }, operationalUiTokens);

  return typeof value === "string" ? value : fallback;
};

const expandedChildrenTokens = {
  wrapper: getOperationalToken(
    "expandedChildren.wrapper",
    "rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
  ),
  section: getOperationalToken(
    "expandedChildren.section",
    "rounded-xl border border-slate-100 bg-slate-50/70 p-3"
  ),
  header: getOperationalToken(
    "expandedChildren.header",
    "mb-3 flex items-center justify-between gap-3"
  ),
  title: getOperationalToken(
    "expandedChildren.title",
    "text-sm font-semibold text-slate-900"
  ),
  subtitle: getOperationalToken(
    "expandedChildren.subtitle",
    "text-xs text-slate-500"
  ),
  list: getOperationalToken(
    "expandedChildren.list",
    "space-y-2"
  ),
  item: getOperationalToken(
    "expandedChildren.item",
    "rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40"
  ),
  itemTitle: getOperationalToken(
    "expandedChildren.itemTitle",
    "text-sm font-medium text-slate-900"
  ),
  itemMeta: getOperationalToken(
    "expandedChildren.itemMeta",
    "text-xs text-slate-500"
  ),
  empty: getOperationalToken(
    "expandedChildren.empty",
    "rounded-xl border border-dashed border-slate-200 bg-white/70 px-3 py-4 text-sm text-slate-500"
  ),
  action: getOperationalToken(
    "expandedChildren.action",
    "inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
  ),
};
`;

if (!next.includes("expandedChildrenTokens")) {
  const firstNonImportIndex = next.search(/^(?!import\s)/m);

  if (firstNonImportIndex === -1) {
    fail("Unable to locate insertion point for expandedChildrenTokens.");
  }

  next =
    next.slice(0, firstNonImportIndex) +
    helperBlock +
    "\n" +
    next.slice(firstNonImportIndex);

  ok("Added safe token resolver and expandedChildrenTokens");
} else {
  info("expandedChildrenTokens already present");
}

const replacements = [
  {
    name: "generic outer rounded white card",
    from: /className="rounded-2xl border border-slate-200 bg-white\/90 p-4 shadow-sm"/g,
    to: 'className={expandedChildrenTokens.wrapper}',
  },
  {
    name: "generic section card",
    from: /className="rounded-xl border border-slate-100 bg-slate-50\/70 p-3"/g,
    to: 'className={expandedChildrenTokens.section}',
  },
  {
    name: "generic header",
    from: /className="mb-3 flex items-center justify-between gap-3"/g,
    to: 'className={expandedChildrenTokens.header}',
  },
  {
    name: "generic title",
    from: /className="text-sm font-semibold text-slate-900"/g,
    to: 'className={expandedChildrenTokens.title}',
  },
  {
    name: "generic subtitle",
    from: /className="text-xs text-slate-500"/g,
    to: 'className={expandedChildrenTokens.subtitle}',
  },
  {
    name: "generic list spacing",
    from: /className="space-y-2"/g,
    to: 'className={expandedChildrenTokens.list}',
  },
  {
    name: "generic child item",
    from: /className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50\/40"/g,
    to: 'className={expandedChildrenTokens.item}',
  },
  {
    name: "generic item title",
    from: /className="text-sm font-medium text-slate-900"/g,
    to: 'className={expandedChildrenTokens.itemTitle}',
  },
  {
    name: "generic item meta",
    from: /className="text-xs text-slate-500"/g,
    to: 'className={expandedChildrenTokens.itemMeta}',
  },
  {
    name: "generic empty state",
    from: /className="rounded-xl border border-dashed border-slate-200 bg-white\/70 px-3 py-4 text-sm text-slate-500"/g,
    to: 'className={expandedChildrenTokens.empty}',
  },
  {
    name: "generic open action",
    from: /className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2\.5 py-1\.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"/g,
    to: 'className={expandedChildrenTokens.action}',
  },
];

let replacementCount = 0;

for (const replacement of replacements) {
  const before = next;
  next = next.replace(replacement.from, replacement.to);

  if (before !== next) {
    replacementCount += 1;
    ok(`Applied replacement: ${replacement.name}`);
  }
}

if (next === original) {
  fail("No change produced. Manual inspection required before continuing.");
}

fs.writeFileSync(target, next, "utf8");

ok(`Written: ${path.relative(root, target)}`);
info(`Replacement groups applied: ${replacementCount}`);
info("Next: pnpm build");