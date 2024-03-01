import slugify from "slugify";
import asyncHandler from "express-async-handler";
import categoryModel from "../../dataBase/models/category.model.js";
import ApiError from "../utils/apiError.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const category = await categoryModel.create({ name, sulg: slugify(name) });

  return res.status(201).json({ message: "Done", data: category });
});

export const getCategorys = asyncHandler(async (req, res, next) => {
  // *1  convert to int
  const page = req.query.page * 1 || 2;
  const limit = 5;
  const skip = (page - 1) * limit;
  const categorys = await categoryModel.find({}).skip(skip).limit(limit);
  return res.status(200).json({
    message: "Done",
    results: categorys.length,
    page,
    data: categorys,
  });
});

export const specifiCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) return next(new ApiError("Category not found", 404));

  return res.status(200).json({ message: "Done", data: category });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await categoryModel.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  // when use findByIdAndUpdate
  if (!category) return next(new ApiError("Category not found", 404));

  // when use updateone
  //   if (!category.modifiedCount)return next(new Error("Category not found", { statusCode: 404 }));

  return res.status(200).json({ message: "Done", data: category });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) return next(new ApiError("Category not found", 404));

  return res.status(200).json({ message: "Done" });
});
