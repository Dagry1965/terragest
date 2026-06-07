const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/components/erp/hub/ERPClientOperationalSheet.tsx",
  "src/runtime/hub/RuntimeClientOperationalTodayLoader.ts",
  "src/runtime/workflow-cascade/RuntimeWorkflowCascadeService.ts",
];

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(filePath(relativePath), content, "utf8");
}

function replaceOrFail(relativePath, content, from, to) {
  if (!content.includes(from)) {
    throw new Error(`[MISSING PATTERN] ${relativePath}\n${from}`);
  }

  return content.replace(from, to);
}

let changed = 0;

// 1) ERPClientOperationalSheet.tsx
{
  const relativePath = files[0];
  let content = read(relativePath);
  const before = content;

  content = replaceOrFail(
    relativePath,
    content,
`        interventionStatus.includes("terminee") ||
        interventionStatus.includes("facturee") ||
        interventionStatus.includes("termin")`,
`        interventionStatus.includes("terminee") ||
        interventionStatus.includes("termin")`
  );

  if (content !== before) {
    write(relativePath, content);
    changed++;
    console.log("[UPDATED]", relativePath);
  }
}

// 2) RuntimeClientOperationalTodayLoader.ts
{
  const relativePath = files[1];
  let content = read(relativePath);
  const before = content;

  content = replaceOrFail(
    relativePath,
    content,
`    "archivee",
    "archivÃ©e",
    "facturee",
    "facturÃ©e",`,
`    "archivee",
    "archivÃ©e",`
  );

  if (content !== before) {
    write(relativePath, content);
    changed++;
    console.log("[UPDATED]", relativePath);
  }
}

// 3) RuntimeWorkflowCascadeService.ts
{
  const relativePath = files[2];
  let content = read(relativePath);
  const before = content;

  content = replaceOrFail(
    relativePath,
    content,
`  return (
    statut === "annulee" ||
    statut === "annulÃ©e" ||
    statut === "facturee" ||
    statut === "facturÃ©e"
  );`,
`  return (
    statut === "terminee" ||
    statut === "terminÃ©e" ||
    statut === "annulee" ||
    statut === "annulÃ©e" ||
    statut === "archivee" ||
    statut === "archivÃ©e"
  );`
  );

  if (content !== before) {
    write(relativePath, content);
    changed++;
    console.log("[UPDATED]", relativePath);
  }
}

console.log("[Q2-L-B3-G2] Changed files:", changed);