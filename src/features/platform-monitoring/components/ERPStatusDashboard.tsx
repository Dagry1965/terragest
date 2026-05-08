"use client";

export function ERPStatusDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Platform Monitoring
        </h1>

        <p className="text-muted-foreground">
          Supervision globale de la plateforme ERP Terragest.
        </p>
      </div>

      <div
        className="
          rounded-2xl
          border
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="font-medium">
          Statut plateforme ERP
        </div>

        <div className="text-green-600 mt-2">
          Opérationnel
        </div>
      </div>
    </div>
  );
}