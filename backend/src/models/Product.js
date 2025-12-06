import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Product = sequelize.define("Product", {
  shopifyId: { type: DataTypes.STRING },
  tenantId: { type: DataTypes.INTEGER },   // NEW
  title: DataTypes.STRING,
  price: DataTypes.STRING,
});
