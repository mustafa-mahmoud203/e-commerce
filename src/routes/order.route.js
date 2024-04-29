import { Router } from "express";
import * as controllers from "../controllers/order.js";
// import * as validators from "../validators/coupons.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use(auth);

router
  .route("/")
  .post(isAllowedTo("user", "maneger", "admin"), controllers.createCashOrder)
  .get(isAllowedTo("user", "maneger", "admin"), controllers.getOrders);

router.route("/:orderId").get(isAllowedTo("user"), controllers.getSpecificOrder);
export default router;
