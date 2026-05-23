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

function replaceRequired(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`Pattern not found: ${label}`);
  }

  return content.replace(from, to);
}

const target = "src/runtime/business-rules/runtimeBusinessRules.ts";
const suffix = "q19h4-fix-auto-invoice-chronology";

backup(target, suffix);

let content = read(target);

if (!content.includes("const resolveAutoInvoiceDate")) {
  content = replaceRequired(
    content,
    `      const montantTTC =
        roundMoney(`,
    `      const resolveDateOnly =
        (value: unknown): string => {
          const raw =
            String(value ?? "").trim();

          const match =
            raw.match(/^(\\d{4})-(\\d{2})-(\\d{2})/);

          if (match) {
            return match[1] + "-" + match[2] + "-" + match[3];
          }

          const parsed =
            new Date(raw);

          if (
            Number.isNaN(
              parsed.getTime()
            )
          ) {
            return "";
          }

          return parsed
            .toISOString()
            .split("T")[0];
        };

      const todayDate =
        new Date()
          .toISOString()
          .split("T")[0];

      const interventionDate =
        resolveDateOnly(
          intervention.dateIntervention ??
          intervention.dateRendezVous ??
          payload.dateIntervention ??
          payload.dateRendezVous
        );

      const resolveAutoInvoiceDate =
        (): string => {
          if (
            interventionDate &&
            interventionDate > todayDate
          ) {
            return interventionDate;
          }

          return todayDate;
        };

      const montantTTC =
        roundMoney(`,
    "insert auto invoice date helpers"
  );
}

content = replaceRequired(
  content,
  `            dateFacture:
              new Date()
                .toISOString()
                .split("T")[0],`,
  `            dateFacture:
              resolveAutoInvoiceDate(),`,
  "replace auto invoice date"
);

write(target, content);

console.log("");
console.log("[Q19H4_DONE] Auto invoice date now respects intervention chronology.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Retester intervention terminee -> facture automatique");