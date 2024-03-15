import { Router } from "express";
import * as controllers from "../controllers/brands.js";
import * as validators from "../validators/brands.js";

const router = Router();

router.route("/").post(controllers.createBrand).get(controllers.getBrands);

router
  .route("/:brandId")
  .get(validators.getBrand, controllers.getSpecificBrand)
  .patch(validators.updateBrand, controllers.updateBrand)
  .delete(validators.deleteBrand, controllers.deleteBrand);

router
  .route("/updateImg/:brandId")
  .patch(
    fileUploads(filesValidation.image, "categories").single("image"),
    validators.updateBrandImage,
    controllers.updateBrandImage
  );
export default router;
