import { prisma } from '../../prisma';
import type { Prisma } from '@prisma/client';

export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;

export const userRepository = {
  create: (data: CreateUserInput) =>
    prisma.user.create({ data }),

  findAll: () =>
    prisma.user.findMany(),

  findByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  findById: (id: string) =>
    prisma.user.findUnique({ where: { id } }),

  update: (id: string, data: UpdateUserInput) =>
    prisma.user.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.user.delete({ where: { id } }),
};
