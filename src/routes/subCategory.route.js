import { Router } from "express";
import * as controllers from "../controllers/subCategory.js";
import * as validators from "../validators/subCategory.js";

const router = Router();

router
  .route("/:categoryId")
  .post(validators.createSubCategory, controllers.createSubCategory);

export default router;
