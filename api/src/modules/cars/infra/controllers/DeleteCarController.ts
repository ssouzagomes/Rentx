import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCarService } from "@modules/cars/services/DeleteCarService";

class DeleteCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCarService = container.resolve(DeleteCarService);

    await deleteCarService.execute(id);

    return response.status(200).send();
  }
}

export { DeleteCarController };
