"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeService = void 0;
const store_repository_1 = require("./store.repository");
exports.storeService = {
    createStore: (data, userId) => store_repository_1.storeRepository.create(data, userId),
    getStores: (user) => {
        if (user?.role === 'OFFICER') {
            return store_repository_1.storeRepository.findAll(user.userId);
        }
        if (user?.role === 'ADMIN') {
            return store_repository_1.storeRepository.findAll();
        }
        return Promise.resolve([]);
    },
    getStoreById: (id) => store_repository_1.storeRepository.findById(id),
    updateStore: (id, data) => store_repository_1.storeRepository.update(id, data),
    deleteStore: (id) => store_repository_1.storeRepository.delete(id),
};
