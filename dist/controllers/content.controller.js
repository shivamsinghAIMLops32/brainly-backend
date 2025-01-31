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
exports.deleteContent = exports.getContent = exports.createContent = void 0;
const db_model_1 = require("../models/db.model");
const mongoose_1 = __importDefault(require("mongoose"));
// create content
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId; // Get the user ID from the decoded token
    const { title, type, content, tags, link } = req.body;
    console.log('Creating content');
    try {
        // Create content and associate with the userId
        yield db_model_1.ContentModel.create({
            title,
            type,
            content,
            tags,
            link,
            userId: userId, // Associate user ID from JWT token
        });
        return res.status(200).json({
            message: "Content created successfully!",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: "Error creating content!",
                error: error.message,
            });
        }
        else {
            console.error("An unknown error occurred.");
        }
    }
});
exports.createContent = createContent;
// get content by user
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    console.log(`Fetching content for user with ID: ${userId}`);
    try {
        const userContent = yield db_model_1.ContentModel.find({ userId: new mongoose_1.default.Types.ObjectId(userId) }).populate("userId", "username");
        return res.status(200).json({ userContent });
    }
    catch (error) {
        // @ts-ignore
        return res.status(500).json({ message: `${error.message}` || "error " });
    }
});
exports.getContent = getContent;
// delete content of user
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const contentId = req.body.contentId;
    if (!contentId) {
        return res.status(400).json({ message: "Content ID is required" });
    }
    try {
        const val = yield db_model_1.ContentModel.deleteMany({ _id: contentId, userId: userId });
        console.log(JSON.stringify(val));
        return res.status(200).json({ message: "Content deleted successfully!" });
    }
    catch (error) {
        return res.status(400).json({ message: `Error in deleting content ${contentId}` });
    }
});
exports.deleteContent = deleteContent;
