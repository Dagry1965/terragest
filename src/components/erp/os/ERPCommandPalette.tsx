import Link from "next/link";
import { ERPCommandCenter } from "@/runtime/os-enterprise";

export function ERPCommandPalette() {
  const commands = ERPCommandCenter.commands();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">
          Commandes ERP
        </h2>
        <p className="text-sm text-slate-500">
          Acces rapide aux actions globales.
        </p>
      </div>

      <div className="space-y-2">
        {commands.slice(0, 4).map((command) => (
          <Link
            key={command.id}
            href={command.href ?? "#"}
            className="block rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <p className="text-sm font-black text-slate-900">
              {command.label}
            </p>

            {command.description && (
              <p className="mt-1 text-xs text-slate-500">
                {command.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}