import express from "express";
import { StatusCodes } from "http-status-codes";
import { columnValidation } from "~/validations/columnValidation";
import { columnController } from "~/controllers/columnController";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "API get list columns" });
  })
  .post(columnValidation.createNew, columnController.createNew);
// Router.route("/:id").get(columnController.getDetails).put();
Router.route("/:id")
  .put(columnValidation.update, columnController.update)
  .delete(columnValidation.deleteItem, columnController.deleteItem);

export const columnRoutes = Router;
