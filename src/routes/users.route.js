import { Router } from "express";
import * as controllers from "../controllers/users.js";
import * as validators from "../validators/users.js";
import fileUploads, { filesValidation } from "../utils/multer.js";

const router = Router();

router
  .route("/")
  .post(
    fileUploads(filesValidation.image, "users").single("profileImg"),
    validators.createUser,
    controllers.createUser
  )
  .get(controllers.getUsers);

router
  .route("/:userId")
  .get(validators.getUser, controllers.getSpecificUser)
  .put(validators.updateUser, controllers.updateUser)
  .delete(validators.deleteUser, controllers.deleteUser);

router
  .route("/updatePassword/:userId")
  .patch(validators.updateUserPassword, controllers.updatePassword);

router
  .route("/updateImg/:userId")
  .patch(
    fileUploads(filesValidation.image, "users").single("profileImg"),
    validators.updateUserImage,
    controllers.updateUserImage
  );
export default router;
