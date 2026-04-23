import { User } from "../model/user.model";

export class UserService {
  public async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }
}