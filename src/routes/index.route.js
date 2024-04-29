import categoryRouter from "./category.route.js";
import brandsRouter from "./brands.route.js";
import productsRouter from "./product.route.js";
import subCategoryRouter from "./subCategory.route.js";
import usersRouter from "./users.route.js";
import adminUsersRouter from "./users(Admin).route.js";
import authRouter from "./auth.route.js";
import reviewRouter from "./review.route.js";
import favoritesRouter from "./favorites.route.js";
import addressesRouter from "./addresses.route.js";
import cartRouter from "./cart.route.js";
import couponRouter from "./coupon.route.js";
import orderRouter from "./order.route.js";

const indexRoutes = (app) => {
  app.use("/categories", categoryRouter);
  app.use("/subCategories", subCategoryRouter);
  app.use("/brands", brandsRouter);
  app.use("/products", productsRouter);
  app.use("/admin/users", adminUsersRouter);
  app.use("/users", usersRouter);
  app.use("/reviews", reviewRouter);
  app.use("/favorites", favoritesRouter);
  app.use("/addresses", addressesRouter);
  app.use("/cart", cartRouter);
  app.use("/coupon", couponRouter);
  app.use("/order", orderRouter);
  app.use("/", authRouter);
};

export default indexRoutes;
