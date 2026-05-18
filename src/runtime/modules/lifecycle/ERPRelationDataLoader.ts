import { RuntimeDataBinding } from "@/runtime/data-binding";

import { allERPModules } from "../definitions/coreModules";

export class ERPRelationDataLoader {
  static async load(moduleKey: string) {
    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return [];
    }

    const records =
      await RuntimeDataBinding.list(module);

    return records.map((record) => ({
      id: String(record.id),
      label: ERPRelationDataLoader.getLabel(
        record as Record<string, unknown>
      ),
      record: record as Record<string, unknown>,
    }));
  }

  static async resolveLabel(
    moduleKey: string,
    id: string
  ): Promise<string> {
    if (!moduleKey || !id) {
      return "";
    }

    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return "";
    }

    try {
      const record =
        await RuntimeDataBinding.detail(
          module,
          id
        );

      if (!record) {
        return "";
      }

      const label =
        ERPRelationDataLoader.getLabel(
          record as Record<string, unknown>
        );

      return label || id;
    } catch {
      return id;
    }
  }

  static getLabel(
    record: Record<string, unknown>
  ): string {
    const value = (key: string) =>
      String(record[key] ?? "").trim();

    const compact = (...parts: string[]) =>
      parts
        .filter((part) => Boolean(part && part.trim()))
        .join(" · ")
        .trim();

    const money = (key: string) => {
      const raw =
        record[key];

      if (
        raw === null ||
        raw === undefined ||
        raw === ""
      ) {
        return "";
      }

      const amount =
        Number(raw);

      if (Number.isNaN(amount)) {
        return String(raw);
      }

      return amount.toLocaleString("fr-FR") + " FCFA";
    };

    const id = value("id");

    const numeroFacture =
      value("numeroFacture");

    const referenceTransaction =
      value("referenceTransaction");

    const referencePaiement =
      value("referencePaiement");

    const reference =
      value("reference");

    const numero =
      value("numero");

    const montant =
      money("montant");

    const montantTTC =
      money("montantTTC");

    const resteAPayer =
      money("resteAPayer");

    const factureNumber =
      numeroFacture || referenceTransaction || referencePaiement || reference || numero;

    if (factureNumber) {
      const amount = montant || montantTTC || resteAPayer;
      return compact(factureNumber, amount);
    }

    const marque =
      value("marque");

    const modele =
      value("modele");

    const immatriculation =
      value("immatriculation");

    const vehiculeLabel =
      compact(
        compact(marque, modele),
        immatriculation
      );

    if (vehiculeLabel) {
      return vehiculeLabel;
    }

    const nom =
      value("nom");

    const prenom =
      value("prenom");

    const raisonSociale =
      value("raisonSociale");

    const codeClient =
      value("codeClient");

    const personneLabel =
      compact(
        compact(prenom, nom),
        codeClient
      );

    if (personneLabel) {
      return personneLabel;
    }

    if (raisonSociale) {
      return compact(raisonSociale, codeClient);
    }

    const typeIntervention =
      value("typeIntervention");

    const dateIntervention =
      value("dateIntervention");

    if (typeIntervention) {
      return compact(typeIntervention, dateIntervention);
    }

    const motif =
      value("motif");

    const dateRendezVous =
      value("dateRendezVous");

    if (motif) {
      return compact(motif, dateRendezVous);
    }

    const name =
      value("name");

    const label =
      value("label");

    const titre =
      value("titre");

    const libelle =
      value("libelle");

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

    const code =
      value("code");

    const typeContrat =
      value("typeContrat");

    const referenceLabel =
      compact(
        typeContrat,
        reference || numero
      );

    if (referenceLabel) {
      return referenceLabel;
    }

    if (code) {
      return code;
    }

    const commune =
      value("commune");

    const adresse =
      value("adresse");

    const typeExploitation =
      value("typeExploitation");

    const localisationLabel =
      compact(
        commune,
        adresse
      );

    if (localisationLabel) {
      return localisationLabel;
    }

    if (typeExploitation) {
      return typeExploitation;
    }

    const designation =
      value("designation");

    const produit =
      value("produit");

    if (designation) {
      return designation;
    }

    if (produit) {
      return produit;
    }

    const telephone =
      value("telephone");

    const phone =
      value("phone");

    const email =
      value("email");

    if (telephone) {
      return telephone;
    }

    if (phone) {
      return phone;
    }

    if (email) {
      return email;
    }

    return id;
  }
}
