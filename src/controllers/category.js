import slugify from "slugify";
import categoryModel from "../../dataBase/models/category.model.js";
import asyncHandler from "express-async-handler";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const category = await categoryModel.create({ name, sulg: slugify(name) });

  return res.status(201).json({ message: "Done", data: category });
});

export const getCategorys = asyncHandler(async (req, res, next) => {
  const categorys = await categoryModel.find({});
  return res.status(200).json({ message: "Done", categorys });
});
