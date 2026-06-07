"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', routes_1.default);
app.get('/', (_req, res) => {
    res.json({ message: 'PresyoSerbisyo backend is running' });
});
app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
