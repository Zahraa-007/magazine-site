import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Complaint } from "./complaint.js";

export const ComplaintAttachment = sequelize.define("ComplaintAttachment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  complaint_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Complaint,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  file_path: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

// Establish relationship
Complaint.hasMany(ComplaintAttachment, { foreignKey: "complaint_id", onDelete: "CASCADE" });
ComplaintAttachment.belongsTo(Complaint, { foreignKey: "complaint_id" });
