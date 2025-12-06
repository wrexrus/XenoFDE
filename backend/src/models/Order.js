import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Order = sequelize.define("Order", {
  shopifyId: { type: DataTypes.STRING, unique: true },
  tenantId: { type: DataTypes.INTEGER },   // NEW
  totalPrice: DataTypes.DECIMAL(10, 2),
  currency: DataTypes.STRING
});
