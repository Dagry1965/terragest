const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  modulePage: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalModulePage.tsx"),
  filters: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalFilters.tsx"),
  table: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalTable.tsx"),
};

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function printAround(label, content, pattern, before = 20, after = 60) {
  const lines = content.split(/\r?\n/);
  const indexes = [];

  lines.forEach((line, index) => {
    if (line.includes(pattern)) indexes.push(index);
  });

  console.log("");
  console.log(`[${label}] PATTERN ${pattern}`);
  console.log(`[MATCHES] ${indexes.length}`);

  for (const index of indexes) {
    console.log("");
    console.log(`[AROUND LINE ${index + 1}]`);

    const start = Math.max(0, index - before);
    const end = Math.min(lines.length, index + after + 1);

    for (let i = start; i < end; i++) {
      console.log(String(i + 1).padStart(4, " ") + ": " + lines[i]);
    }
  }
}

const modulePage = read(files.modulePage);
const filters = read(files.filters);
const table = read(files.table);

const checks = [
  {
    label: "ModulePage has search state",
    ok: modulePage.includes("const [search") && modulePage.includes("setSearch"),
  },
  {
    label: "ModulePage filters with recordMatchesSearch",
    ok: modulePage.includes("recordMatchesSearch(record, search)"),
  },
  {
    label: "ModulePage passes search to filters",
    ok: modulePage.includes("search={search}"),
  },
  {
    label: "ModulePage passes setSearch to filters",
    ok: modulePage.includes("onSearchChange={setSearch}"),
  },
  {
    label: "ModulePage passes filteredData to table",
    ok: modulePage.includes("data={filteredData}"),
  },
  {
    label: "Filters accepts search prop",
    ok: filters.includes("search") && filters.includes("onSearchChange"),
  },
  {
    label: "Filters renders search input",
    ok: filters.includes("<input") || filters.includes("Input"),
  },
  {
    label: "Filters binds value to search",
    ok: filters.includes("value={search}") || filters.includes("value={ search }"),
  },
  {
    label: "Filters calls onSearchChange on input change",
    ok: filters.includes("onSearchChange") && filters.includes("event.target.value"),
  },
  {
    label: "Table receives data prop and maps data",
    ok: table.includes("data,") && table.includes("data.map"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-E-K] Audit operational search wiring");
console.log("");

console.log("[CHECKS]");
for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

printAround("MODULE_PAGE", modulePage, "recordMatchesSearch", 20, 70);
printAround("MODULE_PAGE", modulePage, "ERPOperationalFilters", 20, 60);
printAround("FILTERS", filters, "search", 25, 80);
printAround("FILTERS", filters, "onSearchChange", 25, 80);
printAround("FILTERS", filters, "input", 25, 80);
printAround("TABLE", table, "data.map", 25, 60);

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) process.exit(1);

console.log("");
console.log("[DONE] Search wiring audit passed.");
