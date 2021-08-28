import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError("User not exist!");
    }

    await this.usersRepository.delete(user);
  }
}

export { DeleteUserService };
