import { Request, Response } from "express";
import { Service } from "typedi";
import { AuthService } from "../services/auth.service";
import { UserService } from "../../user/services/user.service";

@Service()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  public register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const existingUser = await this.userService.findByEmail(email);

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await this.authService.hashPassword(password);

      const user = await this.userService.createUser({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User registered successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Registration failed",
        error: error.message,
      });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const user = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const isMatch = await this.authService.comparePassword(
        password,
        user.password,
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = this.authService.generateToken(user);

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Login failed",
        error: error.message,
      });
    }
  };
}
