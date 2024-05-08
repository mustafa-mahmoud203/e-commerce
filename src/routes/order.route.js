import { Router } from "express";
import * as controllers from "../controllers/order.js";
// import * as validators from "../validators/coupons.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use(auth);

//TODO add validation
router.post(
  "/create-checkout-session",
  isAllowedTo("user"),
  controllers.createStripeSession
);

router
  .route("/")
  .post(isAllowedTo("user", "maneger", "admin"), controllers.createCashOrder)
  .get(isAllowedTo("user", "maneger", "admin"), controllers.getOrders);

router
  .route("/:orderId")
  .get(isAllowedTo("user"), controllers.getSpecificOrder);

router.patch("/:orderId/paid", controllers.updateOrderPaidStates);
router.patch("/:orderId/delivered", controllers.updateOrderDeliverdStates);
export default router;
