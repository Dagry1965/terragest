"use client";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-slate-400">
          © {new Date().getFullYear()} AMARKHYS. Garage premium digitalisé.
        </p>

        <p>
          Diagnostic • Entretien • Performance • Suivi atelier
        </p>
      </div>
    </footer>
  );
}
