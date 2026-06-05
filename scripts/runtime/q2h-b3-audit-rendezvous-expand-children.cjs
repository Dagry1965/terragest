const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
];

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;

    const i = t.indexOf("=");
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

function read(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.log("[FAIL]", rel, "introuvable");
    return "";
  }
  return fs.readFileSync(file, "utf8");
}

async function main() {
  loadEnvLocal();

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT;

  if (!projectId) throw new Error("Missing Firebase project id");

  if (!admin.apps.length) admin.initializeApp({ projectId });

  const db = admin.firestore();

  const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

  const rdvModule = contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"];
  const interventionsModule = contents["src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"];
  const resolver = contents["src/runtime/operational/RuntimeOperationalChildrenResolver.ts"];
  const expanded = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];

  console.log("");
  console.log("[Q2-H-B3-RENDEZVOUS-EXPAND-CHILDREN-AUDIT]");
  console.log("[PROJECT]", projectId);
  console.log("");

  console.log("[STATIC CHECKS]");

  const staticChecks = [
    ["rendezvous has composition.children", rdvModule.includes("children:")],
    ["rendezvous child interventionsauto", rdvModule.includes("interventionsauto")],
    ["rendezvous child has foreignKey", rdvModule.includes("foreignKey")],
    ["rendezvous child has openLabel", rdvModule.includes("openLabel")],
    ["interventionsauto has rendezVousId", interventionsModule.includes("rendezVousId")],
    ["interventionsauto has rendezvousId", interventionsModule.includes("rendezvousId")],
    ["resolver exposes resolveExpandedChildren", resolver.includes("resolveExpandedChildren")],
    ["resolver filters by child.foreignKey", resolver.includes("child.foreignKey")],
    ["expanded calls resolver", expanded.includes("RuntimeOperationalChildrenResolver.resolveExpandedChildren")],
    ["expanded uses group.children", expanded.includes("group.children")],
    ["expanded uses childGroup.parentRecordId", expanded.includes("childGroup.parentRecordId")],
  ];

  for (const [label, ok] of staticChecks) {
    console.log(ok ? "[OK]" : "[WARN]", label);
  }

  console.log("");
  console.log("[RENDEZVOUS CHILD CONFIG CONTEXT]");
  const rdvLines = rdvModule.split(/\r?\n/);
  rdvLines.forEach((line, index) => {
    if (
      line.includes("children:") ||
      line.includes("interventionsauto") ||
      line.includes("foreignKey") ||
      line.includes("openLabel")
    ) {
      const start = Math.max(0, index - 4);
      const end = Math.min(rdvLines.length, index + 8);
      console.log("---");
      console.log(
        rdvLines
          .slice(start, end)
          .map((v, i) => String(start + i + 1).padStart(4, "0") + ": " + v)
          .join("\n")
      );
    }
  });

  console.log("");
  console.log("[DATA CHECKS]");

  const rdvSnap = await db
    .collection("rendezvous")
    .where("tenantId", "==", "ORG_AMARKHYS_001")
    .where("workspace", "==", "amarkhys")
    .limit(20)
    .get();

  console.log("[rendezvous visible context count]", rdvSnap.size);

  for (const rdvDoc of rdvSnap.docs) {
    const rdv = rdvDoc.data();

    console.log("");
    console.log("[RDV]", rdvDoc.id, {
      tenantId: rdv.tenantId,
      workspace: rdv.workspace,
      moduleKey: rdv.moduleKey,
      clientId: rdv.clientId,
      vehiculeId: rdv.vehiculeId,
      dateRendezVous: rdv.dateRendezVous,
      heureRendezVous: rdv.heureRendezVous,
      statut: rdv.statut,
    });

    const byRendezVousId = await db
      .collection("interventionsauto")
      .where("rendezVousId", "==", rdvDoc.id)
      .limit(10)
      .get();

    const byRendezvousId = await db
      .collection("interventionsauto")
      .where("rendezvousId", "==", rdvDoc.id)
      .limit(10)
      .get();

    const byRdvId = await db
      .collection("interventionsauto")
      .where("rdvId", "==", rdvDoc.id)
      .limit(10)
      .get();

    console.log("  interventions where rendezVousId == rdv.id:", byRendezVousId.size);
    console.log("  interventions where rendezvousId == rdv.id:", byRendezvousId.size);
    console.log("  interventions where rdvId == rdv.id:", byRdvId.size);

    const samples = [...byRendezVousId.docs, ...byRendezvousId.docs, ...byRdvId.docs]
      .slice(0, 5);

    for (const doc of samples) {
      const itv = doc.data();
      console.log("  [INTERVENTION SAMPLE]", doc.id, {
        tenantId: itv.tenantId,
        workspace: itv.workspace,
        moduleKey: itv.moduleKey,
        rendezVousId: itv.rendezVousId,
        rendezvousId: itv.rendezvousId,
        rdvId: itv.rdvId,
        statut: itv.statut,
      });
    }
  }

  console.log("");
  console.log("[RESULT] AUDIT ONLY — aucune donnée modifiée.");
}

main().catch((error) => {
  console.error("[ERROR]", error);
  process.exit(1);
});
