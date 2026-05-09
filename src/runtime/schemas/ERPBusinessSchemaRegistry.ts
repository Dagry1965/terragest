import type {
  ERPBusinessSchema,
} from "./ERPBusinessSchema";

export class ERPBusinessSchemaRegistry {

  private schemas:
    ERPBusinessSchema[] = [];

  registerSchema(
    schema: ERPBusinessSchema
  ) {

    this.schemas.push(schema);
  }

  getSchemas() {

    return this.schemas;
  }

  getSchema(
    module: string
  ) {

    return this.schemas.find(
      schema =>
        schema.module === module
    );
  }
}

export const erpBusinessSchemaRegistry =
  new ERPBusinessSchemaRegistry();