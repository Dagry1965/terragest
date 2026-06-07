const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
}

function replaceOrFail(file, content, regex, replacer) {
  if (!regex.test(content)) {
    throw new Error(`[MISSING REGEX] ${file}\n${regex}`);
  }
  return content.replace(regex, replacer);
}

let changed = 0;

// 1) ERPModule.ts : ajouter ERPActionRelationRule + champs governance relationnels
{
  const file = "src/runtime/modules/ERPModule.ts";
  let content = read(file);
  const before = content;

  if (!content.includes("export interface ERPActionRelationRule")) {
    content = replaceOrFail(
      file,
      content,
      /(export interface ERPActionFeedbackConfig\s*\{[\s\S]*?\n\s*\})/,
      `$1

export interface ERPActionRelationRule {
  moduleKey: string;
  foreignKey: string;
  sourceField?: string;
  activeOnly?: boolean;
}`
    );
  }

  if (!content.includes("disabledWhenRelationExists?: ERPActionRelationRule[];")) {
    content = replaceOrFail(
      file,
      content,
      /(disabledWhen\?: ERPActionVisibilityRule\[\];)/,
      `$1
  hiddenWhenRelationExists?: ERPActionRelationRule[];
  visibleWhenRelationNotExists?: ERPActionRelationRule[];
  disabledWhenRelationExists?: ERPActionRelationRule[];`
    );
  }

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

// 2) RuntimeActionEngine.ts : imports + helpers + guard execute
{
  const file = "src/runtime/actions/RuntimeActionEngine.ts";
  let content = read(file);
  const before = content;

  if (!content.includes("ERPActionRelationRule")) {
    content = content.replace(
      "ERPActionVisibilityRule,",
      "ERPActionRelationRule,\n  ERPActionVisibilityRule,"
    );
  }

  if (!content.includes("@/runtime/data-binding/RuntimeDataBinding")) {
    content = content.replace(
      /from "@\/runtime\/modules\/ERPModule";/,
      `from "@/runtime/modules/ERPModule";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding/RuntimeDataBinding";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";`
    );
  }

  if (!content.includes("static async relationExists(")) {
    content = replaceOrFail(
      file,
      content,
      /(static matchesAnyActionGovernanceRule\([\s\S]*?\n\s*\})/,
      `$1

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
        status === "annulée"
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
    }`
    );
  }

  if (!content.includes("Q2_L_B3_I_RELATION_GOVERNANCE_EXECUTE_GUARD")) {
    content = replaceOrFail(
      file,
      content,
      /(if \(availableAction\?\.disabled\) \{[\s\S]*?\n\s*\}\n\s*)/,
      `$1
      // Q2_L_B3_I_RELATION_GOVERNANCE_EXECUTE_GUARD
      // Generic async relation governance guard for runtime actions.
      const relationGovernanceBlockReason =
        await RuntimeActionEngine.getRelationGovernanceBlockReason({
          action: availableAction,
          record,
        });

      if (relationGovernanceBlockReason) {
        return {
          success: false,
          severity: "warning",
          title: "Action désactivée",
          message: relationGovernanceBlockReason,
          action,
          record,
        };
      }

`
    );
  }

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

// 3) interventionsauto.actions.ts : ajouter règle relationnelle sur creer-facture
{
  const file = "src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts";
  let content = read(file);
  const before = content;

  if (!content.includes("disabledWhenRelationExists")) {
    content = replaceOrFail(
      file,
      content,
      /governance:\s*\{\s*visibleWhen:\s*\[\s*\{\s*field:\s*"statut",\s*equals:\s*"terminee"\s*\},\s*\],\s*\}/,
      `governance: {
      visibleWhen: [
        { field: "statut", equals: "terminee" },
      ],
      disabledWhenRelationExists: [
        {
          moduleKey: "facturesauto",
          foreignKey: "interventionId",
          activeOnly: true,
        },
      ],
      disabledReason: "Une facture existe déjà pour cette intervention.",
    }`
    );
  }

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

console.log("[Q2-L-B3-I-B1B] Changed files:", changed);