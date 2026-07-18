"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const auth_middleware_1 = require("./middleware/auth.middleware");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const public_routes_1 = __importDefault(require("./modules/public/public.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
const reportsDir = path_1.default.resolve(process.cwd(), "reports");
app.use((0, cors_1.default)({
    origin: corsOrigin,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/public", public_routes_1.default);
app.use("/api", auth_middleware_1.authenticate, routes_1.default);
app.use("/reports/files", express_1.default.static(reportsDir));
app.get("/", (_req, res) => {
    res.json({ message: "PresyoSerbisyo backend is running" });
});
app.get("/", (_req, res) => {
    console.log("process.env.CORS_ORIGIN =", process.env.CORS_ORIGIN);
    console.log("corsOrigin =", corsOrigin);
    res.json({ message: "TEST API" });
});
app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});
app.use(error_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
