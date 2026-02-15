import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Article } from './article.js';
import { User } from './user.js';

export const Comment = sequelize.define('Comment', {
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  author_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('visible', 'hidden'),
    defaultValue: 'visible'
  }
}, {
  tableName: 'Comments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Associations
Comment.belongsTo(Article, { foreignKey: 'article_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
