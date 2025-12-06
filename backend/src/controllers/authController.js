import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Tenant } from "../models/Tenant.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";  // prefer env var

export const registerUser = async (req, res) => {
  const { email, password, tenantId } = req.body;

  if (!email || !password || !tenantId) {
    return res.status(400).json({ error: "email, password and tenantId are required" });
  }

  const tenant = await Tenant.findByPk(tenantId);
  if (!tenant) return res.status(404).json({ error: "Tenant not found" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    passwordHash: hash,
    tenantId,
  });

  res.json({ message: "User registered", userId: user.id });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign(
    {
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login successful", token });
};

export const getProfile = async (req, res) => {
  res.json({
    userId: req.user.userId,
    email: req.user.email,
    tenantId: req.user.tenantId,
  });
};
