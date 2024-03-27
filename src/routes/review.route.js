import { Router } from "express";
import * as controllers from "../controllers/review.js";
import * as validators from "../validators/review.js";
import { auth, isAllowedTo } from "../middleware/auth.js";
const router = Router({ mergeParams: true });

router
  .route("/")
  .post(
    auth,
    isAllowedTo("user"),
    validators.createReview,
    controllers.createReview
  )
  .get(controllers.getReviews);

router
  .route("/:reviewId")
  .get(validators.getReview, controllers.getReview)
  .put(
    auth,
    isAllowedTo("user"),
    validators.updateReview,
    controllers.updateReview
  )
  .delete(
    auth,
    isAllowedTo("user", "manager", "admin"),
    validators.deleteReview,
    controllers.deleteReview
  );

export default router;
