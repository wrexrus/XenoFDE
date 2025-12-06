import { Router } from "express";
import {
  getOverview,
  getOrdersByDate,
  getTopCustomers,
  getRevenueTrend,
} from "../controllers/metricsController.js";

const router = Router();

router.get("/:tenantId/overview", getOverview);
router.get("/:tenantId/orders-by-date", getOrdersByDate);
router.get("/:tenantId/top-customers", getTopCustomers);
router.get("/:tenantId/revenue-trend", getRevenueTrend);

export default router;
