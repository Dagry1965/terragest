const fs = require("fs");
const path = require("path");

const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const identityFile = path.join(
  root,
  "src",
  "runtime",
  "workspaces",
  "amarkhys",
  "amarkhysBusinessIdentity.ts"
);

const publicInvoicePage = path.join(
  root,
  "src",
  "app",
  "facture",
  "[token]",
  "page.tsx"
);

const invoiceActions = path.join(
  root,
  "src",
  "components",
  "erp",
  "billing",
  "InvoiceDocumentActions.tsx"
);

write(
  identityFile,
  `export const AMARKHYS_BUSINESS_IDENTITY = {
  displayName: "AMARKHYS Garage",
  legalName: "AMARKHYS Garage",
  phone: "+2250700000000",
  whatsapp: "+2250700000000",
  email: "contact@amarkhys.com",
  address: "Abidjan",
  cityCountry: "Côte d’Ivoire",
  slogan: "L’excellence automobile au service de votre véhicule",
} as const;

export function buildAmarkhysTelHref(): string {
  return "tel:" + AMARKHYS_BUSINESS_IDENTITY.phone;
}

export function buildAmarkhysWhatsAppHref(
  message = ""
): string {
  const phone =
    AMARKHYS_BUSINESS_IDENTITY.whatsapp.replace(/[^0-9]/g, "");

  return "https://wa.me/" + phone + (
    message
      ? "?text=" + encodeURIComponent(message)
      : ""
  );
}

export function buildAmarkhysContactLabel(): string {
  return [
    AMARKHYS_BUSINESS_IDENTITY.phone,
    AMARKHYS_BUSINESS_IDENTITY.email,
    AMARKHYS_BUSINESS_IDENTITY.address,
    AMARKHYS_BUSINESS_IDENTITY.cityCountry,
  ]
    .filter(Boolean)
    .join(" • ");
}
`
);

if (fs.existsSync(publicInvoicePage)) {
  let content = read(publicInvoicePage);

  if (!content.includes("AMARKHYS_BUSINESS_IDENTITY")) {
    content = content.replace(
      `import {
  interventionsautoModule,
} from "@/runtime/modules/generated/interventionsauto";`,
      `import {
  interventionsautoModule,
} from "@/runtime/modules/generated/interventionsauto";

import {
  AMARKHYS_BUSINESS_IDENTITY,
  buildAmarkhysTelHref,
  buildAmarkhysWhatsAppHref,
} from "@/runtime/workspaces/amarkhys/amarkhysBusinessIdentity";`
    );
  }

  content = content.replaceAll(
    "AMARKHYS GARAGE",
    "{AMARKHYS_BUSINESS_IDENTITY.displayName.toUpperCase()}"
  );

  content = content.replaceAll(
    "AMARKHYS Garage",
    "{AMARKHYS_BUSINESS_IDENTITY.displayName}"
  );

  content = content.replaceAll(
    "Garage automobile, entretien et diagnostic",
    "{AMARKHYS_BUSINESS_IDENTITY.slogan}"
  );

  content = content.replaceAll(
    `href={"https://wa.me/?text=" + encodeURIComponent(whatsappText)}`,
    `href={buildAmarkhysWhatsAppHref(whatsappText)}`
  );

  content = content.replaceAll(
    `href="tel:+000000000"`,
    `href={buildAmarkhysTelHref()}`
  );

  content = content.replaceAll(
    "contactez AMARKHYS Garage avec le numéro de facture.",
    "contactez {AMARKHYS_BUSINESS_IDENTITY.displayName} avec le numéro de facture."
  );

  content = content.replaceAll(
    "Retour au site AMARKHYS",
    "Retour au site AMARKHYS"
  );

  write(publicInvoicePage, content);
}

if (fs.existsSync(invoiceActions)) {
  let content = read(invoiceActions);

  if (!content.includes("AMARKHYS_BUSINESS_IDENTITY")) {
    content = content.replace(
      `import {
  interventionsautoModule,
} from "@/runtime/modules/generated/interventionsauto";`,
      `import {
  interventionsautoModule,
} from "@/runtime/modules/generated/interventionsauto";

import {
  AMARKHYS_BUSINESS_IDENTITY,
  buildAmarkhysContactLabel,
} from "@/runtime/workspaces/amarkhys/amarkhysBusinessIdentity";`
    );
  }

  content = content.replaceAll(
    `"AMARKHYS GARAGE"`,
    `AMARKHYS_BUSINESS_IDENTITY.displayName.toUpperCase()`
  );

  content = content.replaceAll(
    `"AMARKHYS • Facture générée automatiquement"`,
    `AMARKHYS_BUSINESS_IDENTITY.displayName + " • Facture générée automatiquement"`
  );

  content = content.replaceAll(
    `"Votre facture AMARKHYS est disponible."`,
    `"Votre facture " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est disponible."`
  );

  content = content.replaceAll(
    `"Merci pour votre confiance."`,
    `"Merci pour votre confiance. " + buildAmarkhysContactLabel()`
  );

  write(invoiceActions, content);
}

console.log("DONE install AMARKHYS business identity");