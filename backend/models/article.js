import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import slugify from 'slugify';

export class Article extends Model {}

Article.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    reading_time: { type: DataTypes.INTEGER },
    tags: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
    view_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
  },
  {
    sequelize,
    modelName: 'Article',
    tableName: 'Articles',
    hooks: {
      beforeValidate: (article) => {
        if (article.title && !article.slug) {
          article.slug = slugify(article.title, { lower: true });
        }
        if (article.content) {
          const words = article.content.split(/\s+/).length;
          article.reading_time = Math.ceil(words / 200);
        }
      },
    },
  }
);
