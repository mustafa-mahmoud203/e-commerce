import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";

export const getCategory = [
  check("categoryId").isMongoId().withMessage("invalid category Id"),
  validationMiddleware,
];

export const deleteCategory = [
  check("categoryId").isMongoId().withMessage("invalid category Id"),
  validationMiddleware,
];

export const updateCategory = [
  check("categoryId").isMongoId().withMessage("invalid category Id"),
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be more than 2 letters")
    .isLength({ max: 32 })
    .withMessage("name must be less than 33 letters"),

  validationMiddleware,
];
export const updateCategoryImage = [
  check("categoryId").isMongoId().withMessage("invalid category Id"),
  validationMiddleware,
];

export const createCategory = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be more than 2 letters")
    .isLength({ max: 32 })
    .withMessage("name must be less than 33 letters"),

  validationMiddleware,
];
