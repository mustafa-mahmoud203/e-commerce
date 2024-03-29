import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";
import categoryModel from "../../dataBase/models/category.model.js";

export const getSubCategory = [
  check("subCategoryId").isMongoId().withMessage("invalid SubCategory Id"),
  validationMiddleware,
];

export const deleteSubCategory = [
  check("subCategoryId").isMongoId().withMessage("invalid SubCategory Id"),
  validationMiddleware,
];

export const updateSubCategory = [
  check("subCategoryId").isMongoId().withMessage("invalid subCategory Id"),
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 2 })
    .withMessage("name must be more than 1 letters")
    .isLength({ max: 32 })
    .withMessage("name must be less than 33 letters"),

  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong Category")
    .isMongoId()
    .withMessage("invalid category Id")
    .custom(async (categoryID) => {
      const category = await categoryModel.findById(categoryID);
      if (!category) {
        throw new Error("Category not found");
      }
    }),

  validationMiddleware,
];

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
    .withMessage("invalid category Id")
    .custom(async (categoryID) => {
      const category = await categoryModel.findById(categoryID);
      if (!category) {
        throw new Error("Category not found");
      }
    }),
  validationMiddleware,
];
