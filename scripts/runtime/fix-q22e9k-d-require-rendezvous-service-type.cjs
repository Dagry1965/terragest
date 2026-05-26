/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rendezvousPath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.module.ts"
);

const guardPath = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`${path.relative(ROOT, filePath)} introuvable`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(ROOT, filePath)}`);
}

let moduleContent = read(rendezvousPath);
let guardContent = read(guardPath);

if (!moduleContent.includes('key: "typeService"')) {
  fail('Champ typeService introuvable dans rendezvous.module.ts');
}

if (!guardContent.includes("async function guardRendezvousMutation")) {
  fail("guardRendezvousMutation introuvable");
}

/**
 * 1) Metadata/schema : typeService required.
 * On cible le bloc du champ typeService et on ajoute required: true si absent.
 */
moduleContent = moduleContent.replace(
  /(\{\s*key:\s*"typeService"[\s\S]*?label:\s*"[^"]+"[,]?)([\s\S]*?\n\s*\})/m,
  (match, start, end) => {
    if (match.includes("required: true")) {
      return match;
    }

    return `${start}
      required: true,${end}`;
  }
);

if (!/key:\s*"typeService"[\s\S]*required:\s*true/.test(moduleContent)) {
  fail("Impossible de rendre typeService required dans rendezvous.module.ts");
}

ok("typeService marqué required dans rendezvous.module.ts");

/**
 * 2) Runtime guard : impossible de sauvegarder un RDV réel sans typeService.
 * On ajoute une fonction dédiée et on l’appelle dans guardRendezvousMutation.
 */
if (!guardContent.includes("function assertRendezvousServiceType")) {
  const insertAfter = /function isPublicAppointmentRequest\(record: RuntimeRecord\): boolean \{[\s\S]*?\n\}/m;

  if (!insertAfter.test(guardContent)) {
    fail("Impossible de trouver isPublicAppointmentRequest pour insérer assertRendezvousServiceType");
  }

  guardContent = guardContent.replace(
    insertAfter,
    (match) => `${match}

function assertRendezvousServiceType(record: RuntimeRecord): void {
  const typeService =
    asString(record.typeService);

  if (!typeService) {
    throw new Error(
      "Le type de service est obligatoire pour réserver un créneau."
    );
  }
}
`
  );

  ok("assertRendezvousServiceType ajouté");
} else {
  ok("assertRendezvousServiceType déjà présent");
}

/**
 * Appel du guard :
 * après les demandes publiques sans vraie date/heure,
 * mais avant les contrôles horaires/conflits.
 */
if (!guardContent.includes("assertRendezvousServiceType(mergedRecord);")) {
  const anchor = `  if (!hasRealAppointmentDateAndTime(mergedRecord)) {
    throw new Error(
      "Le rendez-vous doit avoir une date et une heure rÃ©elles avant sauvegarde."
    );
  }`;

  const anchorUtf8 = `  if (!hasRealAppointmentDateAndTime(mergedRecord)) {
    throw new Error(
      "Le rendez-vous doit avoir une date et une heure réelles avant sauvegarde."
    );
  }`;

  if (guardContent.includes(anchor)) {
    guardContent = guardContent.replace(
      anchor,
      `${anchor}

  assertRendezvousServiceType(mergedRecord);`
    );
  } else if (guardContent.includes(anchorUtf8)) {
    guardContent = guardContent.replace(
      anchorUtf8,
      `${anchorUtf8}

  assertRendezvousServiceType(mergedRecord);`
    );
  } else {
    fail("Bloc hasRealAppointmentDateAndTime introuvable pour insérer le guard typeService");
  }

  ok("assertRendezvousServiceType branché dans guardRendezvousMutation");
} else {
  ok("assertRendezvousServiceType déjà branché");
}

write(rendezvousPath, moduleContent);
write(guardPath, guardContent);

console.log("");
console.log("[Q22E9K_D_REQUIRE_SERVICE_TYPE_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");