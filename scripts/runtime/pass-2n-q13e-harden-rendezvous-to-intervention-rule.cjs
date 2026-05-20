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

function ensureSchedulingImport(content) {
  if (content.includes("@/runtime/scheduling/RuntimeSchedulingEngine")) {
    return content;
  }

  const marker = 'from "@/runtime/modules/definitions/coreModules";';
  const index = content.indexOf(marker);

  if (index === -1) {
    throw new Error("Import coreERPModules introuvable.");
  }

  const importBlock = [
    "",
    "",
    "import {",
    "  RuntimeSchedulingEngine,",
    "}",
    "from \"@/runtime/scheduling/RuntimeSchedulingEngine\";",
  ].join("\n");

  return content.slice(0, index + marker.length) + importBlock + content.slice(index + marker.length);
}

function replaceRdvRule(content, replacement) {
  const idIndex = content.indexOf('"amarkhys-rdv-create-intervention"');

  if (idIndex === -1) {
    throw new Error("Règle amarkhys-rdv-create-intervention introuvable.");
  }

  const startComment = content.lastIndexOf("// =====================================================", idIndex);

  if (startComment === -1) {
    throw new Error("Début du bloc RDV -> intervention introuvable.");
  }

  const endComment = content.indexOf("// =====================================================\n// INTERVENTION TERMINEE", idIndex);

  if (endComment === -1) {
    throw new Error("Début du bloc suivant INTERVENTION TERMINEE introuvable.");
  }

  return content.slice(0, startComment) + replacement + "\n\n" + content.slice(endComment);
}

assertProjectRoot();

const targetPath = path.join(
  ROOT,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

let content = readFile(targetPath);

content = ensureSchedulingImport(content);

const replacement = `// =====================================================
// AMARKHYS
// RDV CONFIRME -> INTERVENTION
// =====================================================

{
  id:
    "amarkhys-rdv-create-intervention",

  module:
    "rendezvous",

  event:
    "rendezvous.updated",

  condition:
    (payload) =>
      payload.statut ===
        "confirme",

  action:
    async (payload) => {
      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      const rendezvousModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "rendezvous"
        );

      if (
        !interventionsModule ||
        !rendezvousModule
      ) {
        return;
      }

      const rendezvousRecord =
        payload.id
          ? await RuntimeDataBinding.detail(
              rendezvousModule,
              String(payload.id)
            )
          : payload;

      const effectiveRendezvous = {
        ...payload,
        ...(rendezvousRecord ?? {}),
        id:
          rendezvousRecord?.id ??
          payload.id,
      };

      const validation =
        RuntimeSchedulingEngine
          .assertRendezvousCanCreateIntervention(
            effectiveRendezvous
          );

      if (!validation.ok) {
        if (effectiveRendezvous.consumedByInterventionId) {
          return;
        }

        await RuntimeNotificationEngine
          .notify({
            type:
              "amarkhys.intervention.skipped",

            module:
              "interventionsauto",

            title:
              "Intervention non créée",

            message:
              validation.reason ??
              "Impossible de créer l'intervention depuis ce rendez-vous.",

            severity:
              "warning",
          });

        return;
      }

      const interventionPayload =
        RuntimeSchedulingEngine
          .buildInterventionFromRendezvous(
            effectiveRendezvous
          );

      const createdIntervention =
        await RuntimeDataBinding
          .create(
            interventionsModule,
            {
              ...interventionPayload,

              tenantId:
                effectiveRendezvous.tenantId ??
                payload.tenantId,

              workspace:
                effectiveRendezvous.workspace ??
                payload.workspace ??
                "amarkhys",

              userId:
                effectiveRendezvous.userId ??
                payload.userId,
            }
          );

      const createdInterventionId =
        typeof createdIntervention === "object" &&
        createdIntervention !== null
          ? String(
              createdIntervention.id ??
              createdIntervention._id ??
              ""
            )
          : "";

      if (
        createdInterventionId &&
        effectiveRendezvous.id
      ) {
        await RuntimeDataBinding
          .update(
            rendezvousModule,
            String(effectiveRendezvous.id),
            {
              consumedByInterventionId:
                createdInterventionId,

              consumedAt:
                new Date().toISOString(),
            }
          );
      }

      await RuntimeNotificationEngine
        .notify({
          type:
            "amarkhys.intervention",

          module:
            "interventionsauto",

          title:
            "Intervention créée",

          message:
            "Intervention créée depuis RDV confirmé",

          severity:
            "info"
        });
    }
},`;

content = replaceRdvRule(content, replacement);

writeFile(targetPath, content);

console.log("");
console.log("[OK] Q13E appliqué dans runtimeBusinessRules.ts");