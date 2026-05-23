const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

function ensureRouterAndFlip(content, rotateClass) {
  if (!content.includes('useRouter')) {
    content = content.replace(
      'import Link from "next/link";',
      'import Link from "next/link";\nimport { useRouter } from "next/navigation";'
    );
  }

  if (!content.includes("const router =")) {
    content = content.replace(
      /export default function ([^(]+)\(([\s\S]*?)\) \{/,
      function (_match, name, args) {
        return `export default function ${name}(${args}) {
  const router =
    useRouter();

  const [isFlipping, setIsFlipping] =
    useState(false);

  function flipTo(targetHref: string) {
    if (isFlipping) {
      return;
    }

    setIsFlipping(true);

    window.setTimeout(() => {
      router.push(targetHref);
    }, 760);
  }`;
      }
    );
  }

  const oldClass =
    'className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/24 bg-[#fffaf0] text-[#0f172a] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#d7a83f]/18 transition duration-300 hover:-translate-y-1 hover:shadow-[0_48px_130px_rgba(0,0,0,0.62)]"';

  const newClass =
    `style={{ perspective: "1600px" }}
              className={
                "overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/24 bg-[#fffaf0] text-[#0f172a] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#d7a83f]/18 transition-all duration-[760ms] [transform-style:preserve-3d] hover:-translate-y-1 hover:shadow-[0_48px_130px_rgba(0,0,0,0.62)] " +
                (isFlipping
                  ? "${rotateClass} opacity-80"
                  : "opacity-100")
              }`;

  if (content.includes(oldClass)) {
    content = content.replace(oldClass, newClass);
  }

  return content;
}

const frontPage = "src/app/facture/[token]/page.tsx";
const backPage = "src/app/facture/[token]/details/page.tsx";

backup(frontPage, ".bak-q19h12g-slow-flip");
backup(backPage, ".bak-q19h12g-slow-flip");

let front = fs.readFileSync(p(frontPage), "utf8");
let back = fs.readFileSync(p(backPage), "utf8");

front = ensureRouterAndFlip(
  front,
  "[transform:rotateY(-88deg)_scale(0.985)]"
);

back = ensureRouterAndFlip(
  back,
  "[transform:rotateY(88deg)_scale(0.985)]"
);

// Recto : remplacer le lien détail par un bouton animé.
front = front.replace(
  `<Link
                        href={"/facture/" + token + "/details"}
                        className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl border border-[#0f766e]/20 bg-[#0f766e] px-5 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(15,118,110,0.22)] transition hover:bg-[#115e59]"
                      >
                        Retourner la facture
                        <ArrowRight className="h-4 w-4" />
                      </Link>`,
  `<button
                        type="button"
                        onClick={() => flipTo("/facture/" + token + "/details")}
                        className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl border border-[#0f766e]/20 bg-[#0f766e] px-5 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(15,118,110,0.22)] transition hover:bg-[#115e59]"
                      >
                        Retourner la facture
                        <ArrowRight className="h-4 w-4" />
                      </button>`
);

// Verso : remplacer le lien retour par un bouton animé.
back = back.replace(
  `<Link
            href={"/facture/" + token}
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black text-slate-200 transition hover:border-[#23ead4]/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au recto
          </Link>`,
  `<button
            type="button"
            onClick={() => flipTo("/facture/" + token)}
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black text-slate-200 transition hover:border-[#23ead4]/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au recto
          </button>`
);

write(frontPage, front);
write(backPage, back);

console.log("");
console.log("[Q19H12G_DONE] Slow public invoice flip transition applied.");
console.log("");
console.log("Next:");
console.log("  pnpm build");