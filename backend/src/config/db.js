import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("Dialect from env:", process.env.DB_DIALECT);

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected successfully.");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};
