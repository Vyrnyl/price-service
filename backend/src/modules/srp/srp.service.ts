import { srpRepository } from './srp.repository';
import type { CreateSrpInput, UpdateSrpInput } from './srp.schema';

export const srpService = {
  createSrp: (data: CreateSrpInput) => srpRepository.create(data),
  getSrps: () => srpRepository.findAll(),
  getSrpById: (id: string) => srpRepository.findById(id),
  updateSrp: (id: string, data: UpdateSrpInput) => srpRepository.update(id, data),
  deleteSrp: (id: string) => srpRepository.delete(id),
};
