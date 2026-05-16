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

    const records = await RuntimeDataBinding.list(module);

    return records.map((record) => ({
      id: String(record.id),
      label: ERPRelationDataLoader.getLabel(record),
    }));
  }

  static getLabel(record: Record<string, unknown>) {
    const value = (key: string) =>
      String(record[key] ?? "").trim();

    const compact = (...parts: string[]) =>
      parts.filter(Boolean).join(" ").trim();

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
    const reference = value("reference");
    const numero = value("numero");
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
     * Exemple attendu :
     * Toyota Corolla AB123CD01
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
     * Exemple attendu :
     * Test Public
     */
    const personneLabel = compact(
      prenom,
      nom
    );

    if (personneLabel) {
      return personneLabel;
    }

    /**
     * Cas où le nom est déjà complet.
     */
    if (nom) {
      return nom;
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

    /**
     * Clients AMARKHYS / codes métier
     */
    if (codeClient) {
      return codeClient;
    }

    if (code) {
      return code;
    }

    /**
     * Contrats / factures / documents métier
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

    /**
     * Contact fallback.
     */
    if (telephone) {
      return telephone;
    }

    if (phone) {
      return phone;
    }

    if (email) {
      return email;
    }

    return String(record.id ?? "");
  }
}
