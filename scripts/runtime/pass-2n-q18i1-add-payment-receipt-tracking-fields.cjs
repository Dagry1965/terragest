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
    "modules",
    "generated",
    "encaissementsauto",
    "encaissementsauto.module.ts"
  );

  backup(file, "q18i1-payment-receipt-tracking");

  let content = read(file);

  if (!content.includes(`key: "numeroRecu"`)) {
    content = replaceOnce(
      content,
      `      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },`,
      `      {
        key: "numeroRecu",
        label: "Numéro reçu",
        type: "text",
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "statutEnvoiRecu",
        label: "Statut envoi reçu",
        type: "select",
        defaultValue: "non_envoye",
        options: [
          { label: "Non envoyé", value: "non_envoye" },
          { label: "Envoyé", value: "envoye" },
          { label: "Échec envoi", value: "echec" },
        ],
        grid: { cols: 6 },
      },
      {
        key: "dernierEnvoiRecuAt",
        label: "Dernier envoi reçu",
        type: "datetime",
        grid: { cols: 6 },
      },
      {
        key: "canalDernierEnvoiRecu",
        label: "Canal dernier envoi reçu",
        type: "select",
        options: [
          { label: "WhatsApp", value: "whatsapp" },
          { label: "SMS", value: "sms" },
          { label: "Email", value: "email" },
          { label: "Manuel", value: "manuel" },
        ],
        grid: { cols: 6 },
      },
      {
        key: "destinataireDernierEnvoiRecu",
        label: "Destinataire dernier envoi reçu",
        type: "text",
        grid: { cols: 6 },
      },
      {
        key: "nombreEnvoisRecu",
        label: "Nombre d'envois reçu",
        type: "number",
        defaultValue: 0,
        grid: { cols: 6 },
      },
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },`,
      "insert receipt tracking fields"
    );
  }

  if (!content.includes(`key: "recu"`)) {
    content = replaceOnce(
      content,
      `      {
        key: "notes",
        label: "Notes",
        fields: [
          "notes",
        ],
        sections: [
          {
            key: "observations",
            title: "Observations",
            fields: [
              "notes",
            ],
          },
        ],
      },`,
      `      {
        key: "recu",
        label: "Reçu",
        fields: [
          "numeroRecu",
          "statutEnvoiRecu",
          "dernierEnvoiRecuAt",
          "canalDernierEnvoiRecu",
          "destinataireDernierEnvoiRecu",
          "nombreEnvoisRecu",
        ],
        sections: [
          {
            key: "suivi-recu",
            title: "Suivi d'envoi du reçu",
            fields: [
              "numeroRecu",
              "statutEnvoiRecu",
              "dernierEnvoiRecuAt",
              "canalDernierEnvoiRecu",
              "destinataireDernierEnvoiRecu",
              "nombreEnvoisRecu",
            ],
          },
        ],
      },
      {
        key: "notes",
        label: "Notes",
        fields: [
          "notes",
        ],
        sections: [
          {
            key: "observations",
            title: "Observations",
            fields: [
              "notes",
            ],
          },
        ],
      },`,
      "insert receipt tracking tab"
    );
  }

  if (!content.includes("composition: {")) {
    content = replaceOnce(
      content,
      `  actions: encaissementsautoActions,`,
      `  composition: {
    readOnlyFields: [
      "numeroRecu",
      "statutEnvoiRecu",
      "dernierEnvoiRecuAt",
      "canalDernierEnvoiRecu",
      "destinataireDernierEnvoiRecu",
      "nombreEnvoisRecu",
    ],
  },

  actions: encaissementsautoActions,`,
      "insert receipt tracking read-only fields"
    );
  }

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18I1_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester encaissement existant");
}

main();