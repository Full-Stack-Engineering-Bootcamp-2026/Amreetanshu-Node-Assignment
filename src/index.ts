import "reflect-metadata";
import express, { Express, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Container } from "typedi";
import { AppDataSource } from "./db/data-source";

dotenv.config();

import { AuthRoutes } from "./domains/auth/routes/auth.routes";
import { AuthenticationMiddleware } from "./domains/auth/middleware/authenticate.mid";

class Application {
  public app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000", 10);

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log("✅ Database connected");
    } catch (error) {
      console.error("❌ Database connection failed", error);
    }
  }

  private initializeMiddleware(): void {
    const allowedOrigins = (
      process.env.ALLOWED_ORIGINS || "http://localhost:5173"
    ).split(",");

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`CORS: origin '${origin}' not allowed`));
          }
        },
        credentials: true,
      }),
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    const v1Router = Router();

    // 🔓 Public Auth Routes
    const authRoutes = Container.get(AuthRoutes);
    v1Router.use("/auth", authRoutes.router);

    // 🔒 Protected Routes (TEST)
    const authMiddleware = Container.get(AuthenticationMiddleware);

    v1Router.get("/posts", authMiddleware.use, (req, res) => {
      res.json({
        message: "Protected route accessed",
        user: (req as any).user, 
      });
    });

    this.app.use("/api/v1", v1Router);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
      console.log(`Auth API: http://localhost:${this.port}/api/v1/auth/login`);
    });

    this.setupGracefulShutdown();
  }

  private setupGracefulShutdown(): void {
    const shutdown = (signal: string): void => {
      console.log(`${signal} received. Shutting down...`);
      process.exit(0);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  }
}

const application = new Application();
application.start();

export default application.app;
