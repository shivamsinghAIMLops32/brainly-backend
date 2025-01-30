"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_config_1 = __importDefault(require("./config/mongodb.config"));
const validation_1 = require("./middleware/validation");
const validate_1 = __importDefault(require("./middleware/validate"));
const db_model_1 = require("./models/db.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_user_1 = __importDefault(require("./middleware/auth.user"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
// Signup Route
app.post("/api/v1/signup", (0, validate_1.default)(validation_1.userZodSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Check if user already exists in DB
    const existingUser = yield db_model_1.UserModel.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists!" });
    }
    try {
        // Hash the password before saving
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Save the new user to the database
        yield db_model_1.UserModel.create({ username, password: hashedPassword });
        return res.status(201).json({ message: "User created successfully!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}));
// Login Route
app.post("/api/v1/signin", (0, validate_1.default)(validation_1.userZodSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Find the user by username
    const user = yield db_model_1.UserModel.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Username does not exist!" });
    }
    try {
        // Compare the provided password with the hashed password in DB
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password!" });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // setting cookie as name as token 
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3600000), // 1 hour
            httpOnly: true,
            secure: false,
        });
        return res.json({ message: "Logged in successfully!", token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Incorrect credential!" });
    }
}));
// Content Routes
app.post("/api/v1/content", auth_user_1.default, (req, res) => {
    // how to get get id of user so use auth middleware and get get that stored in token as jwt.sign(token,jwtsecret)
});
app.get("/api/v1/content", (req, res) => {
    // Your content fetching logic here
});
app.delete("/api/v1/content", (req, res) => {
    // Your content deletion logic here
});
// Share Brain Route
app.post("/api/v1/brain/share", (req, res) => {
    // Your brain share logic here
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
    // Your logic for fetching shared brain link here
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    (0, mongodb_config_1.default)();
    console.log(`Server is running on port ${PORT}`);
});
