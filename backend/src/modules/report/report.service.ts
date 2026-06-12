import { reportRepository } from './report.repository';
import type { CreateReportInput, UpdateReportInput } from './report.schema';

export const reportService = {
  createReport: (data: CreateReportInput) => reportRepository.create(data),
  getReports: () => reportRepository.findAll(),
  getReportById: (id: string) => reportRepository.findById(id),
  updateReport: (id: string, data: UpdateReportInput) => reportRepository.update(id, data),
  deleteReport: (id: string) => reportRepository.delete(id),
};
