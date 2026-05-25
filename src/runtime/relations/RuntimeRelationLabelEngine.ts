import type { ERPModule } from "@/runtime/modules/ERPModule";

export interface RuntimeRelationLabelContext {
  moduleKey: string;
  record: Record<string, unknown>;
  modules: ERPModule[];

  /**
   * Maximum nested relation label resolution depth.
   * 0 = no nested resolution, 1 = resolve direct relation fields only.
   */
  depth?: number;

  /**
   * Optional resolver injected by the caller.
   * Keeps this engine generic and avoids importing the data loader here.
   */
  resolveRelationLabel?: (
    moduleKey: string,
    id: string,
    depth: number
  ) => Promise<string>;
}

export interface RuntimeRelationLabelResult {
  label: string;
  source: "metadata" | "fallback";
}

function compact(...parts: string[]): string {
  return parts
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" · ")
    .trim();
}

function formatStatus(value: unknown): string {
  const text = String(value ?? "").trim();

  const labels: Record<string, string> = {
    actif: "Actif",
    active: "Actif",
    prospect: "Prospect",
    inactif: "Inactif",
    inactive: "Inactif",
    archive: "Archivé",
    suspendu: "Suspendu",
    disponible: "Disponible",
    stock_faible: "Stock faible",
    rupture: "Rupture",
    brouillon: "Brouillon",
    validee: "Validée",
    validée: "Validée",
    envoyee: "Envoyée",
    envoyée: "Envoyée",
    recue: "Reçue",
    reçue: "Reçue",
    partiellement_recue: "Partiellement reçue",
    partiellement_reçue: "Partiellement reçue",
  };

  return labels[text] ?? labels[text.toLowerCase()] ?? text;
}

function formatMoney(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const amount = Number(value);

  return Number.isFinite(amount)
    ? `${amount.toLocaleString("fr-FR")} FCFA`
    : String(value);
}

function isMoneyField(fieldKey: string): boolean {
  const key = fieldKey.toLowerCase();
  return key.includes("montant") || key.includes("prix");
}

function isStatusField(fieldKey: string): boolean {
  const key = fieldKey.toLowerCase();
  return key.includes("statut") || key.includes("status");
}

function findModule(
  modules: ERPModule[],
  moduleKey: string
): ERPModule | undefined {
  return modules.find(
    (module) =>
      module.metadata.key === moduleKey ||
      module.schema?.collection === moduleKey
  );
}

export class RuntimeRelationLabelEngine {
  static buildLabel(context: RuntimeRelationLabelContext): RuntimeRelationLabelResult {
    const module = findModule(context.modules, context.moduleKey);
    const labelFields =
      (module?.composition as { labelFields?: string[] } | undefined)
        ?.labelFields ?? [];

    if (labelFields.length > 0) {
      const label = compact(
        ...labelFields.map((fieldKey) => {
          const raw = context.record[fieldKey];

          if (raw === null || raw === undefined || raw === "") {
            return "";
          }

          if (isStatusField(fieldKey)) {
            return formatStatus(raw);
          }

          if (isMoneyField(fieldKey)) {
            return formatMoney(raw);
          }

          return String(raw).trim();
        })
      );

      if (label) {
        return {
          label,
          source: "metadata",
        };
      }
    }

    return {
      label: RuntimeRelationLabelEngine.buildFallbackLabel(context.record),
      source: "fallback",
    };
  }

  static async buildLabelAsync(
    context: RuntimeRelationLabelContext
  ): Promise<RuntimeRelationLabelResult> {
    const module = findModule(context.modules, context.moduleKey);
    const labelFields =
      (module?.composition as { labelFields?: string[] } | undefined)
        ?.labelFields ?? [];

    if (labelFields.length === 0) {
      return {
        label: RuntimeRelationLabelEngine.buildFallbackLabel(context.record),
        source: "fallback",
      };
    }

    const depth = context.depth ?? 1;
    const parts: string[] = [];

    for (const fieldKey of labelFields) {
      const raw = context.record[fieldKey];

      if (raw === null || raw === undefined || raw === "") {
        continue;
      }

      const fieldDefinition = module?.schema?.fields?.find(
        (field) => field.key === fieldKey
      ) as
        | {
            key: string;
            type?: string;
            relation?: string | { module?: string };
            references?: { module?: string };
          }
        | undefined;

      const targetModule =
        fieldDefinition?.references?.module ??
        (typeof fieldDefinition?.relation === "string"
          ? fieldDefinition.relation
          : fieldDefinition?.relation?.module) ??
        "";

      if (
        depth > 0 &&
        fieldDefinition?.type === "relation" &&
        targetModule &&
        context.resolveRelationLabel
      ) {
        try {
          const resolved = await context.resolveRelationLabel(
            targetModule,
            String(raw),
            depth - 1
          );

          if (resolved && resolved !== String(raw)) {
            parts.push(resolved);
            continue;
          }
        } catch {
          // Never break relation option loading because a nested label failed.
        }
      }

      if (isStatusField(fieldKey)) {
        parts.push(formatStatus(raw));
        continue;
      }

      if (isMoneyField(fieldKey)) {
        parts.push(formatMoney(raw));
        continue;
      }

      parts.push(String(raw).trim());
    }

    const label = compact(...parts);

    if (label) {
      return {
        label,
        source: "metadata",
      };
    }

    return {
      label: RuntimeRelationLabelEngine.buildFallbackLabel(context.record),
      source: "fallback",
    };
  }

  static buildFallbackLabel(record: Record<string, unknown>): string {
    const preferred = compact(
      String(record.nom ?? ""),
      String(record.designation ?? ""),
      String(record.reference ?? ""),
      String(record.code ?? "")
    );

    if (preferred) {
      return preferred;
    }

    const id = String(record.id ?? record._id ?? "").trim();

    if (id) {
      return `Enregistrement ${id.slice(0, 8)}`;
    }

    return "Enregistrement";
  }
}