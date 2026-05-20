const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimePage.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q12e-wire-related-records-fix`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// 1. Import du panneau générique
if (!content.includes("./ERPRelatedRecordsPanel")) {
  content = content.replace(
    /import\s+\{\s*ERPRuntimeTable\s*\}\s+from\s+"\.\/ERPRuntimeTable";/,
    `import { ERPRuntimeTable } from "./ERPRuntimeTable";
import { ERPRelatedRecordsPanel } from "./ERPRelatedRecordsPanel";`
  );
}

// 2. Ajout des children calculés après invoicePaymentHref
if (!content.includes("const relatedChildren =")) {
  const markerRegex =
    /const invoicePaymentHref\s*=\s*[\s\S]*?\?\s*buildInvoicePaymentHref\(record\)\s*:\s*"#";/m;

  const match = content.match(markerRegex);

  if (!match) {
    throw new Error("Marqueur invoicePaymentHref introuvable.");
  }

  const helper = `

  const relatedChildren =
    module?.composition?.children?.filter((child) => {
      if (!record) {
        return false;
      }

      if (type !== "detail" && type !== "edit") {
        return false;
      }

      return (child.displayIn ?? ["detail"]).includes(
        type as "detail" | "edit"
      );
    }) ?? [];

  const relatedChildrenBefore =
    relatedChildren.filter((child) => child.position === "before");

  const relatedChildrenAfter =
    relatedChildren.filter((child) => child.position !== "before");
`;

  content = content.replace(markerRegex, match[0] + helper);
}

// 3. Renderer BEFORE : avant create/edit/detail
if (!content.includes("data-erp-related-children-before")) {
  const beforeRenderer = `
        <div data-erp-related-children-before className="space-y-4">
          {module && record && relatedChildrenBefore.map((child) => (
            <ERPRelatedRecordsPanel
              key={child.key}
              parentModule={module}
              parentRecord={record}
              child={child}
              mode={type as "detail" | "edit"}
            />
          ))}
        </div>
`;

  const insertBeforeRegex = /\s*\{type === "create" && module && \(/m;
  const match = content.match(insertBeforeRegex);

  if (!match) {
    throw new Error("Point insertion before introuvable.");
  }

  content = content.replace(insertBeforeRegex, "\n" + beforeRenderer + match[0]);
}

// 4. Renderer AFTER : juste après le bloc detail ERPRuntimeDetails
if (!content.includes("data-erp-related-children-after")) {
  const afterRenderer = `
        <div data-erp-related-children-after className="space-y-4">
          {module && record && relatedChildrenAfter.map((child) => (
            <ERPRelatedRecordsPanel
              key={child.key}
              parentModule={module}
              parentRecord={record}
              child={child}
              mode={type as "detail" | "edit"}
            />
          ))}
        </div>
`;

  const detailBlockRegex =
    /\s*\{type === "detail" && module && record && \(\s*<ERPRuntimeDetails[\s\S]*?\/>\s*\)\}/m;

  const match = content.match(detailBlockRegex);

  if (!match) {
    throw new Error("Bloc detail ERPRuntimeDetails introuvable avec regex.");
  }

  content = content.replace(detailBlockRegex, match[0] + "\n" + afterRenderer);
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: ERPRelatedRecordsPanel branché dans ERPRuntimePage avec insertion robuste.");