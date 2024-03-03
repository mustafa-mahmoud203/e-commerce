import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";
import categoryModel from "../../dataBase/models/category.model.js";
import subCategoryModel from "../../dataBase/models/subCategory.model.js";

export const getProduct = [
  check("productId").isMongoId().withMessage("invalid Product Id"),
  validationMiddleware,
];

export const deleteProduct = [
  check("productId").isMongoId().withMessage("invalid Product Id"),
  validationMiddleware,
];

export const updateProduct = [
  check("productId").isMongoId().withMessage("invalid Product Id"),

  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (categoryID) => {
      const category = await categoryModel.findById(categoryID);
      if (!category) throw new Error("Category not found");
    }),

  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (subCategoriesIDs) => {
      const result = await subCategoryModel.find({
        _id: { $in: subCategoriesIDs },
      });
      if (result.length != subCategoriesIDs.length || result.length < 1)
        throw new Error("invalid subcategories IDs");
    }),
  validationMiddleware,
];

export const createProduct = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 2 })
    .withMessage("title must be more than 1 letters")
    .isLength({ max: 100 })
    .withMessage("title must at most 100 chars"),

  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 20000 })
    .withMessage("Too long description"),

  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .toFloat()
    .isLength({ max: 20 })
    .withMessage("To long price"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),

  check("imageCover").notEmpty().withMessage("Product imageCover is required"),

  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),

  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (categoryID) => {
      const category = await categoryModel.findById(categoryID);
      if (!category) throw new Error("Category not found");
    }),

  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (subCategoriesIDs) => {
      const result = await subCategoryModel.find({
        _id: { $in: subCategoriesIDs },
      });
      if (result.length != subCategoriesIDs.length || result.length < 1)
        throw new Error("invalid subcategories IDs");
    })
    .custom(async (value, { req }) => {
      const subCateIDs = [];
      const subCategoriesForSpecificCategory = await subCategoryModel.find({
        category: req.body.category,
      });
      subCategoriesForSpecificCategory.forEach((subCategory) => {
        subCateIDs.push(subCategory._id.toString());
      });
      const checkIDs = (target, arr) => target.every((id) => arr.includes(id));
      if (!checkIDs(value, subCateIDs))
        throw new Error(
          `subcategories not belong to this category ${req.body.category}`
        );
    }),

  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),

  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validationMiddleware,
];
