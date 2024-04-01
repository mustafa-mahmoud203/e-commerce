import { Router } from "express";
import * as controllers from "../controllers/addresses.js";
// import * as validators from "../validators/favorites.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use(auth, isAllowedTo("user"));

router.route("/").post(controllers.addUserAddress);
//   .get(controllers.getLoggedUserAddresses);

router.delete("/:addressId", controllers.removeUserAddress);

export default router;
