import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCategoryService from '@modules/cars/services/UpdateCategoryService';

class UpdateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      description
    } = request.body;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    const user = await updateCategoryService.execute({
      id,
      name,
      description
    });

    return response.status(200).json(user);
  }
}

export { UpdateCategoryController }