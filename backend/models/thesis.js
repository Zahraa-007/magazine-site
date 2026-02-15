import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Thesis = sequelize.define("Thesis", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abstract: {
    type: DataTypes.TEXT,
  },
  file_url: {
    type: DataTypes.TEXT,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verification_docs: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("pending", "published", "rejected"),
    defaultValue: "pending",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
