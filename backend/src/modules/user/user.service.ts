import { CreateUserInput, UpdateUserInput, userRepository } from './user.repository';

export const userService = {
  createUser: (data: CreateUserInput) => userRepository.create(data),
  getUsers: () => userRepository.findAll(),
  getUserById: (id: string) => userRepository.findById(id),
  updateUser: (id: string, data: UpdateUserInput) => userRepository.update(id, data),
  deleteUser: (id: string) => userRepository.delete(id),
};
