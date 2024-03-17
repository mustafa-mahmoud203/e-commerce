import slugify from "slugify";
import asyncHandler from "express-async-handler";
import productModel from "../../dataBase/models/product.model.js";
import ApiError from "../utils/apiError.js";
import categoryModel from "../../dataBase/models/category.model.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const data = req.body;
  data.slug = slugify(data.title);
  if (req.files) {
    if (req.files.image) data.image = req.files.image[0].image;
    if (req.files.images) {
      const imagesList = [];
      req.files.images.forEach((ele) => {
        imagesList.push(ele.image);
      });
      data.images = imagesList;
    }
  }

  const product = await productModel.create(data);

  return res
    .status(201)
    .json({ message: "Done", results: product.length, data: product });
});

export const getProducts = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(productModel, req)
    .paginate()
    .filter()
    .fields()
    .sort()
    .search()
    .populate();

  // let ProductsQuery = productModel.find(filteringQuery).populate({ path: "category", select: "name" });
  const Products = await apiFeatures.modelQuery;
  return res.status(200).json({
    message: "Done",
    results: Products.length,
    // page: apiFeatures.req.query.page,
    data: Products,
  });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel
    .findById(productId)
    .populate({ path: "category", select: "name " });
  if (!product) return next(new ApiError("product not found", 404));

  return res
    .status(200)
    .json({ message: "Done", results: product.length, data: product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const data = req.body;
  data.slug = slugify(data.title);
  const product = await productModel.findByIdAndUpdate(productId, data, {
    new: true,
  });
  // when use findByIdAndUpdate
  if (!product) return next(new ApiError("product not found", 404));

  return res
    .status(200)
    .json({ message: "Done", results: product.length, data: product });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel.findByIdAndDelete(productId);
  if (!product) return next(new ApiError("product not found", 404));

  return res.status(200).json({ message: "Done" });
});
