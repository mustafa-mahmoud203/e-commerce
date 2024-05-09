import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import productModel from "../../dataBase/models/product.model.js";
import cartModel from "../../dataBase/models/cart.model.js";
import couponModel from "../../dataBase/models/coupon.model.js";

const calculateTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  cart.totalPriceAfterDiscount = undefined;
  cart.totalCartPrice = totalPrice;
};

export const addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;

  let cart = await cartModel.findOne({ user: req.user._id });
  const product = await productModel.findById(productId);
  if (!product) return next(new ApiError("product not found", 404));

  if (cart) {
    // get product if product exist in cart to modify quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    // if product exist in cart
    if (productIndex >= 0) {
      cart.cartItems[productIndex].quantity += 1;
    }
    //if product not exist in cart
    else {
      cart.cartItems.push({
        product: productId,
        color,
        price: product.price,
      });
    }
  } else {
    cart = await cartModel.create({
      user: req.user._id,
      cartItems: [
        {
          product: productId,
          color,
          price: product.price,
        },
      ],
    });
  }
  calculateTotalPrice(cart);

  await cart.save();

  res
    .status(201)
    .json({ message: "add product to cart successfuly", data: cart });
});

export const getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("cart not found", 404));
  }
  res.status(200).json({
    message: "get cart successfuly",
    length: cart.cartItems.length,
    data: cart,
  });
});

export const updateCartProudctQuantity = asyncHandler(
  async (req, res, next) => {
    const { itemId } = req.params;
    const cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
      return next(new ApiError("cart not found", 404));
    }

    const productIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (productIndex === -1) {
      return next(
        new ApiError(`no product for this Id :${itemId} in cart`, 404)
      );
    }
    cart.cartItems[productIndex].quantity = req.body.quantity;

    calculateTotalPrice(cart);
    await cart.save();
    res.status(200).json({
      message: "update Cart Proudct Quantity successfuly",
      data: cart,
    });
  }
);
export const removeCartItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;

  const cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: itemId } } },
    { new: true }
  );

  calculateTotalPrice(cart);
  await cart.save();
  return res.status(200).json({
    message: "pull item from Cart successfuly",
    length: cart.cartItems.length,
    data: cart,
  });
});
export const clearCartItem = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndDelete({ user: req.user._id });

  return res.status(200).json({
    message: "Cart  has been cleared successfuly",
    oldData: cart,
  });
});

export const applyCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await couponModel.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new ApiError("coupon is in-valid or expired", 404));
  }
  const cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("there is no cart for login user", 404));
  }
  const totalPrice = cart.totalCartPrice;

  const totalPriceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2);

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;

  await cart.save();

  return res.status(200).json({
    message: "apply coupon successfuly",
    length: cart.cartItems.length,
    data: cart,
  });
});
