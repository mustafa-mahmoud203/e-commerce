import slugify from "slugify";
import asyncHandler from "express-async-handler";
import categoryModel from "../../dataBase/models/category.model.js";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  const data = req.body;
  data.slug = slugify(data.name);

  if (req.file) data.image = req.file.image;

  const category = await categoryModel.create(data);

  return res
    .status(201)
    .json({ message: "Done", results: category.length, data: category });
});

export const getCategories = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(categoryModel, req).paginate({});
  const categories = await apiFeatures.modelQuery;
  // const categoriesQuery =  categoryModel.find({}).skip(skip).limit(limit);
  // const categories = await categoriesQuery

  return res.status(200).json({
    message: "Done",
    results: categories.length,
    // page,
    data: categories,
  });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryModel.findById(categoryId);
  if (!category) return next(new ApiError("Category not found", 404));

  return res
    .status(200)
    .json({ message: "Done", results: category.length, data: category });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryModel.findByIdAndDelete(categoryId);
  if (!category) return next(new ApiError("Category not found", 404));

  return res.status(200).json({ message: "Done" });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  // if (req.file) data.image = req.file.image;
  const category = await categoryModel.findByIdAndUpdate(
    categoryId,
    { name, slug: slugify(name) },
    {
      new: true,
    }
  );
  // when use findByIdAndUpdate
  if (!category) return next(new ApiError("Category not found", 404));

  // when use updateone
  //   if (!category.modifiedCount)return next(new Error("Category not found", { statusCode: 404 }));

  return res
    .status(200)
    .json({ message: "Done", results: category.length, data: category });
});

export const updateCategoryImage = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!req.file) return next(new ApiError("file is requird", 400));

  const category = await categoryModel.findByIdAndUpdate(
    categoryId,
    { image: req.file.image },
    {
      new: true,
    }
  );

  if (!category) return next(new ApiError("Category not found", 404));
  return res
    .status(200)
    .json({ message: "Done", results: category.length, data: category });
});
