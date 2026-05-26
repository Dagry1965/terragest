/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B2-C1-FIX2";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b2c1-fix2-multiline-rdv-validation`;

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`[${PASS_ID}] Fichier introuvable: ${rel(file)}`);
  }
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  if (!fs.existsSync(BACKUP)) {
    fs.copyFileSync(file, BACKUP);
    console.log(`[BACKUP] ${rel(BACKUP)}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${rel(BACKUP)}`);
  }
}

function ensureHelper(content) {
  if (content.includes("function assertRendezvousCanCreateInterventionRecord(")) {
    console.log("[SKIP] helper déjà présent");
    return content;
  }

  const helper = `
function assertRendezvousCanCreateInterventionRecord(
  rendezvous: Record<string, unknown> | null | undefined
): { ok: boolean; reason?: string } {
  if (!rendezvous) {
    return {
      ok: false,
      reason: "Rendez-vous introuvable.",
    };
  }

  if (asString(rendezvous.statut).toLowerCase() === "annule") {
    return {
      ok: false,
      reason: "Impossible de créer une intervention depuis un rendez-vous annulé.",
    };
  }

  if (asString(rendezvous.consumedByInterventionId)) {
    return {
      ok: false,
      reason: "Impossible de créer une intervention : ce rendez-vous a déjà été consommé.",
    };
  }

  if (!asString(rendezvous.clientId)) {
    return {
      ok: false,
      reason: "Impossible de créer une intervention : clientId manquant.",
    };
  }

  if (!asString(rendezvous.vehiculeId)) {
    return {
      ok: false,
      reason: "Impossible de créer une intervention : vehiculeId manquant.",
    };
  }

  if (!asString(rendezvous.id)) {
    return {
      ok: false,
      reason: "Impossible de créer une intervention : identifiant rendez-vous manquant.",
    };
  }

  return { ok: true };
}
`;

  const mappingHelperIndex = content.indexOf("function buildInterventionFromRendezvousRecord(");
  if (mappingHelperIndex !== -1) {
    console.log("[PATCHED] helper inséré avant buildInterventionFromRendezvousRecord");
    return content.slice(0, mappingHelperIndex) + helper + "\n" + content.slice(mappingHelperIndex);
  }

  const asStringIndex = content.indexOf("function asString(");
  if (asStringIndex !== -1) {
    console.log("[PATCHED] helper inséré avant asString");
    return content.slice(0, asStringIndex) + helper + "\n" + content.slice(asStringIndex);
  }

  console.log("[PATCHED] helper ajouté en fin de fichier");
  return content + "\n" + helper;
}

function replaceMultilineCalls(content) {
  const before = content;

  content = content.replace(
    /RuntimeSchedulingEngine\s*\.\s*assertRendezvousCanCreateIntervention\s*\(/g,
    "assertRendezvousCanCreateInterventionRecord("
  );

  content = content.replace(
    /RuntimeSchedulingEngine\s*\n\s*\.\s*assertRendezvousCanCreateIntervention\s*\(/g,
    "assertRendezvousCanCreateInterventionRecord("
  );

  content = content.replace(
    /\.\s*assertRendezvousCanCreateIntervention\s*\(/g,
    "assertRendezvousCanCreateInterventionRecord("
  );

  if (content !== before) {
    console.log("[PATCHED] appels assertRendezvousCanCreateIntervention remplacés");
  } else {
    console.log("[SKIP] aucun appel assertRendezvousCanCreateIntervention remplacé");
  }

  return content;
}

function main() {
  console.log(`[${PASS_ID}] Remplacement multiline validation RDV -> intervention...`);

  let content = read(TARGET);
  backup(TARGET);

  content = ensureHelper(content);
  content = replaceMultilineCalls(content);

  if (content.includes(".assertRendezvousCanCreateIntervention(")) {
    throw new Error(
      `[${PASS_ID}] Il reste un appel .assertRendezvousCanCreateIntervention(. Inspecter runtimeBusinessRules.ts.`
    );
  }

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9l-b2c-rdv-consumption-validation.cjs");
}

main();