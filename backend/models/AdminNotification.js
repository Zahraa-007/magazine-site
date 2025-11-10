import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from './user.js';
export const AdminNotification = sequelize.define("AdminNotification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  type: {
    type: DataTypes.ENUM("new_submission", "verification_request", "complaint_received", "complaint_closed"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("unread", "read"),
    defaultValue: "unread",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(AdminNotification, { foreignKey: "user_id" });
AdminNotification.belongsTo(User, { foreignKey: "user_id" });
