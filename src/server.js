import express from "express";
import notes from "./api/notes/routes.js";
import loggingMiddleware from "./logger/middleware.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(loggingMiddleware);
app.use("/", notes);

app.listen(port, "0.0.0.0", () => {
  console.log(`server start at http://0.0.0.0:${port}`);
});
