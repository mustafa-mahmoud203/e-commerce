import { Router } from "express";
import * as controllers from "../controllers/coupons.js";
// import * as validators from "../validators/coupons.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use(auth, isAllowedTo("admin", "manager"));

router.route("/").post(controllers.createCoupon);
// .get(controllers.getCoupons);

router
  .route("/:couponId")
  .get(controllers.getSpecificCoupon)
  .delete(controllers.deleteCoupon)
  .put(controllers.updateCoupon);

export default router;
