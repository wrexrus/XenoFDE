import { Product } from "../models/Product.js";
import { Customer } from "../models/Customer.js";
import { Order } from "../models/Order.js";
import { sequelize } from "../config/db.js";

/**
 * 1) Overview Metrics 
 * */
export const getOverview = async (req, res) => {
  const { tenantId } = req.params;

  const totalCustomers = await Customer.count({ where: { tenantId } });
  const totalOrders = await Order.count({ where: { tenantId } });

  const revenueResult = await Order.findOne({
    where: { tenantId },
    attributes: [
      [sequelize.fn("SUM", sequelize.col("totalPrice")), "totalRevenue"]
    ],
    raw: true,
  });

  res.json({
    totalCustomers,
    totalOrders,
    totalRevenue: Number(revenueResult.totalRevenue || 0).toFixed(2),
  });
};


/**
 * 2) Orders By Date (Chart)
 */
export const getOrdersByDate = async (req, res) => {
  const { tenantId } = req.params;
  const { start, end } = req.query;

  const result = await Order.findAll({
    where: {
      tenantId,
      createdAt: {
        [sequelize.Op.between]: [new Date(start), new Date(end)],
      },
    },
    attributes: [
      [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
      [sequelize.fn("COUNT", "*"), "count"],
    ],
    group: ["date"],
    order: [[sequelize.literal("date"), "ASC"]],
    raw: true,
  });

  res.json(result);
};


/**
 * 3) Top 5 Customers by Spend
 */
export const getTopCustomers = async (req, res) => {
  const { tenantId } = req.params;

  const result = await Order.findAll({
    where: { tenantId },
    attributes: [
      "currency",
      [sequelize.fn("SUM", sequelize.col("totalPrice")), "spend"],
      [sequelize.col("Customer.email"), "email"],
    ],
    include: [
      {
        model: Customer,
        attributes: [],
        required: true,
      },
    ],
    group: ["Customer.email", "currency"],
    order: [[sequelize.literal("spend"), "DESC"]],
    limit: 5,
    raw: true,
  });

  res.json(result);
};


/**
 * 4) Revenue Trend (Daily)
 */
export const getRevenueTrend = async (req, res) => {
  const { tenantId } = req.params;

  const result = await Order.findAll({
    where: { tenantId },
    attributes: [
      [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
      [sequelize.fn("SUM", sequelize.col("totalPrice")), "revenue"],
    ],
    group: ["date"],
    order: [[sequelize.literal("date"), "ASC"]],
    raw: true,
  });

  res.json(result);
};
