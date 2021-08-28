import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>
  delete(user: User): Promise<void>
  save(user: User): Promise<User>
}

export { IUsersRepository };
