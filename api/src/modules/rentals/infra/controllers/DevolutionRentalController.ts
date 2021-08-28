import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalService } from "@modules/rentals/services/DevolutionRentalService";

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const devolutionRentalService = container.resolve(DevolutionRentalService);

    const rental = await devolutionRentalService.execute({
      id,
      user_id,
    });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };
