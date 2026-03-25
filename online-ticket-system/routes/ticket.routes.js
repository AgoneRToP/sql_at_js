import { Router } from "express";
import {
  createTicket,
  getAllTickets,
} from "../controllers/tickets.controller.js";

const ticketRouter = Router();

ticketRouter
  .get("/tickets", getAllTickets)
  .post("/tickets", createTicket);

export default ticketRouter;