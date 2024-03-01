import { Router } from "express";
import * as controllers from "../controllers/subCategory.js";
import * as validators from "../validators/subCategory.js";

const router = Router();

router.route("/").get(controllers.getSubCategories);

router
  .route("/:categoryId")
  .post(validators.createSubCategory, controllers.createSubCategory);

router
  .route("/:subCategoryId")
  .get(validators.getSubCategory, controllers.getSubCategory);

export default router;
