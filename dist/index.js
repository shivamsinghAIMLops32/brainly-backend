"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_config_1 = __importDefault(require("./config/mongodb.config"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.post('/api/v1/signup', (req, res) => {
});
app.post('/api/v1/signin', (req, res) => { });
app.post('/api/v1/content', (req, res) => { });
app.get('/api/v1/content', (req, res) => { });
app.delete('/api/v1/content', (req, res) => { });
app.post('/api/v1/brain/share', (req, res) => { });
app.get('/api/v1/brain/:shareLink', (req, res) => { });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    (0, mongodb_config_1.default)();
    console.log(`Server is running on port ${PORT}`);
});
