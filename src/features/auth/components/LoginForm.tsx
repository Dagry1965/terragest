"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  AuthService,
} from "@/features/auth/services/AuthService";

export const LoginForm = () => {

  const router =
    useRouter();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  const handleLogin =
    async () => {

      try {

        setLoading(true);

        setError("");

        await AuthService.login(
          email,
          password
        );

        router.push(
          "/dashboard"
        );

      } catch (error: any) {

        console.error(error);

        setError(
          "Email ou mot de passe incorrect"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      w-full
      max-w-md
      bg-white
      rounded-2xl
      shadow-lg
      p-8
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Login
      </h1>

      <div className="
        space-y-4
      ">

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />

        {error && (

          <div className="
            text-red-500
            text-sm
          ">

            {error}

          </div>

        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            py-3
            rounded-xl
          "
        >

          {loading
            ? "Connexion..."
            : "Connexion"}

        </button>

      </div>

    </div>
  );
}