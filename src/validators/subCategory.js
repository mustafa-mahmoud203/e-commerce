import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";

export const getSubCategory = [
  check("subCategoryId").isMongoId().withMessage("invalid category Id"),
  validationMiddleware,
];

// export const deleteCategory = [
//   check("id").isMongoId().withMessage("invalid category Id"),
//   validationMiddleware,
// ];

// export const updateCategory = [
//   check("id").isMongoId().withMessage("invalid category Id"),
//   check("name")
//     .notEmpty()
//     .withMessage("name is required")
//     .isLength({ min: 3 })
//     .withMessage("name must be more than 2 letters")
//     .isLength({ max: 32 })
//     .withMessage("name must be less than 33 letters"),

//   validationMiddleware,
// ];

export const createSubCategory = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 2 })
    .withMessage("name must be more than 1 letters")
    .isLength({ max: 32 })
    .withMessage("name must be less than 33 letters"),

  check("categoryId")
    .notEmpty()
    .withMessage("subCategory must be belong Category")
    .isMongoId()
    .withMessage("invalid category Id"),
  validationMiddleware,
];
