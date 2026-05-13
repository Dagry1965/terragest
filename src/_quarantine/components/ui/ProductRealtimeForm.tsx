"use client";

import {
  useState,
} from "react";

import {
  ProductsRepository,
} from "@/lib/firestore/repositories/ProductsRepository";

export const ProductRealtimeForm = () => {

  const [nom,
    setNom] =
    useState("");

  const [categorie,
    setCategorie] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        await ProductsRepository.create({

          nom,

          categorie,

          createdAt:
            new Date(),
        });

        setNom("");

        setCategorie("");

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-8
      space-y-4
    ">

      <h1 className="
        text-3xl
        font-bold
      ">
        Nouveau Produit
      </h1>

      <input
        placeholder="Nom"
        value={nom}
        onChange={(e) =>
          setNom(
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
        placeholder="Categorie"
        value={categorie}
        onChange={(e) =>
          setCategorie(
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

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
        "
      >

        {loading
          ? "Creation..."
          : "Créer"}

      </button>

    </div>
  );
}
