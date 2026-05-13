type ERPModuleActionPageTemplateProps = {
  moduleKey: string;
  action: string;
};

function formatLabel(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ERPModuleActionPageTemplate({
  moduleKey,
  action,
}: ERPModuleActionPageTemplateProps) {
  const moduleLabel = formatLabel(moduleKey);
  const actionLabel = formatLabel(action);

  return (
    <main className="space-y-6 p-6">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Module ERP
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
          {moduleLabel} — {actionLabel}
        </h1>

        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Cette page est générée automatiquement par le moteur ERP.
          Elle servira de point d’entrée runtime pour les fonctions
          d’audit, d’import, d’export, de relations et de workflows.
        </p>
      </section>
    </main>
  );
}