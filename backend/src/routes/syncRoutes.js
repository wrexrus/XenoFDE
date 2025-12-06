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
router.get("/:tenantId/products", syncProducts);
router.get("/:tenantId/customers", syncCustomers);
router.get("/:tenantId/orders", syncOrders);

// View data routes
router.get("/:tenantId/data/products", listProducts);
router.get("/:tenantId/data/customers", listCustomers);
router.get("/:tenantId/data/orders", listOrders);

export default router;
