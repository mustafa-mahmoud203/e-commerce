import { Router } from "express";
import * as controllers from "../controllers/addresses.js";
import * as validators from "../validators/addresses.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use(auth, isAllowedTo("user"));

router
  .route("/")
  .post(validators.createAddress, controllers.addUserAddress)
  .get(controllers.getLoggedUserAddresses);

router
  .route("/:addressId")
  .delete(validators.removeAddress, controllers.removeUserAddress)
  .put(validators.updateAddress, controllers.updateUserAddress);

export default router;
