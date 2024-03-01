import expressAsyncHandler from "express-async-handler";
import categoryModel from "../../dataBase/models/category.model.js";
import ApiError from "../utils/apiError.js";
import subCategoryModel from "../../dataBase/models/subCategory.model.js";
import slugify from "slugify";

export const createSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  const category = await categoryModel.findById(categoryId);
  if (!category) return next(new ApiError("Category not found", 404));

  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category: categoryId,
  });
  return res.status(201).json({ message: "Done", subCategory });
});

export const getSubCategories = expressAsyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const subCategories = await subCategoryModel.find({}).skip(skip).limit(limit);
  if (!subCategories) return next(new ApiError("SubCategory not found", 404));
  return res.status(200).json({ message: "Done", data: subCategories });
});

export const getSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const subCategory = await subCategoryModel.findById(subCategoryId);
  if (!subCategory) return next(new ApiError("SubCategory not found", 404));
  return res.status(200).json({ message: "Done", data: subCategory });
});
