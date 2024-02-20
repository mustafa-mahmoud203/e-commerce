import express from "express";
import "dotenv/config";

import connectDB from "./dataBase/connection.js";
import path from "path";
import { errorHandilng } from "./src/utils/errorHandilng.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("*", (res, req, next) => {
  return next(new Error("404 Page Not Found", { state: 404 }));
});
app.use(errorHandilng);

connectDB();
app.listen(port, () => console.log(`server running om port... ${port}!`));
