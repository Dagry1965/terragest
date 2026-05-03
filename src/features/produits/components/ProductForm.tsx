"use client";

import { useState }
from "react";

import { EntityForm }
from "@/components/crud/EntityForm";

import { ProductService }
from "@/features/produits/services/ProductService";

export const ProductForm = () => {

  const [values, setValues] =
    useState({
      nom: "",
      categorie: "",
      unite: "",
      quantite: 0,
      prix: 0,
    });

  function handleChange(
    name: string,
    value: any
  ) {

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {

    await ProductService.create({
      ...values,
      actif: true,
    });

    alert("Produit crÃ©Ã©");
  }

  return (
    <EntityForm
      fields={[
        {
          name: "nom",
          label: "Nom",
        },
        {
          name: "categorie",
          label: "CatÃ©gorie",
        },
        {
          name: "unite",
          label: "UnitÃ©",
        },
        {
          name: "quantite",
          label: "QuantitÃ©",
          type: "number",
        },
        {
          name: "prix",
          label: "Prix",
          type: "number",
        },
      ]}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};