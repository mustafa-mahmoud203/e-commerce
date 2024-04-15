import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import productModel from "../../dataBase/models/product.model.js";
import cartModel from "../../dataBase/models/cart.model.js";

const calculateTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach(
    (product) => (totalPrice += product.price * product.quantity)
  );
  return totalPrice;
};

export const addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;

  let cart = await cartModel.findOne({ user: req.user._id });
  const product = await productModel.findById(productId);

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
  const totalPrice = calculateTotalPrice(cart);
  cart.totalCartPrice = totalPrice;
  await cart.save();

  res
    .status(201)
    .json({ message: "add product to cart successfuly", data: cart });
});

