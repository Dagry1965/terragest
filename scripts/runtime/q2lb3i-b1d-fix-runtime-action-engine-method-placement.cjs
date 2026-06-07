const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/actions/RuntimeActionEngine.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const helperBlock = `
    static getRecordId(record: Record<string, unknown> | undefined): string {
      return String(
        record?.id ??
          record?._id ??
          record?.recordId ??
          record?.docId ??
          ""
      ).trim();
    }

    static getRelationRuleSourceValue(
      record: Record<string, unknown> | undefined,
      rule: ERPActionRelationRule
    ): string {
      if (!record) return "";

      if (rule.sourceField) {
        return String(record[rule.sourceField] ?? "").trim();
      }

      return RuntimeActionEngine.getRecordId(record);
    }

    static isActiveRelationRecord(record: Record<string, unknown>): boolean {
      const status = String(record.statut ?? record.status ?? "").toLowerCase();

      return !(
        record.deletedAt ||
        record.removedAt ||
        status === "annulee" ||
        status === "annulée" ||
        status === "annulÃ©e"
      );
    }

    static async relationExists(
      record: Record<string, unknown> | undefined,
      rule: ERPActionRelationRule
    ): Promise<boolean> {
      const sourceValue =
        RuntimeActionEngine.getRelationRuleSourceValue(record, rule);

      if (!sourceValue) return false;

      const targetModule =
        allERPModules.find(
          (candidate) => candidate.metadata.key === rule.moduleKey
        );

      if (!targetModule) return false;

      const records =
        await RuntimeDataBinding.list(targetModule);

      return records.some((candidate) => {
        if (String(candidate[rule.foreignKey] ?? "").trim() !== sourceValue) {
          return false;
        }

        return rule.activeOnly
          ? RuntimeActionEngine.isActiveRelationRecord(candidate)
          : true;
      });
    }

    static async anyRelationExists(
      record: Record<string, unknown> | undefined,
      rules?: ERPActionRelationRule[]
    ): Promise<boolean> {
      if (!rules || rules.length === 0) return false;

      for (const rule of rules) {
        if (await RuntimeActionEngine.relationExists(record, rule)) {
          return true;
        }
      }

      return false;
    }

    static async allRelationsDoNotExist(
      record: Record<string, unknown> | undefined,
      rules?: ERPActionRelationRule[]
    ): Promise<boolean> {
      if (!rules || rules.length === 0) return true;

      for (const rule of rules) {
        if (await RuntimeActionEngine.relationExists(record, rule)) {
          return false;
        }
      }

      return true;
    }

    static async getRelationGovernanceBlockReason({
      action,
      record,
    }: {
      action: ERPModuleAction;
      record?: Record<string, unknown>;
    }): Promise<string | null> {
      const governance = action.governance;

      if (!governance) return null;

      if (
        await RuntimeActionEngine.anyRelationExists(
          record,
          governance.hiddenWhenRelationExists
        )
      ) {
        return governance.disabledReason ??
          "Cette action n'est pas disponible car un enregistrement lié existe déjà.";
      }

      if (
        !(await RuntimeActionEngine.allRelationsDoNotExist(
          record,
          governance.visibleWhenRelationNotExists
        ))
      ) {
        return governance.disabledReason ??
          "Cette action n'est pas disponible car un enregistrement lié existe déjà.";
      }

      if (
        await RuntimeActionEngine.anyRelationExists(
          record,
          governance.disabledWhenRelationExists
        )
      ) {
        return governance.disabledReason ??
          "Cette action est désactivée car un enregistrement lié existe déjà.";
      }

      return null;
    }

`;

// Remove broken or misplaced helper block if present.
content = content.replace(
  /\n\s*static getRecordId\(record: Record<string, unknown> \| undefined\): string \{[\s\S]*?static async getRelationGovernanceBlockReason\(\{[\s\S]*?return null;\s*\n\s*\}\s*\n/g,
  "\n"
);

// Find actual getAvailableActions marker with flexible whitespace.
const markerRegex = /\n(\s*)static\s+getAvailableActions\s*\(\s*\{/;

if (!content.includes("static async getRelationGovernanceBlockReason")) {
  const match = content.match(markerRegex);

  if (!match) {
    console.log("[DEBUG] static getAvailableActions not found. Nearby candidates:");
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line.includes("getAvailableActions")) {
        console.log(`${index + 1}: ${line}`);
      }
    });
    throw new Error("[Q2-L-B3-I-B1D] Missing insertion marker: getAvailableActions");
  }

  content = content.replace(markerRegex, "\n" + helperBlock + match[0]);
}

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[Q2-L-B3-I-B1D] Done");