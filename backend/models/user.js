import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.TEXT,
    },
    role: {
        type: DataTypes.ENUM("guest", "author", "verified", "moderator", "admin", "support","auditor"),
        defaultValue: "guest",
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    whatsapp_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    membership_type: {
        type: DataTypes.ENUM("free", "premium"),
        defaultValue: "free",
    },
    verification_docs: {
        type: DataTypes.TEXT,
    },
    bio: {
        type: DataTypes.TEXT,
    },
    profile_image_url: {
        type: DataTypes.TEXT,
    },
    avatar: {
        type: DataTypes.TEXT,
    },
    affiliation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }

});

