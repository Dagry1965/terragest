import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";
import type {
  ERPComplianceIssue,
  ERPComplianceReport,
} from "./ERPComplianceTypes";

export class ERPComplianceChecker {
  checkModules(modules: ERPModuleDefinition[]): ERPComplianceReport {
    const issues: ERPComplianceIssue[] = [];

    for (const module of modules) {
      this.checkModule(module, issues);
    }

    const criticalCount = issues.filter(
      (issue) => issue.severity === "critical"
    ).length;

    const warningCount = issues.filter(
      (issue) => issue.severity === "warning"
    ).length;

    const score = Math.max(
      0,
      100 - criticalCount * 15 - warningCount * 5
    );

    return {
      generatedAt: new Date().toISOString(),
      score,
      issues,
    };
  }

  private checkModule(
    module: ERPModuleDefinition,
    issues: ERPComplianceIssue[]
  ) {
    if (!module.collection) {
      issues.push({
        moduleKey: module.key,
        severity: "critical",
        code: "MISSING_COLLECTION",
        message: "Le module ne déclare pas de collection.",
        recommendation: "Ajouter collection dans ERPModuleDefinition.",
      });
    }

    if (!module.fields || module.fields.length === 0) {
      issues.push({
        moduleKey: module.key,
        severity: "critical",
        code: "MISSING_FIELDS",
        message: "Le module ne déclare aucun champ.",
        recommendation: "Ajouter fields dans ERPModuleDefinition.",
      });
    }

    if (!module.actions || module.actions.length === 0) {
      issues.push({
        moduleKey: module.key,
        severity: "warning",
        code: "MISSING_ACTIONS",
        message: "Le module ne déclare aucune action.",
        recommendation: "Ajouter actions dans ERPModuleDefinition.",
      });
    }

    if (!module.auditEnabled) {
      issues.push({
        moduleKey: module.key,
        severity: "warning",
        code: "AUDIT_DISABLED",
        message: "Audit ERP désactivé.",
        recommendation: "Activer auditEnabled.",
      });
    }

    if (!module.supervisionEnabled) {
      issues.push({
        moduleKey: module.key,
        severity: "warning",
        code: "SUPERVISION_DISABLED",
        message: "Supervision ERP désactivée.",
        recommendation: "Activer supervisionEnabled.",
      });
    }

    if (!module.observabilityEnabled) {
      issues.push({
        moduleKey: module.key,
        severity: "warning",
        code: "OBSERVABILITY_DISABLED",
        message: "Observabilité ERP désactivée.",
        recommendation: "Activer observabilityEnabled.",
      });
    }
  }
}