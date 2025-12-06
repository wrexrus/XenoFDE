import axios from "axios";

export const getShopifyClient = (tenant) => {
  return axios.create({
    baseURL: `https://${tenant.storeUrl}/admin/api/2024-10`,
    headers: {
      "X-Shopify-Access-Token": tenant.accessToken,
      "Content-Type": "application/json",
    },
  });
};

export const fetchProducts = async (tenant) => {
  const api = getShopifyClient(tenant);
  const res = await api.get("/products.json");
  return res.data.products;
};

export const fetchCustomers = async (tenant) => {
  const api = getShopifyClient(tenant);
  const res = await api.get("/customers.json");
  return res.data.customers;
};

export const fetchOrders = async (tenant) => {
  const api = getShopifyClient(tenant);
  const res = await api.get("/orders.json");
  return res.data.orders;
};
