import { Request, Response } from "express";
import { Service } from "typedi";
import { AuthService } from "./auth.service";

@Service()
export class AuthController {
  constructor(private authService: AuthService) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // TEMP (DB later)
    const user = { id: 1, email };
    const tempPassword = "password"; // TEMP

    if (password !== tempPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = this.authService.generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token
    });
  };
}