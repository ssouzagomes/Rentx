import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '../infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  driver_license: string
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    id,
    name,
    email,
    password,
    isAdmin,
    driver_license,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('This user does not exist.');
    }

    if (password) {
      const hashedPassword = await hash(password, 8);
      user.password = hashedPassword;
    }

    name ? user.name = name : user.name = ''
    email ? user.email = email : user.email = ''
    isAdmin ? user.isAdmin = isAdmin : user.isAdmin = false
    driver_license ? user.driver_license = driver_license : user.driver_license = ''

    const userUpdate = await this.usersRepository.save(user);

    delete userUpdate.password;

    return userUpdate;
  }
}

export default UpdateUserService;
