import { Router } from "express";
import * as controllers from "../controllers/product.js";
import * as validators from "../validators/product.js";
import fileUploads, { filesValidation } from "../utils/multer.js";
import { auth, isAllowedTo } from "../middleware/auth.js";
import reviewRouter from "./review.route.js";

const router = Router();

router.use("/:productId/reviews", reviewRouter);
router
  .route("/")
  .post(
    auth,
    // isAllowedTo("admin", "manger"),
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
  .put(
    auth,
    isAllowedTo("admin", "manger"),
    validators.updateProduct,
    controllers.updateProduct
  )
  .delete(
    auth,
    isAllowedTo("admin"),
    validators.deleteProduct,
    controllers.deleteProduct
  );

export default router;
