import { Service } from "typedi";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../../user/entities/user.entitites";

@Service()
export class AuthService {

 
  public async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  
  public async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  
  public generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn:
        (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h",
    });
  }

  
  public verifyToken(token: string): {
    id: number;
    email: string;
    role: string;
  } {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }

    return decoded as {
      id: number;
      email: string;
      role: string;
    };
  }
}