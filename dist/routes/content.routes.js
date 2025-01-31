"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_user_1 = __importDefault(require("../middleware/auth.user"));
const content_controller_1 = require("../controllers/content.controller");
const validate_1 = __importDefault(require("../middleware/validate"));
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Content routes
router.post("/", auth_user_1.default, (0, validate_1.default)(validation_1.contentZodSchema), content_controller_1.createContent);
router.get("/", auth_user_1.default, content_controller_1.getContent);
router.delete("/", auth_user_1.default, (0, validate_1.default)(validation_1.contentIdZodSchema), content_controller_1.deleteContent);
exports.default = router;
