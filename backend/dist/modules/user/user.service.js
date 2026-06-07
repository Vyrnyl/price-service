"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("./user.repository");
exports.userService = {
    createUser: (data) => user_repository_1.userRepository.create(data),
    getUsers: () => user_repository_1.userRepository.findAll(),
    getUserById: (id) => user_repository_1.userRepository.findById(id),
    updateUser: (id, data) => user_repository_1.userRepository.update(id, data),
    deleteUser: (id) => user_repository_1.userRepository.delete(id),
};
