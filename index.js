import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import compression from "compression";

import express from "express";
import "dotenv/config";

import connectDB from "./dataBase/connection.js";
import { globalError } from "./src/middleware/errorHandilng.js";
import ApiError from "./src/utils/apiError.js";

import indexRoutes from "./src/routes/index.route.js";

const app = express();
const port = process.env.PORT || 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

connectDB();

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use(compression());

// All app routes
indexRoutes(app);

app.use("/uploads", express.static(path.join(__dirname, "./src/uploads")));
app.use("*", (res, req, next) => {
  return next(new ApiError("404 Page Not Found", 404));
});

// global error handling for express
app.use(globalError);

const server = app.listen(port, () =>
  console.log(`server running om port... ${port}!`)
);

//handel  Rejection error outside express
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection Errors", err);
  server.close(() => {
    console.error("shoutting down.....");
    process.exit(1);
  });
});
