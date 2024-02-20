import { Router } from "express";
import * as controllers from "../controllers/category.js";
const router = Router();

router.post("/", controllers.createCategory);
router.get("/", controllers.getCategorys);
router.get("/:id", controllers.SpecifiCategory);
export default router;
