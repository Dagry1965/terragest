/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  if (!fs.existsSync(file)) return;

  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function main() {
  const file = p(
    "src",
    "runtime",
    "guards",
    "RuntimeChronologyGuard.ts"
  );

  backup(file, "q18f3-skip-unrelated-updates");

  let content = read(file);

  if (!content.includes("function hasAnyField")) {
    content = replaceOnce(
      content,
      `function compareDateOnly(
  left: unknown,
  right: unknown
): number {
  const leftDate = asDateOnly(left);
  const rightDate = asDateOnly(right);

  if (!leftDate || !rightDate) {
    return 0;
  }

  return leftDate.localeCompare(rightDate);
}`,
      `function compareDateOnly(
  left: unknown,
  right: unknown
): number {
  const leftDate = asDateOnly(left);
  const rightDate = asDateOnly(right);

  if (!leftDate || !rightDate) {
    return 0;
  }

  return leftDate.localeCompare(rightDate);
}

function hasAnyField(
  data: RuntimeRecord,
  fields: string[]
): boolean {
  return fields.some((field) =>
    Object.prototype.hasOwnProperty.call(
      data,
      field
    )
  );
}

function shouldValidateChronology(
  data: RuntimeRecord,
  context: RuntimeChronologyGuardContext,
  fields: string[]
): boolean {
  if (context.operation === "create") {
    return true;
  }

  return hasAnyField(data, fields);
}`,
      "add partial update chronology helpers"
    );
  }

  const oldBlock = `  if (module.metadata.key === "interventionsauto") {
    await guardInterventionChronology(mergedRecord);
  }

  if (module.metadata.key === "facturesauto") {
    await guardFactureChronology(mergedRecord);
  }

  if (module.metadata.key === "encaissementsauto") {
    await guardEncaissementChronology(mergedRecord);
  }`;

  const newBlock = `  if (
    module.metadata.key === "interventionsauto" &&
    shouldValidateChronology(
      data,
      context,
      ["dateIntervention", "rendezVousId"]
    )
  ) {
    await guardInterventionChronology(mergedRecord);
  }

  if (
    module.metadata.key === "facturesauto" &&
    shouldValidateChronology(
      data,
      context,
      ["dateFacture", "interventionId"]
    )
  ) {
    await guardFactureChronology(mergedRecord);
  }

  if (
    module.metadata.key === "encaissementsauto" &&
    shouldValidateChronology(
      data,
      context,
      ["datePaiement", "factureId"]
    )
  ) {
    await guardEncaissementChronology(mergedRecord);
  }`;

  content = replaceOnce(
    content,
    oldBlock,
    newBlock,
    "make chronology validation field-aware"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18F3_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  retester modification encaissement -> recalcul facture");
}

main();