import { Router } from "express";
import { getAllCategories } from "../controller/categories.controller.js";

const categoryRouter = Router();

categoryRouter
  .get("/categories", getAllCategories)

export default categoryRouter;
