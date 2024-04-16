import { Router } from "express";
import * as controllers from "../controllers/cart.js";
// import * as validators from "../validators/coupons.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use(auth, isAllowedTo("user"));

router
  .route("/")
  .post(controllers.addProductToCart)
  .get(controllers.getLoggedUserCart)
  .delete(controllers.clearCartItem);
router
  .route("/:itemId")
  .patch(controllers.updateCartProudctQuantity)
  .delete(controllers.removeCartItem);

router.put("/apply-coupon", controllers.applyCoupon);
export default router;
