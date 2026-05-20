const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

assertProjectRoot();

const targetPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

let content = readFile(targetPath);

const helperAnchor = `  const errorByField =
    Object.fromEntries(
      errors.map((error) => [
        error.field,
        error.message,
      ])
    ) as Record<string, string>;
`;

const helperBlock = `  function toFriendlyRuntimeErrorMessage(
    error: unknown
  ): string {
    const message =
      error instanceof Error
        ? error.message
        : "Enregistrement impossible.";

    if (
      message.includes(
        "Conflit de planning"
      ) ||
      message.includes(
        "ce véhicule possède déjà un rendez-vous"
      )
    ) {
      return "Ce véhicule a déjà un rendez-vous sur ce créneau. Choisissez une autre heure ou modifiez le rendez-vous existant.";
    }

    if (
      message.includes(
        "dateRendezVous"
      ) ||
      message.includes(
        "heureRendezVous"
      ) ||
      message.includes(
        "créneau"
      )
    ) {
      return "Le rendez-vous doit avoir une date et une heure valides avant d'être enregistré.";
    }

    if (
      message.includes(
        "clientId manquant"
      )
    ) {
      return "Veuillez sélectionner un client avant d'enregistrer.";
    }

    if (
      message.includes(
        "vehiculeId manquant"
      )
    ) {
      return "Veuillez sélectionner un véhicule avant d'enregistrer.";
    }

    if (
      message.includes(
        "déjà été consommé"
      )
    ) {
      return "Ce rendez-vous a déjà généré une intervention. Aucune nouvelle intervention ne sera créée.";
    }

    return message;
  }

`;

if (!content.includes(helperAnchor)) {
  throw new Error("Ancre errorByField introuvable.");
}

if (!content.includes("function toFriendlyRuntimeErrorMessage")) {
  content = content.replace(
    helperAnchor,
    helperAnchor + "\n" + helperBlock
  );
}

const oldCatchMessage = `      const message =
        error instanceof Error
          ? error.message
          : "Enregistrement impossible.";`;

const newCatchMessage = `      const message =
        toFriendlyRuntimeErrorMessage(
          error
        );`;

if (!content.includes(oldCatchMessage)) {
  throw new Error("Bloc message catch handleSubmit introuvable.");
}

content = content.replace(
  oldCatchMessage,
  newCatchMessage
);

content = content.replace(
  `          field: "runtime",
          message,`,
  `          field: "formulaire",
          message,`
);

writeFile(targetPath, content);

console.log("");
console.log("[OK] Messages runtime formulaire rendus plus métier.");