import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new AppError("Category not exist!");
    }

    await this.categoriesRepository.delete(category);
  }
}

export { DeleteCategoryService };
