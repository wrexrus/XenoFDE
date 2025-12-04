import axios from "axios";
import { SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN } from "../config/shopify.js";

const api = axios.create({
  baseURL: `https://${SHOPIFY_STORE_URL}/admin/api/2024-10`,
  headers: {
    "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  const res = await api.get("/products.json");
  return res.data.products;
};

export const fetchCustomers = async () => {
  const res = await api.get("/customers.json");
  return res.data.customers;
};

export const fetchOrders = async () => {
  const res = await api.get("/orders.json");
  return res.data.orders;
};
