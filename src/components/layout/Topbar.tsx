"use client";

import {
  signOut,
} from "firebase/auth";

import { auth }
from "@/lib/firebase/config";

import { useRouter }
from "next/navigation";

export const Topbar = () => {

  const router =
    useRouter();

  async function handleLogout() {

    await signOut(auth);

    router.push("/login");
  }

  return (
    <header
      className="
        h-16
        bg-white
        border-b
        flex
        items-center
        justify-between
        px-6
      "
    >
      <div>

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Terragest ERP
        </h2>

        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Gestion Agricole
        </p>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            hidden
            md:block
            text-right
          "
        >
          <p className="font-medium">
            Admin
          </p>

          <p
            className="
              text-xs
              text-gray-500
            "
          >
            Super utilisateur
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
};