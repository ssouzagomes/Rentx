import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/infra/controllers/CreateUserController";
import { UpdateUserController } from "@modules/accounts/infra/controllers/UpdateUserController";
import { ListUsersController } from "@modules/accounts/infra/controllers/ListUsersController";
import { DeleteUserController } from "@modules/accounts/infra/controllers/DeleteUserController";
import { UpdateUserAvatarController } from "@modules/accounts/infra/controllers/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/accounts/infra/controllers/ProfileUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUsersController = new CreateUserController();
const updateUserController = new UpdateUserController();
const listUsersController = new ListUsersController()
const deleteUserController = new DeleteUserController()
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUsersController.handle);

usersRoutes.put("/:id", updateUserController.handle);

usersRoutes.get("/", listUsersController.handle);

usersRoutes.delete("/:id", deleteUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get("/profile/:id", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
