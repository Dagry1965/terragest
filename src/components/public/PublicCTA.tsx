import Link from "next/link";
import {
  ArrowRight,
  CalendarPlus,
  MessageCircle,
} from "lucide-react";

const whatsappHref =
  "https://wa.me/2250700000000?text=Bonjour%20AMARKHYS%2C%20je%20souhaite%20prendre%20rendez-vous%20pour%20mon%20v%C3%A9hicule.";

export function PublicCTA() {
  return (
    <section className="bg-[#020807] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1460px] overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/26 bg-gradient-to-br from-[#075f53] via-[#053d36] to-[#031612] p-8 shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#23ead4]/12 lg:p-12">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#f8d479]">
              Prêt à réserver ?
            </p>

            <h2 className="mt-3 text-4xl font-black text-white">
              Demandez votre rendez-vous atelier maintenant.
            </h2>

            <p className="mt-4 text-base leading-7 text-cyan-50/75">
              Un conseiller AMARKHYS vous recontacte rapidement pour confirmer le créneau.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link
              href="/rdv"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f5c04a] via-[#d7a83f] to-[#9a6a17] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#0b0b05] shadow-[0_0_60px_rgba(215,168,63,0.22)] transition hover:scale-[1.01]"
            >
              <CalendarPlus className="h-5 w-5" />
              Prendre RDV
              <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#23ead4]/24 bg-black/18 px-6 py-4 text-sm font-black text-white transition hover:bg-black/28"
            >
              <MessageCircle className="h-5 w-5 text-[#23ead4]" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
