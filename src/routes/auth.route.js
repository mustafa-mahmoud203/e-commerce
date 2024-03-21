import { Router } from "express";
import * as controllers from "../controllers/auth.js";
import * as validators from "../validators/auth.js";
import fileUploads, { filesValidation } from "../utils/multer.js";

const router = Router();

router.route("/login").post(validators.login, controllers.login);
router
  .route("/signup")
  .post(
    fileUploads(filesValidation.image, "auth").single("profileImg"),
    validators.signup,
    controllers.signup
  );

export default router;
