import { Router } from "express";
import {
  createTariff,
  deleteTariff,
  getAllTariffs,
  updateTariff,
} from "../controllers/tariffs.controller.js";

const tariffRouter = Router();

tariffRouter
  .get("/tariffs", getAllTariffs)
  .post("/tariffs", createTariff)
  .put("/tariffs/:id", updateTariff)
  .delete("/tariffs/:id", deleteTariff);

export default tariffRouter;
