// src/app/login/page.tsx

"use client";

import { useState }
from "react";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-zinc-100
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-sm
          p-8
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Connexion ERP
        </h1>

        <div
          className="
            flex
            flex-col
            gap-4
          "
        >

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={event =>
              setEmail(
                event.target.value
              )
            }

            className="
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <input

            type="password"

            placeholder="Mot de passe"

            value={password}

            onChange={event =>
              setPassword(
                event.target.value
              )
            }

            className="
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <button
            className="
              bg-black
              text-white
              rounded-xl
              py-3
              font-medium
            "
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
