import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Customer = sequelize.define("Customer", {
  shopifyId: { type: DataTypes.STRING, unique: true },
  tenantId: { type: DataTypes.INTEGER }, 
  email: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING
});
