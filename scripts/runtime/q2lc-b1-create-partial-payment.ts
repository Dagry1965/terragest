import fs from "fs";
import path from "path";

const root = process.cwd();

function loadEnv() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^"|"$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnv();

const FACTURE_ID = "g2pZWQ7lwbuQFHVNmqgQ";
const PAYMENT_ID = "q2lc-b1-partial-payment-001";

async function main() {
  console.log("[Q2-L-C-B1C] Create partial payment via RuntimeDataBinding");

  const { RuntimeDataBinding } =
    await import("../../src/runtime/data-binding/RuntimeDataBinding");

  const { encaissementsautoModule } =
    await import("../../src/runtime/modules/generated/encaissementsauto/encaissementsauto.module");

  const { facturesautoModule } =
    await import("../../src/runtime/modules/generated/facturesauto/facturesauto.module");

  const facture = await RuntimeDataBinding.detail(
    facturesautoModule,
    FACTURE_ID
  );

  if (!facture) {
    throw new Error(`[Q2-L-C-B1C] Missing facture ${FACTURE_ID}`);
  }

  const existing = await RuntimeDataBinding.detail(
    encaissementsautoModule,
    PAYMENT_ID
  ).catch(() => null);

  if (existing) {
    console.log("[SKIP] Payment already exists", PAYMENT_ID);
    return;
  }

  const result = await RuntimeDataBinding.create(
    encaissementsautoModule,
    {
      id: PAYMENT_ID,
      tenantId: facture.tenantId,
      workspace: facture.workspace,
      userId: "q2lc-system-test",
      moduleKey: "encaissementsauto",
      contextPath: `${facture.tenantId}/${facture.workspace}/encaissementsauto`,

      factureId: FACTURE_ID,
      parentModuleKey: "facturesauto",
      parentRecordId: FACTURE_ID,
      parentForeignKey: "factureId",

      clientId: facture.clientId,
      vehiculeId: facture.vehiculeId,
      interventionId: facture.interventionId,

      numeroRecu: "REC-Q2-L-C-B1-001",
      montant: 20000,
      datePaiement: "2026-06-07",
      modePaiement: "mobile_money",
      referenceTransaction: "Q2-L-C-B1-PARTIAL",
      statut: "valide",

      notes: "Test Q2-L-C-B1 encaissement partiel.",
    },
    {
      systemMutation: true,
      mutationSource: "runtime:test:q2lc-b1",
      parentContext: {
        parentModuleKey: "facturesauto",
        parentRecordId: FACTURE_ID,
        parentForeignKey: "factureId",
      },
    }
  );

  console.log("[CREATED]", result?.id ?? PAYMENT_ID);
}

main().catch((error) => {
  console.error("[Q2-L-C-B1C][ERROR]", error);
  process.exit(1);
});