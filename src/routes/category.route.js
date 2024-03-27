import { Router } from "express";
import * as controllers from "../controllers/categorys.js";
import * as validators from "../validators/category.js";
import subCategoryRouter from "./subCategory.route.js";
import fileUploads, { filesValidation } from "../utils/multer.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use("/:categoryId/subCategories", subCategoryRouter);

router
  .route("/")
  .post(
    auth,
    isAllowedTo("admin", "manger"),
    fileUploads(filesValidation.image, "categories").single("image"),
    validators.createCategory,
    controllers.createCategory
  )
  .get(controllers.getCategories);

router
  .route("/:categoryId")
  .get(validators.getCategory, controllers.getCategory)
  .patch(
    auth,
    isAllowedTo("admin", "manger"),
    validators.updateCategory,
    controllers.updateCategory
  )
  .delete(
    auth,
    isAllowedTo("admin"),
    validators.deleteCategory,
    controllers.deleteCategory
  );

router
  .route("/updateImg/:categoryId")
  .patch(
    auth,
    isAllowedTo("admin","manger"),
    fileUploads(filesValidation.image, "categories").single("image"),
    validators.updateCategoryImage,
    controllers.updateCategoryImage
  );
export default router;
