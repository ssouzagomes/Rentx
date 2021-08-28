import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/infra/controllers/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/infra/controllers/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
