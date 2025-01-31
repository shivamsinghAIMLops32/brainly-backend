"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_config_1 = __importDefault(require("./config/mongodb.config"));
const cors_1 = __importDefault(require("cors"));
const GlobalLimiter_1 = require("./middleware/GlobalLimiter");
const global_error_1 = require("./errors/global.error");
// routes import 
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
const link_routes_1 = __importDefault(require("./routes/link.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(GlobalLimiter_1.globalLimiter);
app.use("/api/v1", user_routes_1.default);
app.use("/api/v1/content", content_routes_1.default);
app.use("/api/v1/brain", link_routes_1.default);
// Global error handler
app.use(global_error_1.globalError);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    (0, mongodb_config_1.default)();
    console.log(`Server is running on port ${PORT}`);
});
