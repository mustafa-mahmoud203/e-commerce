import { Router } from "express";
import * as controllers from "../controllers/auth.js";
import * as validators from "../validators/auth.js";
import fileUploads, { filesValidation } from "../utils/multer.js";

const router = Router();

router.post("/login", validators.login, controllers.login);
router.post(
  "/signup",
  fileUploads(filesValidation.image, "auth").single("profileImg"),
  validators.signup,
  controllers.signup
);

export default router;
