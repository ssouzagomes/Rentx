import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>
  findByName(name: string): Promise<Category>;
  delete(category: Category): Promise<void>;
  save(category: Category): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
