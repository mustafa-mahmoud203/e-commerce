import { Router } from "express";
import * as controllers from "../controllers/brands.js";
import * as validators from "../validators/brands.js";
import fileUploads, { filesValidation } from "../utils/multer.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router
  .route("/")
  .post(
    fileUploads(filesValidation.image, "brands").single("image"),
    validators.createBrand,
    controllers.createBrand
  )
  .get(controllers.getBrands);

router
  .route("/:brandId")
  .get(validators.getBrand, controllers.getSpecificBrand)
  .patch(
    auth,
    isAllowedTo("admin", "manger"),
    validators.updateBrand,
    controllers.updateBrand
  )
  .delete(
    auth,
    isAllowedTo("admin"),
    validators.deleteBrand,
    controllers.deleteBrand
  );

router
  .route("/updateImg/:brandId")
  .patch(
    auth,
    isAllowedTo("admin", "manger"),
    fileUploads(filesValidation.image, "categories").single("image"),
    validators.updateBrandImage,
    controllers.updateBrandImage
  );
export default router;
