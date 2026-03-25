import { Router } from "express";
import { getAllProducts } from "../controller/products.controller.js";

const productRouter = Router();

productRouter
  .get("/products", getAllProducts)

export default productRouter;
