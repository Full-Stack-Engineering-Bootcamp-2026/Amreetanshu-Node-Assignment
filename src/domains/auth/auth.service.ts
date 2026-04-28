import { Service } from "typedi";
import jwt, { SignOptions } from "jsonwebtoken";


@Service()
export class AuthService {
  public generateToken(payload: object): string {
    // const signInOptions:SignOptions={

    // }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn:
        (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h",
    });
    console.log(token);
    return token;
  }

  public verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }
}
