import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";

export const getReview = [
  check("reviewId").isMongoId().withMessage("invalid Review Id"),
  validationMiddleware,
];

export const deleteReview = [
  check("reviewId").isMongoId().withMessage("invalid Review Id"),
  validationMiddleware,
];

export const updateReview = [
  check("reviewId").isMongoId().withMessage("invalid Review Id"),
  check("title").optional(),
  check("ratings")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating value must be between 1 and 5"),
  validationMiddleware,
];
export const createReview = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating value must be between 1 and 5"),
  check("product").isMongoId().withMessage("invalid product Id"),

  validationMiddleware,
];
