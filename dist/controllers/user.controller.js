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
exports.signInUser = exports.signUpUser = void 0;
const db_model_1 = require("../models/db.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.signUpUser = signUpUser;
// signin user
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        return res.json({ message: "Logged in successfully!", token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Incorrect credential!" });
    }
});
exports.signInUser = signInUser;
