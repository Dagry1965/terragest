import type {
  __MODULE_PASCAL__
}
from "./__MODULE_PASCAL__";

export interface __MODULE_PASCAL__Repository {
  getAll(): Promise<__MODULE_PASCAL__[]>;

  getById(
    id: string
  ): Promise<__MODULE_PASCAL__ | null>;

  create(
    data: Partial<__MODULE_PASCAL__>
  ): Promise<unknown>;

  update(
    id: string,
    data: Partial<__MODULE_PASCAL__>
  ): Promise<void>;

  delete(
    id: string
  ): Promise<void>;
}