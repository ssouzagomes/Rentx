import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserService } from "@modules/rentals/services/ListRentalsByUserService";

class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalsByUserService = container.resolve(
      ListRentalsByUserService
    );

    const rentals = await listRentalsByUserService.execute(id);

    return response.json(rentals);
  }
}

export { ListRentalByUserController };
