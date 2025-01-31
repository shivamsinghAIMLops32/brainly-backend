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
exports.deleteLink = exports.shareLink = exports.createLink = void 0;
const db_model_1 = require("../models/db.model");
const crypto_1 = __importDefault(require("crypto"));
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { contentId } = req.body;
    const userId = req.userId;
    // if (!contentId) {
    //   return res.status(400).json({ message: "Content ID is required!" });
    // }
    const hashLink = yield db_model_1.LinkModel.findOne({ userId });
    if (hashLink && hashLink.hash) {
        const shareLink = `${req.protocol}://${req.get('host')}/api/v1/brain/${hashLink.hash}`;
        return res.status(200).json({ shareLink });
    }
    try {
        // Check if the content exists and belongs to the user
        const content = yield db_model_1.ContentModel.findOne({ userId });
        if (!content) {
            return res.status(404).json({ message: "Content not found or unauthorized!" });
        }
        // Generate a unique hash for the shareable link
        const hash = crypto_1.default.randomBytes(16).toString('hex');
        // Save the shareable link in the database
        yield db_model_1.LinkModel.create({ hash, userId });
        // Return the shareable link
        const shareLink = `${req.protocol}://${req.get('host')}/api/v1/brain/${hash}`;
        return res.status(200).json({ message: "Shareable link created!", shareLink });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.createLink = createLink;
// share link
const shareLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shareLink } = req.params;
    try {
        // Find the link in the database
        const link = yield db_model_1.LinkModel.findOne({ hash: shareLink });
        if (!link) {
            return res.status(404).json({ message: "Invalid or expired share link!" });
        }
        // Find the content associated with the link
        const content = yield db_model_1.ContentModel.findOne({ userId: link.userId })
            .populate("userId", "username");
        if (!content) {
            return res.status(404).json({ message: "Content not found!" });
        }
        // Return the shared content
        return res.status(200).json({ content });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.shareLink = shareLink;
// delete link
const deleteLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: "User ID is required!" });
        }
        // Find link information
        const hashedLinkInfo = yield db_model_1.LinkModel.findOne({ userId });
        if (!hashedLinkInfo || !hashedLinkInfo.hash) {
            return res.status(404).json({ message: "No share link found!" });
        }
        // Clear the hash
        yield db_model_1.LinkModel.findOneAndUpdate({ userId }, { $set: { hash: "" } }, { new: true });
        return res.status(200).json({ message: "Share link deleted successfully!" });
    }
    catch (error) {
        console.error("Error deleting share link:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.deleteLink = deleteLink;
