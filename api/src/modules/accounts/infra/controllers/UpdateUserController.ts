import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserService from '@modules/accounts/services/UpdateUserService';

class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      email,
      password,
      isAdmin,
      driver_license,
    } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id,
      name,
      email,
      password,
      isAdmin,
      driver_license,
    });

    return response.status(200).json(user);
  }
}

export { UpdateUserController }