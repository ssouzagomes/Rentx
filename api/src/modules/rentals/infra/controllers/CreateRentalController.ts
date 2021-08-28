import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalService } from "@modules/rentals/services/CreateRentalService";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body;
    const { id } = request.user;
    
    const createRentalService = container.resolve(CreateRentalService);

    const rental = await createRentalService.execute({
      car_id,
      expected_return_date,
      user_id: id,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
