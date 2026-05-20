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

const backup = `${file}.bak-q12e-wire-related-records`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

if (!content.includes("./ERPRelatedRecordsPanel")) {
  content = content.replace(
    `import { ERPRuntimeTable } from "./ERPRuntimeTable";`,
    `import { ERPRuntimeTable } from "./ERPRuntimeTable";
import { ERPRelatedRecordsPanel } from "./ERPRelatedRecordsPanel";`
  );
}

if (!content.includes("relatedChildrenBefore")) {
  const marker = `  const invoicePaymentHref =
    isInvoiceDetailPage && record
      ? buildInvoicePaymentHref(record)
      : "#";`;

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
    relatedChildren.filter((child) => child.position !== "before");`;

  if (!content.includes(marker)) {
    throw new Error("Marqueur invoicePaymentHref introuvable.");
  }

  content = content.replace(marker, marker + "\n" + helper);
}

if (!content.includes("relatedChildrenBefore.map")) {
  const panelRenderer = `
        {module && record && relatedChildrenBefore.map((child) => (
          <ERPRelatedRecordsPanel
            key={child.key}
            parentModule={module}
            parentRecord={record}
            child={child}
            mode={type as "detail" | "edit"}
          />
        ))}
`;

  const insertBefore = `        {type === "create" && module && (`;

  if (!content.includes(insertBefore)) {
    throw new Error("Point insertion before introuvable.");
  }

  content = content.replace(insertBefore, panelRenderer + "\n" + insertBefore);
}

if (!content.includes("relatedChildrenAfter.map")) {
  const afterRenderer = `
        {module && record && relatedChildrenAfter.map((child) => (
          <ERPRelatedRecordsPanel
            key={child.key}
            parentModule={module}
            parentRecord={record}
            child={child}
            mode={type as "detail" | "edit"}
          />
        ))}
`;

  const insertAfter = `        {type === "detail" && module && record && (
          <ERPRuntimeDetails
            module={module}
            data={record}
          />
        )}`;

  if (!content.includes(insertAfter)) {
    throw new Error("Bloc ERPRuntimeDetails introuvable.");
  }

  content = content.replace(insertAfter, insertAfter + "\n" + afterRenderer);
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: ERPRelatedRecordsPanel branché dans ERPRuntimePage.");