import { Router } from "express";
import * as controllers from "../controllers/cart.js";
// import * as validators from "../validators/coupons.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use(auth, isAllowedTo("user"));

router.route("/").post(controllers.addProductToCart);

export default router;
