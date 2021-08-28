import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCarService from '@modules/cars/services/UpdateCarService';

class UpdateCarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    } = request.body;

    const updateCategoryService = container.resolve(UpdateCarService);

    const user = await updateCategoryService.execute({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    return response.status(200).json(user);
  }
}

export { UpdateCarController }