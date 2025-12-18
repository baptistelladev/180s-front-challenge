import { z } from '@hono/zod-openapi';

export const issueInsuranceSchema = z.object({
    quotationId: z.string().min(1),
    insured: z.object({
      fullName: z.string().min(1),
      document: z.string().min(11),
      email: z.string().email(),
      phone: z.string().min(8),
    }),
});