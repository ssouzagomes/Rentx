import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";

import { CreateCarController } from "@modules/cars/infra/controllers/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/infra/controllers/ListAvailableCarsController";
import { UpdateCarController } from "@modules/cars/infra/controllers/UpdateCarController";
import { CreateCarSpecificationController } from "@modules/cars/infra/controllers/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/infra/controllers/UploadCarImagesController";
import { DeleteCarController } from "@modules/cars/infra/controllers/DeleteCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaialableCarsController = new ListAvailableCarsController();
const updateCarController = new UpdateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const deleteCarController = new DeleteCarController();

const upload = multer(uploadConfig);

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.put(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  updateCarController.handle
);

carsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  deleteCarController.handle
);

carsRoutes.get("/available", listAvaialableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
