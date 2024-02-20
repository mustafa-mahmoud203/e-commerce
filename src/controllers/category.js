import slugify from "slugify";
import categoryModel from "../../dataBase/models/category.model.js";
import asyncHandler from "express-async-handler";

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

export const SpecifiCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) return next(new Error("Category not found", { state: 404 }));

  return res.status(200).json({ message: "Done", data: category });
});
