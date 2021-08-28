import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { Category } from '../infra/typeorm/entities/Category';
import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute({
    id,
    name,
    description
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('This category does not exist.');
    }

    name ? category.name = name : category.name = ''
    description ? category.description = description : category.description = ''

    const categoryUpdate = await this.categoriesRepository.save(category);

    return categoryUpdate;
  }
}

export default UpdateCategoryService;
