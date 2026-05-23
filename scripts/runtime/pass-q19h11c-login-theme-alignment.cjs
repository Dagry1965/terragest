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

const pagePath = "src/app/login/page.tsx";

backup(pagePath, ".bak-q19h11c-login-theme");

write(pagePath, String.raw`"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Car,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";

import {
  auth,
} from "@/lib/firebase/config";

function InfoCard({
  icon: Icon,
  title,
  description,
  gold = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gold?: boolean;
}) {
  return (
    <div
      className={
        gold
          ? "rounded-[1.25rem] border border-[#d7a83f]/35 bg-gradient-to-br from-[#1c1809] via-[#083f38] to-[#03130f] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.38)]"
          : "rounded-[1.25rem] border border-[#21d7c4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.38)]"
      }
    >
      <span
        className={
          gold
            ? "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d7a83f]/55 bg-[#2f260c] text-[#f8d479]"
            : "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#23ead4]/35 bg-[#063f39] text-[#23ead4]"
        }
      >
        <Icon className="h-6 w-6" />
      </span>

      <h3 className="text-base font-black text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-cyan-50/75">
        {description}
      </p>
    </div>
  );
}

function InputShell({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center rounded-xl border border-white/13 bg-black/20 px-4 shadow-inner shadow-black/20 transition focus-within:border-[#23ead4]/50 focus-within:shadow-[0_0_0_4px_rgba(35,234,212,0.08)]">
      <Icon className="h-4 w-4 shrink-0 text-[#23ead4]/80" />
      {children}
    </div>
  );
}

export default function LoginPage() {
  const router =
    useRouter();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const normalizedEmail =
        email.trim();

      if (!normalizedEmail || !password) {
        setError(
          "Veuillez saisir l’email et le mot de passe."
        );

        return;
      }

      const credential =
        await signInWithEmailAndPassword(
          auth,
          normalizedEmail,
          password
        );

      console.log(
        "LOGIN_SUCCESS",
        {
          uid: credential.user.uid,
          email: credential.user.email,
        }
      );

      document.cookie =
        "token=authenticated; path=/; max-age=86400; SameSite=Lax";

      router.replace(
        "/dashboard/amarkhys"
      );
    } catch (err: unknown) {
      console.error(
        "LOGIN_ERROR",
        err
      );

      setError(
        "Connexion impossible. Vérifiez l’email, le mot de passe et le projet Firebase utilisé."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020807] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(35,234,212,0.10),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(215,168,63,0.10),transparent_24%),radial-gradient(circle_at_70%_80%,rgba(7,95,83,0.34),transparent_34%),linear-gradient(135deg,#020807_0%,#03130f_50%,#020807_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="relative mx-auto grid min-h-screen max-w-[1460px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-10">
        <section className="lg:col-span-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black text-slate-200 transition hover:border-[#23ead4]/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au site
          </Link>

          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#23ead4]/24 bg-white/[0.045] px-4 py-2 text-xs font-black text-white backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#23ead4]" />
              Cockpit AMARKHYS
            </span>

            <span className="inline-flex items-center gap-2 rounded-xl border border-[#d7a83f]/45 bg-[#2b2208]/60 px-4 py-2 text-xs font-black text-[#f8d479] shadow-[0_0_24px_rgba(215,168,63,0.12)]">
              <ShieldCheck className="h-4 w-4" />
              Accès sécurisé
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Connectez-vous au cockpit garage.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Retrouvez vos rendez-vous, clients, véhicules, interventions,
            factures, encaissements et reçus dans l’espace AMARKHYS.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <InfoCard
              icon={Car}
              title="Véhicules"
              description="Suivi client et véhicule centralisé."
            />

            <InfoCard
              icon={Wrench}
              title="Atelier"
              description="Rendez-vous et interventions pilotés."
              gold
            />

            <InfoCard
              icon={BadgeCheck}
              title="Factures"
              description="Paiements, reçus et suivi client."
            />
          </div>
        </section>

        <section className="lg:col-span-6">
          <div className="mx-auto max-w-md rounded-[1.6rem] border border-[#23ead4]/25 bg-gradient-to-br from-[#075f53] via-[#053d36] to-[#031612] p-6 shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#23ead4]/12 sm:p-8">
            <div className="mb-8">
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d7a83f]/45 bg-[#2b2208]/70 text-[#f8d479] shadow-[0_0_45px_rgba(215,168,63,0.14)]">
                <LockKeyhole className="h-8 w-8" />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#23ead4]">
                AMARKHYS Garage
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                Connexion
              </h2>

              <p className="mt-3 text-sm leading-6 text-cyan-50/75">
                Accédez au cockpit garage, aux rendez-vous, interventions,
                factures et encaissements.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="grid gap-5"
            >
              <label className="space-y-2">
                <span className="text-sm font-black text-white">
                  Email professionnel
                </span>

                <InputShell icon={Mail}>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="demo@amarkhys.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                  />
                </InputShell>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-black text-white">
                  Mot de passe
                </span>

                <InputShell icon={KeyRound}>
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    className="w-full bg-transparent px-3 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
                  />
                </InputShell>
              </label>

              {error ? (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold leading-6 text-red-100">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f5c04a] via-[#d7a83f] to-[#9a6a17] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#0b0b05] shadow-[0_0_60px_rgba(215,168,63,0.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Connexion..."
                  : "Se connecter à AMARKHYS"}

                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="text-center text-xs leading-6 text-cyan-50/55">
                Accès réservé aux utilisateurs autorisés du cockpit AMARKHYS.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
`);

console.log("");
console.log("[Q19H11C_DONE] Login page aligned with AMARKHYS premium theme.");
console.log("");
console.log("Next:");
console.log("  pnpm build");