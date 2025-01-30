import { z, ZodError } from 'zod';
import { userZodSchema, contentZodSchema } from './validation';
import { Request,Response,NextFunction } from 'express';

// Define a type for Zod objects (userSchema or contentSchema)
type Schema = z.ZodObject<any>; // ZodObject<any> is a more general type for Zod schema objects

// Middleware for validation
const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction):void|Promise<any> => {
  try {
    // Parse and validate request body using the provided schema
    schema.parse(req.body);
    next(); // If valid, proceed to the next middleware or route handler
  } catch (error) {
    if (error instanceof ZodError) {
      // Return validation errors if the schema validation fails
      res.status(400).json({ errors: error.errors });
    } else {
      // If there's an unexpected error, pass control to the default error handler
      next(error);
    }
  }
};

export default validate;

