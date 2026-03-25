import { Router } from "express";
import {
  createConcert,
  deleteConcert,
  getAllConcerts,
  updateConcert,
} from "../controllers/concerts.controller.js";

const concertRouter = Router();

concertRouter
  .get("/concerts", getAllConcerts)
  .post("/concerts", createConcert)
  .put("/concerts/:id", updateConcert)
  .delete("/concerts/:id", deleteConcert);

export default concertRouter;
