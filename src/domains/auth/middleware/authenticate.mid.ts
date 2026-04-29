import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { AuthService } from "../services/auth.service";
import { JwtPayload } from "../interfaces/jwt-payload.interfaces";

@Service()
export class AuthenticationMiddleware {
  constructor(private authService: AuthService) {}

  public use = (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          message: "Authentication token missing",
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded: JwtPayload = this.authService.verifyToken(token);

      
      (req as any).user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };
}
