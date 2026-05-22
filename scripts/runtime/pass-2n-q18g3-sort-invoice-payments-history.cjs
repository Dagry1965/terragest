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
  if (!fs.existsSync(file)) {
    return;
  }

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
    "InvoicePaymentsHistory.tsx"
  );

  backup(file, "q18g3-sort-invoice-payments-history");

  let content = read(file);

  if (!content.includes("type PaymentSortDirection")) {
    content = replaceOnce(
      content,
      `type Encaissement = {
  id?: string;
  factureId?: string;
  montant?: number;
  datePaiement?: string;
  modePaiement?: string;
  referenceTransaction?: string;
  statut?: string;
};`,
      `type Encaissement = {
  id?: string;
  factureId?: string;
  montant?: number;
  datePaiement?: string;
  modePaiement?: string;
  referenceTransaction?: string;
  statut?: string;
};

type PaymentSortDirection = "asc" | "desc";`,
      "add sort direction type"
    );
  }

  if (!content.includes("function sortPaymentsByBusinessDate")) {
    content = replaceOnce(
      content,
      `function formatDate(
  value?: string
): string {
  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("fr-FR");
}`,
      `function formatDate(
  value?: string
): string {
  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("fr-FR");
}

function getPaymentSortValue(
  item: Encaissement
): string {
  return String(
    item.datePaiement ??
      item.id ??
      ""
  );
}

function sortPaymentsByBusinessDate(
  items: Encaissement[],
  direction: PaymentSortDirection
): Encaissement[] {
  return [...items].sort((left, right) => {
    const comparison =
      getPaymentSortValue(left).localeCompare(
        getPaymentSortValue(right),
        "fr",
        {
          numeric: true,
          sensitivity: "base",
        }
      );

    return direction === "asc"
      ? comparison
      : -comparison;
  });
}`,
      "add payment sort helpers"
    );
  }

  if (!content.includes("const [sortDirection, setSortDirection]")) {
    content = replaceOnce(
      content,
      `  const [loading, setLoading] =
    useState(true);`,
      `  const [loading, setLoading] =
    useState(true);

  const [sortDirection, setSortDirection] =
    useState<PaymentSortDirection>("asc");`,
      "add sort direction state"
    );
  }

  if (!content.includes("const sortedItems =")) {
    content = replaceOnce(
      content,
      `  const totalValide =
    useMemo(
      () =>
        items
          .filter((item) => item.statut === "valide")
          .reduce(
            (total, item) =>
              total + Number(item.montant ?? 0),
            0
          ),
      [items]
    );`,
      `  const sortedItems =
    useMemo(
      () =>
        sortPaymentsByBusinessDate(
          items,
          sortDirection
        ),
      [items, sortDirection]
    );

  const totalValide =
    useMemo(
      () =>
        items
          .filter((item) => item.statut === "valide")
          .reduce(
            (total, item) =>
              total + Number(item.montant ?? 0),
            0
          ),
      [items]
    );`,
      "add sorted items memo"
    );
  }

  if (!content.includes("Trier les paiements")) {
    content = replaceOnce(
      content,
      `        <div className="grid gap-3 sm:grid-cols-2">`,
      `        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-600">
            Trier les paiements
            <select
              value={sortDirection}
              onChange={(event) =>
                setSortDirection(
                  event.target.value as PaymentSortDirection
                )
              }
              className="mt-1 w-full bg-transparent text-sm font-black text-slate-950 outline-none"
            >
              <option value="asc">Ancien → récent</option>
              <option value="desc">Récent → ancien</option>
            </select>
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">`,
      "add sort control"
    );
  }

  content = replaceOnce(
    content,
    `{items.map((item, index) => (
              <MobilePaymentCard`,
    `{sortedItems.map((item, index) => (
              <MobilePaymentCard`,
    "use sorted items mobile"
  );

  content = replaceOnce(
    content,
    `{items.map((item, index) => (
                  <div`,
    `{sortedItems.map((item, index) => (
                  <div`,
    "use sorted items table"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18G3_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester historique encaissements facture");
}

main();
