import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Tenant = sequelize.define("Tenant", {
  storeUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
