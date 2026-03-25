import express from "express";
import apiRouter from "./routes/index.js";

const app = express();

// JSON PARSER
app.use(express.json());

// API ROUTES
app.use("/api", apiRouter)

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
