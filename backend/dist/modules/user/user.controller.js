"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_service_1 = require("./user.service");
const user_schema_1 = require("./user.schema");
exports.userController = {
    createUser: async (req, res) => {
        const validatedBody = user_schema_1.createUserSchema.parse(req.body);
        const user = await user_service_1.userService.createUser(validatedBody);
        res.status(201).json(user);
    },
    getUsers: async (_req, res) => {
        const users = await user_service_1.userService.getUsers();
        res.json(users);
    },
    getUserById: async (req, res) => {
        user_schema_1.userIdParamSchema.parse(req.params);
        const user = await user_service_1.userService.getUserById(req.params.id);
        if (!user) {
            throw new AppError_1.default('User not found', 404);
        }
        res.json(user);
    },
    updateUser: async (req, res) => {
        user_schema_1.userIdParamSchema.parse(req.params);
        const validatedBody = user_schema_1.updateUserSchema.parse(req.body);
        const user = await user_service_1.userService.updateUser(req.params.id, validatedBody);
        if (!user) {
            throw new AppError_1.default('User not found', 404);
        }
        res.json(user);
    },
    deleteUser: async (req, res) => {
        user_schema_1.userIdParamSchema.parse(req.params);
        const deletedUser = await user_service_1.userService.deleteUser(req.params.id);
        if (!deletedUser) {
            throw new AppError_1.default('User not found', 404);
        }
        res.status(204).send();
    },
};
