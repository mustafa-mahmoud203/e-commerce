import asyncHandler from "express-async-handler";
import productModel from "../../dataBase/models/product.model.js";
import userModel from "../../dataBase/models/user.model.js";

export const addProductToFavoritelist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  const product = await productModel.findById(productId);
  if (!product) return next(new ApiError("product not found", 404));

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { favorites: productId },
    },
    { new: true }
  );

  if (!user) return next(new ApiError("user not found", 404));
  return res.status(200).json({
    status: "success",
    message: "Product added successfully to your favorites list.",
    data: productId,
  });
});

export const removeProductToFavoritelist = asyncHandler(
  async (req, res, next) => {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) return next(new ApiError("product not found", 404));

    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { favorites: productId },
      },
      { new: true }
    );

    if (!user) return next(new ApiError("user not found", 404));
    return res.status(200).json({
      status: "success",
      message: "Product removed successfully to your favorites list.",
      data: productId,
    });
  }
);
