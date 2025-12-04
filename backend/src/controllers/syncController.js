import { Product } from "../models/Product.js";
import { Customer } from "../models/Customer.js";
import { Order } from "../models/Order.js";
import {
  fetchProducts,
  fetchCustomers,
  fetchOrders,
} from "../services/shopifyService.js";

export const syncProducts = async (req, res) => {
  const products = await fetchProducts();
  for (const p of products) {
    await Product.upsert({
      shopifyId: p.id.toString(),
      title: p.title,
      price: p.variants[0]?.price || "0"
    });
  }
  res.json({ message: "Products synced", count: products.length });
};

export const syncCustomers = async (req, res) => {
  const customers = await fetchCustomers();
  for (const c of customers) {
    await Customer.upsert({
      shopifyId: c.id.toString(),
      email: c.email,
      firstName: c.first_name,
      lastName: c.last_name
    });
  }
  res.json({ message: "Customers synced", count: customers.length });
};

export const syncOrders = async (req, res) => {
  const orders = await fetchOrders();
  for (const o of orders) {
    await Order.upsert({
      shopifyId: o.id.toString(),
      totalPrice: o.total_price,
      currency: o.currency
    });
  }
  res.json({ message: "Orders synced", count: orders.length });
};

export const listProducts = async (req, res) => {
  const products = await Product.findAll({ limit: 50, order: [["createdAt", "DESC"]] });
  res.json(products);
};

export const listCustomers = async (req, res) => {
  const customers = await Customer.findAll({ limit: 50, order: [["createdAt", "DESC"]] });
  res.json(customers);
};

export const listOrders = async (req, res) => {
  const orders = await Order.findAll({ limit: 50, order: [["createdAt", "DESC"]] });
  res.json(orders);
};
