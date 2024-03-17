import { Router } from "express";
import * as controllers from "../controllers/product.js";
import * as validators from "../validators/product.js";
import fileUploads, { filesValidation } from "../utils/multer.js";

const router = Router();

router
  .route("/")
  .post(
    fileUploads(filesValidation.image, "products").fields([
      { name: "image", maxCount: 1 },
      { name: "images", maxCount: 8 },
    ]),
    validators.createProduct,
    controllers.createProduct
  )
  .get(controllers.getProducts);

router
  .route("/:productId")
  .get(validators.getProduct, controllers.getProduct)
  .put(validators.updateProduct, controllers.updateProduct)
  .delete(validators.deleteProduct, controllers.deleteProduct);

export default router;
