"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_user_1 = __importDefault(require("../middleware/auth.user"));
const link_controller_1 = require("../controllers/link.controller");
const router = (0, express_1.Router)();
// Content routes
router.post("/share", auth_user_1.default, link_controller_1.createLink);
router.get("/:shareLink", link_controller_1.shareLink);
router.delete("/deleteLink", auth_user_1.default, link_controller_1.deleteLink);
exports.default = router;
