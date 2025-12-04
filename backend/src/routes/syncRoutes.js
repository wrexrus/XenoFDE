import { Router } from "express";
import {
  syncProducts,
  syncCustomers,
  syncOrders,
  listProducts,
  listCustomers,
  listOrders,
} from "../controllers/syncController.js";

const router = Router();

// Sync routes
router.get("/products", syncProducts);
router.get("/customers", syncCustomers);
router.get("/orders", syncOrders);

// View routes (for debugging)
router.get("/data/products", listProducts);
router.get("/data/customers", listCustomers);
router.get("/data/orders", listOrders);

export default router;
