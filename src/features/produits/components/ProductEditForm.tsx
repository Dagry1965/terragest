"use client";

import {
  useEffect,
  useState,
} from "react";

import { EntityForm }
from "@/components/crud/EntityForm";

import { useDocument }
from "@/hooks/useDocument";

import { Product }
from "@/features/produits/types/Product";

import { ProductsRepository }
from "@/features/produits/repositories/ProductsRepository";

type Props = {
  id: string;
};

export const ProductEditForm = ({
  id,
}: Props) => {

  const {
    data,
    loading,
  } = useDocument<Product>(
    "produits",
    id
  );

  const [values, setValues] =
    useState<any>(null);

  useEffect(() => {

    if (data) {

      setValues(data);
    }

  }, [data]);

  function handleChange(
    name: string,
    value: any
  ) {

    setValues((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {

    await ProductsRepository.update(
      id,
      values
    );

    alert("Produit modifiÃ©");
  }

  if (loading || !values) {

    return (
      <p>
        Chargement...
      </p>
    );
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