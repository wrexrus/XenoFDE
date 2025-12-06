import { Router } from "express";
import { registerTenant, listTenants } from "../controllers/tenantController.js";

const router = Router();

router.post("/register", registerTenant);
router.get("/", listTenants);

export default router;
