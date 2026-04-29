import { Router } from "express";
import { Service } from "typedi";
import { AuthController } from "../controllers/auth.controller";

@Service()
export class AuthRoutes {
  public router: Router;

  constructor(private authController: AuthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.authController.register);
    this.router.post("/login", this.authController.login);
  }
}
