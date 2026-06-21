import AppError from '../../utils/AppError';
import { CreateUserInput, UpdateUserInput, userRepository } from './user.repository';

export const userService = {
  createUser: async (data: CreateUserInput) => {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('Email already exists', 409);
    }

    return userRepository.create(data);
  },

  getUsers: () => userRepository.findAll(),
  getUserById: (id: string) => userRepository.findById(id),

  updateUser: async (id: string, data: UpdateUserInput) => {
    if (typeof data.email === 'string') {
      const existingUser = await userRepository.findByEmail(data.email);

      if (existingUser && existingUser.id !== id) {
        throw new AppError('Email already exists', 409);
      }
    }

    return userRepository.update(id, data);
  },

  deleteUser: (id: string) => userRepository.delete(id),
};
