"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token; // 'token' was set as a cookie in the login route
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
