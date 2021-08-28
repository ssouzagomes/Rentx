import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "@shared/container";
import "@shared/infra/typeorm";

import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";

const app = express();

app.use(express.json());

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
