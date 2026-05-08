import { z } from "zod";

export const MouvementsStockSchema = z.object({
  id: z.string().optional(),

  organizationId: z.string().optional(),

  nom: z.string().min(1),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type MouvementsStockSchemaType =
  z.infer<typeof MouvementsStockSchema>;
