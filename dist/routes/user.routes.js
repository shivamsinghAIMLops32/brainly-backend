"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = __importDefault(require("../middleware/validate"));
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// User routes
router.post("/signup", (0, validate_1.default)(validation_1.userZodSchema), user_controller_1.signUpUser);
router.post("/signin", (0, validate_1.default)(validation_1.signinZodSchema), user_controller_1.signInUser);
exports.default = router;
