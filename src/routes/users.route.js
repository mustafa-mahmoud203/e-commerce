import { Router } from "express";
import * as controllers from "../controllers/users.js";
// import * as validators from "../validators/users.js";
import fileUploads, { filesValidation } from "../utils/multer.js";

const router = Router();

router
  .route("/")
  .post(
    fileUploads(filesValidation.image, "users").single("profileImg"),
    controllers.createUser
  );

export default router;
