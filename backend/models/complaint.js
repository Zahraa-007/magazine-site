import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Complaint = sequelize.define("Complaint", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  type: {
    type: DataTypes.ENUM("content", "user", "technical", "other"),
    allowNull: false,
  },
  content: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.ENUM("under_review", "investigating", "closed", "rejected"),
    defaultValue: "under_review",
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },
  handled_by: { type: DataTypes.INTEGER },
  response: { type: DataTypes.TEXT },
  tracking_code: { type: DataTypes.STRING },
}, { timestamps: true });
