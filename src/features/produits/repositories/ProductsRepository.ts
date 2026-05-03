import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Product }
from "@/features/produits/types/Product";

class ProductsRepositoryClass
extends BaseRepository<Product> {

  constructor() {

    super("produits");
  }
}

export const ProductsRepository =
  new ProductsRepositoryClass();