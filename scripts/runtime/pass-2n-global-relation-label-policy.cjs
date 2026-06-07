const fs = require("fs");
const os = require("os");
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
  throw new Error(`Fichier introuvable: ${file}`);
}

const backupDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "terragest-global-relation-policy-")
);

const backupFile = path.join(
  backupDir,
  "ERPRelationDataLoader.ts.bak"
);

let content = fs.readFileSync(file, "utf8");
fs.writeFileSync(backupFile, content, "utf8");

console.log("BACKUP:", backupFile);

// Nettoyage séparateurs mojibake éventuels
content = content.replace(/·/g, "·");
content = content.replace(/join\(" · "\)/g, `join(" · ")`);

// Passer moduleKey à getLabel dans load()
content = content.replace(
  `label: ERPRelationDataLoader.getLabel(
              record as Record<string, unknown>
            ),`,
  `label: ERPRelationDataLoader.getLabel(
              record as Record<string, unknown>,
              module.metadata.key
            ),`
);

// Passer moduleKey à getLabel dans resolveLabel()
content = content.replaceAll(
  `ERPRelationDataLoader.getLabel(
            record as Record<string, unknown>
          )`,
  `ERPRelationDataLoader.getLabel(
            record as Record<string, unknown>,
            module.metadata.key
          )`
);

// Signature getLabel(record, moduleKey)
content = content.replace(
  `static getLabel(
    record: Record<string, unknown>
  ): string {`,
  `static getLabel(
    record: Record<string, unknown>,
    moduleKey = ""
  ): string {`
);

// Ajouter helpers après compact()
if (!content.includes("const isTechnicalIdValue =")) {
  content = content.replace(
    `    const compact = (...parts: string[]) =>
      parts
        .filter((part) => Boolean(part && part.trim()))
        .join(" · ")
        .trim();

`,
    `    const compact = (...parts: string[]) =>
      parts
        .filter((part) => Boolean(part && part.trim()))
        .join(" · ")
        .trim();

    const isTechnicalIdValue = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return false;
      }

      return /^[A-Za-z0-9_-]{16,}$/.test(text);
    };

    const statusLabel = (input: string) => {
      const text = String(input ?? "").trim();

      const labels: Record<string, string> = {
        actif: "Actif",
        active: "Actif",
        prospect: "Prospect",
        inactif: "Inactif",
        inactive: "Inactif",
        archive: "Archivé",
        disponible: "Disponible",
        stock_faible: "Stock faible",
        rupture: "Rupture",
        ouvert: "Ouverte",
        ouverte: "Ouverte",
        diagnostic: "Diagnostic",
        en_cours: "En cours",
        terminee: "Terminée",
        terminée: "Terminée",
        facturee: "Facturée",
        facturée: "Facturée",
        brouillon: "Brouillon",
        validee: "Validée",
        validée: "Validée",
        annulee: "Annulée",
        annulée: "Annulée",
        piece: "Pièce",
        main_oeuvre: "Main d’œuvre",
        service: "Service",
        remise: "Remise",
        entree: "Entrée",
        sortie: "Sortie",
        correction: "Correction",
        atelier: "Atelier",
        magasin: "Magasin",
        depot: "Dépôt",
        reserve: "Réserve",
      };

      return labels[text] ?? text;
    };

    const dateLabel = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return "";
      }

      const date = new Date(text);

      if (Number.isNaN(date.getTime())) {
        return text;
      }

      return date.toLocaleDateString("fr-FR");
    };

    const numberLabel = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return "";
      }

      const number = Number(text);

      if (!Number.isFinite(number)) {
        return text;
      }

      return number.toLocaleString("fr-FR");
    };

`
  );
}

// Politique globale après const id
if (!content.includes("GLOBAL_RELATION_LABEL_POLICY")) {
  content = content.replace(
    `    const id = value("id");

`,
    `    const id = value("id");

    // GLOBAL_RELATION_LABEL_POLICY
    // Tous les champs relationnels runtime passent ici.
    // Objectif : afficher un libellé métier, jamais un ID technique si une donnée métier existe.
    const normalizedModuleKey = String(moduleKey ?? "").trim();

    if (normalizedModuleKey === "clientsauto") {
      const clientLabel = compact(
        compact(value("prenom"), value("nom")),
        value("codeClient") || value("telephone") || value("email")
      );

      if (clientLabel) {
        return clientLabel;
      }
    }

    if (
      normalizedModuleKey === "vehicules" ||
      normalizedModuleKey === "vehiculesauto"
    ) {
      const vehicleLabel = compact(
        compact(value("marque") || value("vehicule"), value("modele")),
        value("immatriculation")
      );

      if (vehicleLabel) {
        return vehicleLabel;
      }
    }

    if (normalizedModuleKey === "rendezvous") {
      const dateValue =
        value("dateRendezVous") ||
        value("dateRdv") ||
        value("date") ||
        value("dateIntervention");

      const heureValue =
        value("heureRendezVous") ||
        value("heureRdv") ||
        value("heure");

      const rdvLabel = compact(
        value("motif") || value("objet") || "Rendez-vous",
        dateValue ? dateLabel(dateValue) : "",
        heureValue
      );

      if (rdvLabel) {
        return rdvLabel;
      }
    }

    if (normalizedModuleKey === "interventionsauto") {
      const interventionLabel = compact(
        statusLabel(value("typeIntervention")) || value("designation") || "Intervention",
        value("dateIntervention") ? dateLabel(value("dateIntervention")) : "",
        statusLabel(value("statut"))
      );

      if (interventionLabel) {
        return interventionLabel;
      }
    }

    if (normalizedModuleKey === "produitsauto") {
      const productLabel = compact(
        value("nom") || value("designation") || value("produit"),
        value("marque"),
        value("reference") ? "Réf. " + value("reference") : ""
      );

      if (productLabel) {
        return productLabel;
      }
    }

    if (normalizedModuleKey === "stocksauto") {
      const stockLabel = compact(
        value("emplacement") || "Stock",
        statusLabel(value("typeStock")),
        value("quantite") ? numberLabel(value("quantite")) + " unité(s)" : ""
      );

      if (stockLabel) {
        return stockLabel;
      }
    }

    if (normalizedModuleKey === "facturesauto") {
      const invoiceLabel = compact(
        value("numeroFacture") || value("reference") || value("numero") || "Facture",
        money("montantTTC") || money("montant") || money("resteAPayer"),
        statusLabel(value("statutPaiement") || value("statut"))
      );

      if (invoiceLabel) {
        return invoiceLabel;
      }
    }

    if (normalizedModuleKey === "lignesinterventionauto") {
      const lineLabel = compact(
        value("designation") || statusLabel(value("typeLigne")) || "Ligne",
        money("montantTotal"),
        statusLabel(value("statut"))
      );

      if (lineLabel) {
        return lineLabel;
      }
    }

    if (normalizedModuleKey === "mouvementsstockauto") {
      const movementLabel = compact(
        statusLabel(value("typeMouvement")) || "Mouvement stock",
        value("quantite") ? numberLabel(value("quantite")) + " unité(s)" : "",
        value("dateMouvement") ? dateLabel(value("dateMouvement")) : ""
      );

      if (movementLabel) {
        return movementLabel;
      }
    }

`
  );
}

// Dernier recours : éviter ID technique brutal
content = content.replace(
  `    return id;
  }
}`,
  `    if (id && !isTechnicalIdValue(id)) {
      return id;
    }

    return "Enregistrement lié";
  }
}`
);

fs.writeFileSync(file, content, "utf8");

console.log("OK: politique globale de libellés relationnels appliquée.");