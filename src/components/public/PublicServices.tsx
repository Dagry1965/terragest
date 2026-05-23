import {
  Car,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Gauge,
    title: "Diagnostic",
    description:
      "Identification claire des besoins du véhicule avant intervention.",
  },
  {
    icon: Wrench,
    title: "Entretien",
    description:
      "Suivi atelier, prestations, main d’œuvre et contrôle des opérations.",
  },
  {
    icon: Car,
    title: "Réparation",
    description:
      "Prise en charge structurée du véhicule jusqu’à la restitution.",
  },
  {
    icon: ShieldCheck,
    title: "Suivi digital",
    description:
      "Facture, encaissement et reçu client dans un parcours cohérent.",
  },
];

export function PublicServices() {
  return (
    <section id="services" className="bg-[#020807] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1460px]">
        <div className="mb-9">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#23ead4]">
            Services atelier
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            Un garage moderne, structuré et premium.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={
                  index === 1
                    ? "rounded-[1.45rem] border border-[#d7a83f]/35 bg-gradient-to-br from-[#1c1809] via-[#083f38] to-[#03130f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
                    : "rounded-[1.45rem] border border-[#21d7c4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
                }
              >
                <div
                  className={
                    index === 1
                      ? "mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d7a83f]/55 bg-[#2f260c] text-[#f8d479]"
                      : "mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#23ead4]/35 bg-[#063f39] text-[#23ead4]"
                  }
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-black text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-cyan-50/75">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
