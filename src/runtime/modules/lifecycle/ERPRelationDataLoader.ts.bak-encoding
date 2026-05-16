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

  private static getLabel(record: Record<string, unknown>) {
    const nom = String(record.nom ?? "").trim();
    const prenom = String(record.prenom ?? "").trim();
    const email = String(record.email ?? "").trim();
    const label = String(record.label ?? "").trim();
    const name = String(record.name ?? "").trim();

    if (nom || prenom) {
      return `${prenom} ${nom}`.trim();
    }

    if (label) return label;
    if (name) return name;
    if (email) return email;

    return String(record.id ?? "Sans libellÃ©");
  }
}