"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.srpService = void 0;
const srp_repository_1 = require("./srp.repository");
exports.srpService = {
    createSrp: (data) => srp_repository_1.srpRepository.create(data),
    getSrps: () => srp_repository_1.srpRepository.findAll(),
    getSrpById: (id) => srp_repository_1.srpRepository.findById(id),
    updateSrp: (id, data) => srp_repository_1.srpRepository.update(id, data),
    deleteSrp: (id) => srp_repository_1.srpRepository.delete(id),
};
