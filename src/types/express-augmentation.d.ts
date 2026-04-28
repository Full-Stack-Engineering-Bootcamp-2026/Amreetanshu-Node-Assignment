/**
 * Extends Express's Request interface with authenticated user data
 * set by authenticate.middleware.ts.
 */
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      email: string;
      roles: string[];
    };
  }
}
