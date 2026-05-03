export type BaseEntity = {
  id?: string;

  createdAt?: string;

  updatedAt?: string;
};

export type BaseAuditEntity =
BaseEntity & {

  createdBy?: string;

  updatedBy?: string;
};