import multer from "multer";
import { Router } from "express";

import { CreateCategoryController } from "@modules/cars/infra/controllers/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/infra/controllers/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/infra/controllers/ListCategoriesController";
import { UpdateCategoryController } from "@modules/cars/infra/controllers/UpdateCategoryController";
import { DeleteCategoryController } from "@modules/cars/infra/controllers/DeleteCategoryController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.put(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  updateCategoryController.handle
);

categoriesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  deleteCategoryController.handle
);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
