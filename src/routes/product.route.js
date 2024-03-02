import { Router } from "express";
import * as controllers from "../controllers/product.js";
import * as validators from "../validators/product.js";

const router = Router();

router
  .route("/")
  .post(validators.createProduct, controllers.createProduct)
  .get(controllers.getProducts);

router
  .route("/:productId")
  .get(validators.getProduct, controllers.getProduct)
  .patch(validators.updateProduct, controllers.updateProduct)
  .delete(validators.deleteProduct, controllers.deleteProduct);

export default router;
