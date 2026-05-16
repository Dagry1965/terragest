import { ERPComplianceChecker } from "@/runtime/compliance/ERPComplianceChecker";
import { ERPModuleRegistry } from "@/runtime/modules/ERPModuleRegistry";
import { registerCoreERPModules } from "@/runtime/modules/registerCoreERPModules";

export default function CompliancePage() {
  registerCoreERPModules();

  const modules = ERPModuleRegistry.getAll();
  const report = new ERPComplianceChecker().checkModules(modules);

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ERP Compliance</h1>
        <p className="text-muted-foreground">
          Vérification de conformité des modules ERP.
        </p>
      </div>

      <div className="rounded-2xl border p-6 bg-white shadow-sm">
        <div className="text-sm text-muted-foreground">
          Score conformité
        </div>
        <div className="text-5xl font-bold">{report.score}%</div>
      </div>

      <div className="space-y-4">
        {report.issues.length === 0 && (
          <div className="rounded-2xl border p-6 bg-white">
            Aucun problème détecté.
          </div>
        )}

        {report.issues.map((issue, index) => (
          <div
            key={index}
            className="rounded-2xl border p-6 bg-white shadow-sm"
          >
            <div className="font-semibold">
              {issue.moduleKey} - {issue.code}
            </div>
            <div className="text-sm mt-2">{issue.message}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {issue.recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}