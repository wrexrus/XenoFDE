import { Tenant } from "../models/Tenant.js";
import { Product } from "../models/Product.js";
import { Customer } from "../models/Customer.js";
import { Order } from "../models/Order.js";

import {
  fetchProducts,
  fetchCustomers,
  fetchOrders,
} from "../services/shopifyService.js";

export const syncProducts = async (req, res) => {
  const { tenantId } = req.params;
  const tenant = await Tenant.findByPk(tenantId);
  if (!tenant) return res.status(404).json({ error: "Tenant not found" });

  const products = await fetchProducts(tenant);

  for (const p of products) {
    await Product.upsert({
      shopifyId: p.id,
      tenantId,
      title: p.title,
      price: p.variants[0]?.price || "0",
    });
  }

  res.json({ message: "Products synced", count: products.length });
};

export const syncCustomers = async (req, res) => {
  const { tenantId } = req.params;
  const tenant = await Tenant.findByPk(tenantId);

  const customers = await fetchCustomers(tenant);

  for (const c of customers) {
    await Customer.upsert({
      shopifyId: c.id,
      tenantId,
      email: c.email,
      firstName: c.first_name,
      lastName: c.last_name,
    });
  }

  res.json({ message: "Customers synced", count: customers.length });
};

export const syncOrders = async (req, res) => {
  const { tenantId } = req.params;
  const tenant = await Tenant.findByPk(tenantId);

  const orders = await fetchOrders(tenant);

  for (const o of orders) {
    await Order.upsert({
      shopifyId: o.id,
      tenantId,
      totalPrice: Number(o.total_price || 0),
      currency: o.currency,
      customerId: o.customer?.id || null,
    });
  }

  res.json({ message: "Orders synced", count: orders.length });
};


export const listProducts = async (req, res) => {
  const { tenantId } = req.params;
  const products = await Product.findAll({
    where: { tenantId },
    order: [["createdAt", "DESC"]],
  });
  res.json(products);
};

export const listCustomers = async (req, res) => {
  const { tenantId } = req.params;
  const customers = await Customer.findAll({
    where: { tenantId },
    order: [["createdAt", "DESC"]],
  });
  res.json(customers);
};

export const listOrders = async (req, res) => {
  const { tenantId } = req.params;
  const orders = await Order.findAll({
    where: { tenantId },
    order: [["createdAt", "DESC"]],
  });
  res.json(orders);
};