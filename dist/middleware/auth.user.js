"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Log the full header
    // Get token from Authorization header
    // @ts-ignore
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from "Bearer <token>"
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        // Decode the JWT token
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log(`${decodedToken.id} : is decoded token userid`);
        // Attach the decoded user information (e.g., user ID) to the req object
        req.userId = decodedToken.id; // Store the user ID in the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
exports.default = authMiddleware;
