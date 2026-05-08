export interface RuntimeRelation {

  source: string;

  target: string;

  type:
    | "one-to-one"
    | "one-to-many"
    | "many-to-one"
    | "many-to-many";

  foreignKey?: string;

  label?: string;
}
