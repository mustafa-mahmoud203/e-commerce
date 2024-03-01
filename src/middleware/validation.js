import { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  next();
};

export default validationMiddleware;
