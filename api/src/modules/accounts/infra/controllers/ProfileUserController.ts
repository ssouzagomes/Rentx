import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserService } from "@modules/accounts/services/ProfileUserService";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const profileUserService = container.resolve(ProfileUserService);

    const user = await profileUserService.execute(id);
    return response.json(user);
  }
}

export { ProfileUserController };
