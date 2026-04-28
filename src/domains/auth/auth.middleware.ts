import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { AuthService } from "./auth.service";
import { AuthException } from "./auth.exception";

@Service()
export class AuthMiddleware {
  constructor(private authService: AuthService) {}

  public use = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new AuthException("Token missing");
      }

      const decoded = this.authService.verifyToken(token);
      (req as any).user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
}