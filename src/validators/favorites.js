import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";

export const createAndRemoveFavorites = [
  check("productId").isMongoId().withMessage("invalid Product Id"),

  validationMiddleware,
];
