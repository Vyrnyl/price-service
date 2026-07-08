"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const passwordUtils_1 = require("../../utils/passwordUtils");
const user_repository_1 = require("./user.repository");
exports.userService = {
    createUser: async (data) => {
        const existingUser = await user_repository_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError_1.default('Email already exists', 409);
        }
        const hashedPassword = await passwordUtils_1.passwordUtils.hashPassword(data.password);
        const { confirmPassword, ...createData } = data;
        return user_repository_1.userRepository.create({
            ...createData,
            password: hashedPassword,
        });
    },
    getUsers: () => user_repository_1.userRepository.findAll(),
    getUserById: (id) => user_repository_1.userRepository.findById(id),
    updateUser: async (id, data) => {
        if (typeof data.email === 'string') {
            const existingUser = await user_repository_1.userRepository.findByEmail(data.email);
            if (existingUser && existingUser.id !== id) {
                throw new AppError_1.default('Email already exists', 409);
            }
        }
        let updateData = { ...data };
        if (typeof data.password === "string") {
            const hashedPassword = await passwordUtils_1.passwordUtils.hashPassword(data.password);
            updateData = {
                ...updateData,
                password: hashedPassword,
            };
        }
        const { confirmPassword, ...finalData } = updateData;
        return user_repository_1.userRepository.update(id, finalData);
    },
    deleteUser: (id) => user_repository_1.userRepository.delete(id),
};
