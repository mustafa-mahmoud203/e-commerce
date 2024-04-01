import { Router } from "express";
import * as controllers from "../controllers/favorites.js";
// import * as validators from "../validators/brands.js";
import { auth, isAllowedTo } from "../middleware/auth.js";

const router = Router();

router.use(auth, isAllowedTo("user"));

router.route("/").post(controllers.addProductToFavoritelist);
// .get(controllers.getLoggedUserFavoritelist);

// router.delete("/:productId", controllers.removeProductToFavoritelist);

export default router;
