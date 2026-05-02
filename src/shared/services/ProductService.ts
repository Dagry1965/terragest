import { BaseCrudService } from "@/shared/services/BaseCrudService";

import { ProductRepository } from "@/shared/repositories/ProductRepository";

import { Product } from "@/shared/types/Product";

export class ProductService
extends BaseCrudService<Product> {

  constructor() {

    super(
      new ProductRepository()
    );
  }
}
