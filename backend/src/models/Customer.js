import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Customer = sequelize.define("Customer", {
  shopifyId: { type: DataTypes.STRING, unique: true },
  email: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING
});
