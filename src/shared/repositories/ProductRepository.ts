import { BaseRepository } from "@/shared/repositories/BaseRepository";

import { Product } from "@/shared/types/Product";

export class ProductRepository
extends BaseRepository<Product> {

  constructor() {

    super("products");
  }
}
