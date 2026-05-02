"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { AuthService } from "@/services/AuthService";

export const Sidebar = () => {

  const router = useRouter();

  const handleLogout = async () => {

    await AuthService.logout();

    router.push("/login");
  };

  return (

    <aside className="w-72 min-h-screen bg-black text-white flex flex-col">

      <div className="p-6 border-b border-gray-800">

        <h1 className="text-3xl font-bold">
          Terragest
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          ERP patrimonial rural
        </p>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          href="/dashboard"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Dashboard
        </Link>

        <Link
          href="/terrains"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Terrains
        </Link>

        <Link
          href="/exploitations"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Exploitations
        </Link>

        <Link
          href="/ressources"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Ressources
        </Link>

        <Link
          href="/produits"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Produits
        </Link>

        <Link
          href="/mouvements"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Mouvements
        </Link>

      </nav>

      <div className="p-4 border-t border-gray-800">

        <button
          onClick={handleLogout}
          className="w-full bg-white text-black rounded-lg p-3"
        >
          Déconnexion
        </button>

      </div>

    </aside>
  );
}
