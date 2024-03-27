import { Router } from "express";
import * as controllers from "../controllers/users.js";
import * as validators from "../validators/users.js";
import fileUploads, { filesValidation } from "../utils/multer.js";
import { auth, isAllowedTo } from "../middleware/auth.js";
const router = Router();

router
  .route("/")
  .post(
    auth,
    isAllowedTo("admin"),
    fileUploads(filesValidation.image, "users").single("profileImg"),
    validators.createUser,
    controllers.createUser
  )
  .get(auth, isAllowedTo("admin", "manger"), controllers.getUsers);

router
  .route("/:userId")
  .get(
    auth,
    isAllowedTo("admin"),
    validators.getUser,
    controllers.getSpecificUser
  )
  .put(
    auth,
    isAllowedTo("admin"),
    validators.updateUser,
    controllers.updateUser
  )
  .delete(
    auth,
    isAllowedTo("admin"),
    validators.deleteUser,
    controllers.deleteUser
  );

router
  .route("/updatePassword/:userId")
  .patch(
    auth,
    isAllowedTo("admin"),
    validators.updateUserPassword,
    controllers.updatePassword
  );

router
  .route("/updateImg/:userId")
  .patch(
    auth,
    isAllowedTo("admin"),
    fileUploads(filesValidation.image, "users").single("profileImg"),
    validators.updateUserImage,
    controllers.updateUserImage
  );

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
export default router;
