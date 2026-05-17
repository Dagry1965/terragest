const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "billing",
  "InvoiceDocumentActions.tsx"
);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, filePath)}`);
}

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = read(file);
const before = content;

const newBuildShareText = `function buildShareText(
  invoice: RecordData,
  relations?: {
    client: RecordData | null;
    vehicule: RecordData | null;
    intervention: RecordData | null;
  } | null
): string {
  const numero =
    buildInvoiceNumber(invoice);

  const total =
    amount(invoice, "montantTTC");

  const montantPaye =
    amount(invoice, "montantPaye");

  const reste =
    computeResteAPayer(invoice);

  const statut =
    formatPaymentStatus(
      value(invoice, "statutPaiement", "en_attente")
    );

  const url =
    buildInvoicePublicUrl(invoice);

  const clientLabel =
    buildClientLabel(relations?.client ?? null);

  const vehicleLabel =
    buildVehicleLabel(relations?.vehicule ?? null);

  const interventionLabel =
    buildInterventionLabel(relations?.intervention ?? null);

  return [
    "Bonjour,",
    "",
    "Votre facture AMARKHYS est disponible.",
    "",
    "Facture : " + numero,
    "Client : " + clientLabel,
    "Véhicule : " + vehicleLabel,
    "Intervention : " + interventionLabel,
    "Montant TTC : " + formatMoney(total),
    "Montant payé : " + formatMoney(montantPaye),
    "Reste à payer : " + formatMoney(reste),
    "Statut paiement : " + statut,
    "",
    url ? "Lien facture : " + url : "",
    "",
    "Merci pour votre confiance.",
  ]
    .filter(Boolean)
    .join("\\\\n");
}

`;

content = content.replace(
  /function buildShareText\([\s\S]*?\n}\n\nasync function createInvoicePdf/,
  newBuildShareText + "async function createInvoicePdf"
);

content = content.replace(
  `  const [qrDataUrl, setQrDataUrl] =
    useState("");`,
  `  const [qrDataUrl, setQrDataUrl] =
    useState("");

  const [relations, setRelations] =
    useState<{
      client: RecordData | null;
      vehicule: RecordData | null;
      intervention: RecordData | null;
    } | null>(null);`
);

content = content.replace(
  `  useEffect(() => {
    let mounted = true;

    async function generateQr() {`,
  `  useEffect(() => {
    let mounted = true;

    async function generateQr() {`
);

const qrEffectEnd = `  }, [publicUrl]);

  const shareText =
    buildShareText(invoice);`;

const relationsEffect = `  }, [publicUrl]);

  useEffect(() => {
    let mounted = true;

    async function loadRelations() {
      const loadedRelations =
        await loadInvoiceRelations(invoice);

      if (mounted) {
        setRelations(loadedRelations);
      }
    }

    loadRelations().catch(() => {
      if (mounted) {
        setRelations(null);
      }
    });

    return () => {
      mounted = false;
    };
  }, [invoice]);

  const shareText =
    buildShareText(invoice, relations);`;

content = content.replace(
  qrEffectEnd,
  relationsEffect
);

if (content === before) {
  console.log("UNCHANGED src/components/erp/billing/InvoiceDocumentActions.tsx");
  console.log("The expected patterns were not found. Inspect the file manually.");
  process.exit(0);
}

write(file, content);
console.log("DONE fix invoice share message labels");