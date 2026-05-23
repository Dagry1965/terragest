const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const pagePath = "src/app/facture/[token]/page.tsx";

backup(pagePath, ".bak-q19h12e-add-phone-to-invoice-summary");

let content = fs.readFileSync(p(pagePath), "utf8");

const alreadyDone =
  content.includes('Téléphone : {value(client, "telephone", "-")}');

const oldBlock = String.raw`<p className="mt-3 text-lg font-black text-[#0f172a]">
                        {buildClientLabel(client)}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        {buildVehicleLabel(vehicule)}
                      </p>`;

const newBlock = String.raw`<p className="mt-3 text-lg font-black text-[#0f172a]">
                        {buildClientLabel(client)}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        Téléphone : {value(client, "telephone", "-")}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        Véhicule : {buildVehicleLabel(vehicule)}
                      </p>`;

if (!alreadyDone) {
  if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
  } else {
    console.warn("[WARN] Bloc client/véhicule non trouvé. Aucune modification appliquée.");
  }
}

write(pagePath, content);

console.log("");
console.log("[Q19H12E_DONE] Phone added to public invoice client/vehicle summary.");
console.log("");
console.log("Next:");
console.log("  pnpm build");