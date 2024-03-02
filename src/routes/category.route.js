import { Router } from "express";
import * as controllers from "../controllers/categorys.js";
import * as validators from "../validators/category.js";

const router = Router();

router
  .route("/")
  .post(controllers.createCategory)
  .get(controllers.getCategories);

router
  .route("/:id")
  .get(validators.getCategory, controllers.getCategory)
  .patch(validators.updateCategory, controllers.updateCategory)
  .delete(validators.deleteCategory, controllers.deleteCategory);
export default router;
