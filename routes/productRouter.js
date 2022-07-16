import { Router } from "express";
import { createProduct, deleteProduct, singleProduct } from "../controllers/productControllers.js";
import { allProducts } from "../controllers/productControllers.js";
import { updateProduct } from "../controllers/productControllers.js";
import { requireToken, requireAdminToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/createProduct",requireAdminToken, createProduct);
router.get("/allProducts", allProducts);
router.post("/deleteProduct/:item",requireAdminToken, deleteProduct);
router.post("/updateProduct/:item",requireAdminToken, updateProduct);

router.get("/singleProduct/:item",requireToken, singleProduct);
router.get("/admin/singleProduct/:item",requireAdminToken, singleProduct);


export default router;