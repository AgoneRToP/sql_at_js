import { Router } from "express";
import userRouter from "./user.routes.js";
import concertRouter from "./concert.routes.js";
import tariffRouter from "./tariff.routes.js";
import ticketRouter from "./ticket.routes.js";

const apiRouter = Router();

apiRouter.use(userRouter, concertRouter, tariffRouter, ticketRouter);

export default apiRouter;
