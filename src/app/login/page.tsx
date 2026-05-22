"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase/config";

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

    if (
      loading
    ) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const normalizedEmail =
        email.trim();

      if (
        !normalizedEmail ||
        !password
      ) {
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
          uid:
            credential.user.uid,
          email:
            credential.user.email,
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
    <main
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_top,#DDF8F1_0%,#F8FAFC_42%,#ECFDF5_100%)]
        px-4
        py-10
        flex
        items-center
        justify-center
      "
    >
      <section
        className="
          w-full
          max-w-md
          rounded-[32px]
          border
          border-white/70
          bg-white/80
          p-8
          shadow-[0_30px_90px_rgba(15,23,42,0.14)]
          backdrop-blur-xl
        "
      >
        <div
          className="
            mb-8
            text-center
          "
        >
          <div
            className="
              mx-auto
              mb-4
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-3xl
              bg-[#064E3B]
              text-2xl
              font-black
              text-white
              shadow-[0_18px_38px_rgba(6,78,59,0.28)]
            "
          >
            A
          </div>

          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.28em]
              text-[#047857]
            "
          >
            AMARKHYS Garage
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-black
              tracking-tight
              text-[#0F172A]
            "
          >
            Connexion
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-[#64748B]
            "
          >
            Accédez au cockpit garage, aux rendez-vous,
            interventions, factures et encaissements.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="
            flex
            flex-col
            gap-4
          "
        >
          <label
            className="
              flex
              flex-col
              gap-2
              text-sm
              font-bold
              text-[#334155]
            "
          >
            Email professionnel

            <input
              type="email"
              autoComplete="email"
              placeholder="demo@amarkhys.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-[#0F172A]
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#14B8A6]
                focus:ring-4
                focus:ring-[#14B8A6]/10
              "
            />
          </label>

          <label
            className="
              flex
              flex-col
              gap-2
              text-sm
              font-bold
              text-[#334155]
            "
          >
            Mot de passe

            <input
              type="password"
              autoComplete="current-password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-[#0F172A]
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#14B8A6]
                focus:ring-4
                focus:ring-[#14B8A6]/10
              "
            />
          </label>

          {error ? (
            <div
              className="
                rounded-2xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                font-semibold
                leading-6
                text-red-700
              "
            >
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-2
              rounded-2xl
              bg-[#064E3B]
              px-4
              py-3
              text-sm
              font-black
              text-white
              shadow-[0_18px_36px_rgba(6,78,59,0.24)]
              transition
              hover:-translate-y-0.5
              hover:bg-[#047857]
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >
            {loading
              ? "Connexion..."
              : "Se connecter à AMARKHYS"}
          </button>
        </form>
      </section>
    </main>
  );
}