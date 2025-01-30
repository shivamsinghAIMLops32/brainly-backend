"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Middleware for validation
const validate = (schema) => (req, res, next) => {
    try {
        // Parse and validate request body using the provided schema
        schema.parse(req.body);
        next(); // If valid, proceed to the next middleware or route handler
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            // Return validation errors if the schema validation fails
            res.status(400).json({ errors: error.errors });
        }
        else {
            // If there's an unexpected error, pass control to the default error handler
            next(error);
        }
    }
};
exports.default = validate;
