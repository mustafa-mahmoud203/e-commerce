import express from "express";
import "dotenv/config";
import connectDB from "./dataBase/connection.js";
import { globalError } from "./src/middleware/errorHandilng.js";
import categoryRouter from "./src/routes/category.route.js";
import brandsRouter from "./src/routes/brands.route.js";
import productsRouter from "./src/routes/product.route.js";
import subCategoryRouter from "./src/routes/subCategory.route.js";
import ApiError from "./src/utils/apiError.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

connectDB();
app.use(express.json());

app.use("/categories", categoryRouter);
app.use("/subCategories", subCategoryRouter);
app.use("/brands", brandsRouter);
app.use("/products", productsRouter);
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
