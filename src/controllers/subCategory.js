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
