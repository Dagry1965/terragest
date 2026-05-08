import { z } from "zod";

export const baseEntitySchema = z.object({
  id: z.string().optional(),
  organizationId: z.string().optional(),
});
