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
    "components",
    "erp",
    "billing",
    "PaymentReceiptActions.tsx"
  );

  backup(file, "q18i2-mark-receipt-sent");

  let content = read(file);

  if (!content.includes("encaissementsautoModule")) {
    content = replaceOnce(
      content,
      `import {
  vehiculesModule,
} from "@/runtime/modules/generated/vehicules";`,
      `import {
  vehiculesModule,
} from "@/runtime/modules/generated/vehicules";

import {
  encaissementsautoModule,
} from "@/runtime/modules/generated/encaissementsauto";`,
      "add encaissements module import"
    );
  }

  if (!content.includes("function getPaymentId")) {
    content = replaceOnce(
      content,
      `function buildReceiptNumber(
  payment: RecordData
): string {`,
      `function getPaymentId(
  payment: RecordData
): string {
  return value(
    payment,
    "id",
    value(payment, "_id")
  );
}

function getClientRecipient(
  context: ReceiptContext | null
): string {
  return (
    value(context?.client ?? null, "telephone") ||
    value(context?.client ?? null, "email") ||
    ""
  );
}

async function markReceiptSent(
  payment: RecordData,
  context: ReceiptContext | null,
  channel: "whatsapp" | "sms"
): Promise<void> {
  const paymentId =
    getPaymentId(payment);

  if (!paymentId) {
    return;
  }

  const currentCount =
    Number(payment.nombreEnvoisRecu ?? 0);

  await RuntimeDataBinding.update(
    encaissementsautoModule,
    paymentId,
    {
      statutEnvoiRecu: "envoye",
      dernierEnvoiRecuAt: new Date().toISOString(),
      canalDernierEnvoiRecu: channel,
      destinataireDernierEnvoiRecu:
        getClientRecipient(context),
      nombreEnvoisRecu:
        Number.isFinite(currentCount)
          ? currentCount + 1
          : 1,
    },
    {
      systemMutation: true,
      mutationSource: "runtime:receipt-send",
    }
  );
}

function buildReceiptNumber(
  payment: RecordData
): string {`,
      "add receipt sent tracking helpers"
    );
  }

  content = replaceOnce(
    content,
    `  const smsHref =
    "sms:?body=" + encodeURIComponent(text);`,
    `  const smsHref =
    "sms:?body=" + encodeURIComponent(text);

  async function handleReceiptSend(
    channel: "whatsapp" | "sms"
  ) {
    await markReceiptSent(
      payment,
      context,
      channel
    );
  }`,
    "add send handler"
  );

  content = replaceOnce(
    content,
    `      <a
        href={buildAmarkhysWhatsAppHref(text)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-black text-emerald-700 transition hover:bg-emerald-50"
      >
        WhatsApp
      </a>`,
    `      <a
        href={buildAmarkhysWhatsAppHref(text)}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          void handleReceiptSend("whatsapp");
        }}
        className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-black text-emerald-700 transition hover:bg-emerald-50"
      >
        WhatsApp
      </a>`,
    "track whatsapp send"
  );

  content = replaceOnce(
    content,
    `      <a
        href={smsHref}
        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-700 transition hover:bg-slate-50"
      >
        SMS
      </a>`,
    `      <a
        href={smsHref}
        onClick={() => {
          void handleReceiptSend("sms");
        }}
        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-700 transition hover:bg-slate-50"
      >
        SMS
      </a>`,
    "track sms send"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18I2_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester WhatsApp/SMS reçu");
}

main();