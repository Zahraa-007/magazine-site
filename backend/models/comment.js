import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
//import { User } from './user.js';
//import { Article } from './article.js';

export const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('visible','hidden','pending'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

//Comment.belongsTo(User, { foreignKey: 'user_id' });
//Comment.belongsTo(Article, { foreignKey: 'article_id' });
