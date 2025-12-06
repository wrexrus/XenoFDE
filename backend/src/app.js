import express from "express";
import syncRoutes from "./routes/syncRoutes.js";
import { connectDB, sequelize } from "./config/db.js";
import "./models/Product.js";
import "./models/Customer.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import "./models/Order.js";
import authRoutes from "./routes/authRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import { Order } from "./models/Order.js";
import { Customer } from "./models/Customer.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/sync", syncRoutes);
app.use("/tenant", tenantRoutes);
app.use("/metrics", metricsRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

Order.belongsTo(Customer, {
  foreignKey: "customerId",
  targetKey: "id",
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await sequelize.sync({ alter: true }); // creates tables

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
