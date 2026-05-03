export interface BaseDTO {
  id?: string;

  organizationId?: string;

  createdAt?: Date;
  updatedAt?: Date;

  createdBy?: string;
  updatedBy?: string;

  deletedAt?: Date | null;

  status?: "ACTIVE" | "INACTIVE" | "ARCHIVED";
}