import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationService } from "@modules/cars/services/CreateCarSpecificationService";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationService = container.resolve(
      CreateCarSpecificationService
    );

    const cars = await createCarSpecificationService.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(cars);
  }
}

export { CreateCarSpecificationController };
