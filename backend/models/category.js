import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Categories = sequelize.define("Categories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
});