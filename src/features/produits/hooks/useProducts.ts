"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Product }
from "@/features/produits/types/Product";

export function useProducts() {

  return useCollection<Product>(
    "produits"
  );
}