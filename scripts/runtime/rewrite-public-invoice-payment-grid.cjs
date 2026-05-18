const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "app",
  "facture",
  "[token]",
  "page.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

const startNeedle = `<div className="mt-4 grid gap-4 md:grid-cols-3">
                  <MoneyCard label="Montant TTC" value={summary.montantTTC} />`;

const start = content.indexOf(startNeedle);

if (start === -1) {
  console.error("PAYMENT GRID START NOT FOUND");
  process.exit(1);
}

const endNeedle = `                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">`;

const end = content.indexOf(endNeedle, start);

if (end === -1) {
  console.error("PAYMENT GRID END NOT FOUND");
  process.exit(1);
}

const cleanGrid = `<div className="mt-4 grid gap-4 md:grid-cols-3">
                  <MoneyCard label="Montant TTC" value={summary.montantTTC} />
                  <MoneyCard label="Montant payé" value={summary.montantPaye} />

                  {summary.isCancelledInvoice ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-red-700">
                        Facture annulée
                      </p>
                      <p className="mt-2 text-lg font-black text-red-700">
                        Paiement désactivé
                      </p>
                    </div>
                  ) : (
                    <MoneyCard
                      label="Reste à payer"
                      value={summary.resteAPayer}
                      highlight
                    />
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">`;

content =
  content.slice(0, start) +
  cleanGrid +
  content.slice(end + endNeedle.length);

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED public invoice payment grid");