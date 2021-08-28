import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCategoryService } from "@modules/cars/services/DeleteCategoryService";

class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategoryService = container.resolve(DeleteCategoryService);

    await deleteCategoryService.execute(id);

    return response.status(200).send();
  }
}

export { DeleteCategoryController };
