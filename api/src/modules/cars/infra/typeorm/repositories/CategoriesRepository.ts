import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.repository.findOne(id);

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }

  async delete(category: Category): Promise<void> {
    await this.repository.remove(category);
  }

  async save(category: Category): Promise<Category> {
    return this.repository.save(category);
  }
}

export { CategoriesRepository };
