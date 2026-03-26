import { Router } from "express";
import categoryRouter from "./category.routes.js";
import productRouter from "./product.routes.js";

const apiRouter = Router();

apiRouter.use(categoryRouter, productRouter);

export default apiRouter;
