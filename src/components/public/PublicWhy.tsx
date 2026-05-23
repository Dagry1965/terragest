import {
  CalendarCheck,
  FileCheck2,
  Receipt,
} from "lucide-react";

const items = [
  {
    icon: CalendarCheck,
    title: "Rendez-vous rapide",
    description:
      "Le client envoie sa demande et le garage confirme le passage.",
  },
  {
    icon: FileCheck2,
    title: "Intervention suivie",
    description:
      "Le dossier client, le véhicule et l’intervention restent structurés.",
  },
  {
    icon: Receipt,
    title: "Facture et reçu",
    description:
      "La chaîne client peut aller jusqu’au paiement et au reçu numérique.",
  },
];

export function PublicWhy() {
  return (
    <section className="bg-[#020807] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1460px] gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#f8d479]">
            Pourquoi AMARKHYS
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            Une expérience client cohérente du premier contact au règlement.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-300">
            AMARKHYS ne se limite pas à un formulaire : le rendez-vous ouvre un workflow garage complet.
          </p>
        </div>

        <div className="grid gap-5 lg:col-span-7">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex gap-5 rounded-[1.45rem] border border-[#d7a83f]/24 bg-gradient-to-r from-[#1a1608]/78 via-[#061915]/84 to-[#041b18] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)]"
              >
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7a83f]/35 bg-[#2a2108]/55 text-[#f8d479]">
                  <Icon className="h-6 w-6" />
                </span>

                <div>
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
