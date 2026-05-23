import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#020807] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1460px] flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black text-white">
            AMARKHYS Garage
          </p>

          <p className="mt-1">
            L’excellence automobile au service de votre véhicule.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:text-white">
            Accueil
          </Link>

          <Link href="/rdv" className="hover:text-white">
            Rendez-vous
          </Link>

          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
