import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Order = sequelize.define("Order", {
  shopifyId: { type: DataTypes.STRING, unique: true },
  totalPrice: DataTypes.STRING,
  currency: DataTypes.STRING
});
