import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const items = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+2250700000000",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+2250700000000",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@amarkhys.com",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Abidjan, Côte d’Ivoire",
  },
];

export function PublicContact() {
  return (
    <section id="contact" className="bg-[#020807] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1460px]">
        <div className="mb-9">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#23ead4]">
            Contact
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            AMARKHYS Garage, à votre écoute.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={
                  index === 1
                    ? "rounded-[1.35rem] border border-[#d7a83f]/35 bg-gradient-to-br from-[#1c1809] via-[#083f38] to-[#03130f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
                    : "rounded-[1.35rem] border border-[#21d7c4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
                }
              >
                <div
                  className={
                    index === 1
                      ? "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d7a83f]/55 bg-[#2f260c] text-[#f8d479]"
                      : "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#23ead4]/35 bg-[#063f39] text-[#23ead4]"
                  }
                >
                  <Icon className="h-6 w-6" />
                </div>

                <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-300">
                  {item.title}
                </p>

                <p className="mt-2 text-base font-black text-white">
                  {item.value}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
