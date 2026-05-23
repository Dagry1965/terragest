import {
  Clock3,
  LockKeyhole,
  ShieldCheck,
  Star,
} from "lucide-react";

const trust = [
  {
    icon: ShieldCheck,
    title: "Données sécurisées",
    description: "Vos informations restent confidentielles.",
  },
  {
    icon: Clock3,
    title: "Réponse rapide",
    description: "Confirmation sous 1h ouvrée.",
  },
  {
    icon: Star,
    title: "Service premium",
    description: "Accueil, suivi, facture et reçu.",
  },
  {
    icon: LockKeyhole,
    title: "Confidentialité",
    description: "Votre demande est traitée avec soin.",
  },
];

export function PublicTrust() {
  return (
    <section className="bg-[#020807] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1460px] rounded-[1.45rem] border border-[#d7a83f]/24 bg-gradient-to-r from-[#1a1608]/78 via-[#061915]/84 to-[#1a1608]/78 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trust.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7a83f]/35 bg-[#2a2108]/55 text-[#f8d479]">
                  <Icon className="h-6 w-6" />
                </span>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[#f8d479]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
