const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "lifecycle",
  "ERPRelationDataLoader.ts"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

const startMarker = "  static getLabel(record: Record<string, unknown>) {";
const start = content.indexOf(startMarker);

if (start === -1) {
  console.error("getLabel not found");
  process.exit(1);
}

const endMarker = "\n  }\n}";
const end = content.lastIndexOf(endMarker);

if (end === -1 || end <= start) {
  console.error("class end not found");
  process.exit(1);
}

const newGetLabel = `  static getLabel(record: Record<string, unknown>) {
    const value = (key: string) =>
      String(record[key] ?? "").trim();

    const compact = (...parts: string[]) =>
      parts.filter(Boolean).join(" • ").trim();

    const money = (key: string) => {
      const raw = record[key];

      if (
        raw === null ||
        raw === undefined ||
        raw === ""
      ) {
        return "";
      }

      const amount = Number(raw);

      if (Number.isNaN(amount)) {
        return String(raw);
      }

      return amount.toLocaleString("fr-FR") + " FCFA";
    };

    const id = value("id");

    const numeroFacture = value("numeroFacture");
    const reference = value("reference");
    const numero = value("numero");
    const dateFacture = value("dateFacture");
    const montantTTC = money("montantTTC");
    const resteAPayer = money("resteAPayer");
    const statutPaiement = value("statutPaiement");

    /**
     * Factures AMARKHYS
     * Priorité absolue : ne jamais afficher l'ID technique
     * si un numéro de facture ou une référence métier existe.
     */
    const factureNumber =
      numeroFacture || reference || numero;

    if (factureNumber) {
      return compact(
        factureNumber,
        montantTTC,
        resteAPayer ? "Reste " + resteAPayer : "",
        statutPaiement,
        dateFacture
      );
    }

    const nom = value("nom");
    const prenom = value("prenom");
    const name = value("name");
    const label = value("label");
    const titre = value("titre");
    const libelle = value("libelle");

    const email = value("email");
    const telephone = value("telephone");
    const phone = value("phone");

    const code = value("code");
    const codeClient = value("codeClient");

    const marque = value("marque");
    const modele = value("modele");
    const immatriculation = value("immatriculation");

    const commune = value("commune");
    const adresse = value("adresse");

    const produit = value("produit");
    const designation = value("designation");

    const typeContrat = value("typeContrat");
    const typeExploitation = value("typeExploitation");

    /**
     * Véhicules AMARKHYS
     */
    const vehiculeLabel = compact(
      marque,
      modele,
      immatriculation
    );

    if (vehiculeLabel) {
      return vehiculeLabel;
    }

    /**
     * Clients / utilisateurs / propriétaires
     */
    const personneLabel = compact(
      prenom,
      nom
    );

    if (personneLabel) {
      return compact(
        personneLabel,
        telephone,
        email
      );
    }

    if (nom) {
      return compact(nom, telephone, email);
    }

    if (name) {
      return name;
    }

    if (label) {
      return label;
    }

    if (libelle) {
      return libelle;
    }

    if (titre) {
      return titre;
    }

    if (codeClient) {
      return compact(codeClient, telephone, email);
    }

    if (code) {
      return code;
    }

    /**
     * Contrats / documents métier
     */
    const referenceLabel = compact(
      typeContrat,
      reference || numero
    );

    if (referenceLabel) {
      return referenceLabel;
    }

    if (reference) {
      return reference;
    }

    if (numero) {
      return numero;
    }

    /**
     * Terrains / exploitations
     */
    const localisationLabel = compact(
      commune,
      adresse
    );

    if (localisationLabel) {
      return localisationLabel;
    }

    if (typeExploitation) {
      return typeExploitation;
    }

    /**
     * Produits / stocks
     */
    if (designation) {
      return designation;
    }

    if (produit) {
      return produit;
    }

    if (telephone) {
      return telephone;
    }

    if (phone) {
      return phone;
    }

    if (email) {
      return email;
    }

    return id || "";
  }`;

content =
  content.slice(0, start) +
  newGetLabel +
  content.slice(end);

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/runtime/modules/lifecycle/ERPRelationDataLoader.ts");
console.log("DONE force billing relation labels");