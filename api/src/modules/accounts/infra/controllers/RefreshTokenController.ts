import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenService } from "@modules/accounts/services/RefreshTokenService";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refresh_token = await refreshTokenService.execute(token);

    return response.json(refresh_token);
  }
}

export { RefreshTokenController };
