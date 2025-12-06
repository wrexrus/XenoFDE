import { Tenant } from "../models/Tenant.js";

export const registerTenant = async (req, res) => {
  const { storeUrl, accessToken, storeName } = req.body;

  if (!storeUrl || !accessToken) {
    return res.status(400).json({ error: "storeUrl and accessToken are required" });
  }

  const tenant = await Tenant.create({
    storeUrl,
    accessToken,
    storeName: storeName || null,
  });

  res.json({
    message: "Tenant registered successfully",
    tenantId: tenant.id,
  });
};

export const listTenants = async (req, res) => {
  const tenants = await Tenant.findAll();
  res.json(tenants);
};
