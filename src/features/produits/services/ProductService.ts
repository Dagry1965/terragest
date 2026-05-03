import { Product }
from "@/features/produits/types/Product";

import { ProductsRepository }
from "@/features/produits/repositories/ProductsRepository";

export const ProductService = {

  async create(
    product: Product
  ) {

    if (!product.nom) {

      throw new Error(
        "Nom obligatoire"
      );
    }

    if (product.prix < 0) {

      throw new Error(
        "Prix invalide"
      );
    }

    return await ProductsRepository.create(
      product
    );
  },

  async getAll() {

    return await ProductsRepository.getAll();
  },
};