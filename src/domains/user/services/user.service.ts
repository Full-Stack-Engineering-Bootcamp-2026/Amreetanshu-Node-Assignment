import { Service } from "typedi";
import { AppDataSource } from "../../../db/data-source";
import { User, UserRole } from "../entities/user.entitites";

@Service()
export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  public async createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }) {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  public async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  public async findById(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }
}
