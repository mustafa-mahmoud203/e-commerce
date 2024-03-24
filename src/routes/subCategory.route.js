import { Router } from "express";
import * as controllers from "../controllers/subCategory.js";
import * as validators from "../validators/subCategory.js";
import { auth, isAllowedTo } from "../middleware/auth.js";
const router = Router({ mergeParams: true });

router.route("/").get(controllers.getSubCategories);

router
  .route("/:categoryId")
  .post(
    auth,
    isAllowedTo("admin", "manger"),
    validators.createSubCategory,
    controllers.createSubCategory
  );

router
  .route("/:subCategoryId")
  .get(validators.getSubCategory, controllers.getSubCategory)
  .put(
    auth,
    isAllowedTo("admin", "manger"),
    validators.updateSubCategory,
    controllers.updateSubCategory
  )
  .delete(
    auth,
    isAllowedTo("admin"),
    validators.deleteSubCategory,
    controllers.deleteSubCategory
  );

export default router;
