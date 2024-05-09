import stripeLib from "stripe";
const apiKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeLib(apiKey);

import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import productModel from "../../dataBase/models/product.model.js";
import cartModel from "../../dataBase/models/cart.model.js";
import orderModel from "../../dataBase/models/order.model.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createCashOrder = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  // const { cartId } = req.params;
  // const cart = await cartModel.findById(cartId);
  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) return next(new ApiError("not cart found for logged user", 404));

  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create order with default paymentMethodType cash
  const order = await orderModel.create({
    user: req.user._id,
    orderItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    // if product image is not requred can use this code
    // cart.cartItems.map(async (item) => {
    //   const product = await productModel.findById(item.product);
    //   product.quantity -= item.quantity;
    //   product.sold += item.quantity;
    //   await product.save();
    // });
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await productModel.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartIdss
    // await cartModel.findByIdAndDelete(cartId);
    await cartModel.findOneAndDelete({ user: req.user._id });
  }

  return res
    .status(201)
    .json({ message: "create Order successfuly", data: order });
});

export const getOrders = asyncHandler(async (req, res, next) => {
  let filterObeject = {};
  if (req.user.role === "user") {
    filterObeject.user = req.user._id;
  }
  const apiFeatures = new ApiFeatures(orderModel, req);
  apiFeatures
    .paginate(filterObeject)
    .populate({ path: "user", select: "name email role" })
    .populate({ path: "orderItems.product", select: "title price" });
  const orders = await apiFeatures.modelQuery;

  return res.status(200).json({ message: "success", data: orders });
});

export const getSpecificOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel
    .findOne({
      _id: orderId,
      user: req.user._id,
    })
    .populate({ path: "user", select: "name email role" })
    .populate({ path: "orderItems.product", select: "title price" });

  return res.status(200).json({ message: "success", data: order });
});

export const updateOrderPaidStates = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);
  if (!order) return next(new ApiError("order not found", 404));
  order.isPaid = true;
  order.paidAt = Date.now();

  await order.save();

  return res
    .status(200)
    .json({ message: "order paid states is updated", data: order });
});

export const updateOrderDeliverdStates = asyncHandler(
  async (req, res, next) => {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);
    if (!order) return next(new ApiError("order not found", 404));
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    return res
      .status(200)
      .json({ message: "order Deliverd states is updated", data: order });
  }
);

// @desc  Get cheackOut session from stripe and sent to response

export const createStripeSession = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) return next(new ApiError("not cart found for logged user", 404));

  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },

        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: req.user.email,
    client_reference_id: cart._id,
    metadata: req.body.shippingAddress,
    success_url: `${req.protocol}://${req.get("host")}/order`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
  });

  return res
    .status(200)
    .json({ message: "create stripe session successfuly", data: session });
});

export const stripeCheckOutWebHook = (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      console.log("HEEERRRRRRRRRRRRRRRRRRRRRRR");
      // Then define and call a function to handle the event checkout.session.completed
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  // res.send();
};
