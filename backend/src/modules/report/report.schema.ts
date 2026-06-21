import { z } from 'zod';

const reportTypeEnum = z.enum(['MONTHLY', 'SRP_COMPLIANCE', 'TREND']);

export const createReportSchema = z.object({
  type: reportTypeEnum,
  generatedBy: z.string().uuid('Invalid user ID'),
  period: z.string().min(1, 'Period is required'),
  fileUrl: z.string().min(1, 'URL is required'),
});

export const updateReportSchema = createReportSchema.partial();

export const reportIdParamSchema = z.object({
  id: z.string().uuid('Invalid report ID'),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
export type UpdateReportInput = z.infer<typeof updateReportSchema>;
