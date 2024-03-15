import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";

export const getBrand = [
  check("brandId").isMongoId().withMessage("invalid Brand Id"),
  validationMiddleware,
];

export const deleteBrand = [
  check("brandId").isMongoId().withMessage("invalid Brand Id"),
  validationMiddleware,
];

export const updateBrand = [
  check("brandId").isMongoId().withMessage("invalid Brand Id"),
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be more than 2 letters")
    .isLength({ max: 32 })
    .withMessage("name must be less than 33 letters"),

  validationMiddleware,
];
export const updateBrandImage = [
  check("brandId").isMongoId().withMessage("invalid Brand Id"),

  validationMiddleware,
];

export const createBrand = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be more than 2 letters")
    .isLength({ max: 32 })
    .withMessage("name must be less than 33 letters"),

  validationMiddleware,
];
