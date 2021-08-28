import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserService } from "@modules/accounts/services/ResetPasswordUserService";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;
    const resetPasswordUserService = container.resolve(
      ResetPasswordUserService
    );

    await resetPasswordUserService.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordUserController };
