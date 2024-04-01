import { Router } from "express";
import * as controllers from "../controllers/users.js";
import * as validators from "../validators/users.js";
import fileUploads, { filesValidation } from "../utils/multer.js";
import { auth, isAllowedTo } from "../middleware/auth.js";
const router = Router();

router.post(
  "/forgotPassword",
  validators.forgotPassword,
  controllers.forgotPassword
);
router.post("/verifyResteCode", controllers.verifyResteCode);
router.patch(
  "/resetPassword",
  validators.resetPassword,
  controllers.resetPassword
);

router.use(auth, isAllowedTo("user"));
router
  .route("/")
  .get(controllers.getSpecificUser)
  .put(validators.updateUser, controllers.updateUser);

router
  .route("/updatePassword")
  .patch(validators.updateUserPassword, controllers.updatePassword);

router.route("/updateImg").patch(
  fileUploads(filesValidation.image, "users").single("profileImg"),
  // validators.updateUserImage,
  controllers.updateUserImage
);

export default router;
