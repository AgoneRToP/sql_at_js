import { Router } from "express";
import {
  doTransaction,
  getAllTransactions,
} from "../controllers/transactions.controller.js";

const transactionRoutes = Router();

transactionRoutes
  .get("/transactions", getAllTransactions)
  .post("/transactions/:id", doTransaction);

export default transactionRoutes;
