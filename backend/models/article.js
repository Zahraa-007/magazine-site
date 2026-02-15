import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import slugify from 'slugify';

export class Article extends Model {}

Article.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    image_url: { type: DataTypes.TEXT },
    category_id: { type: DataTypes.INTEGER },
    author_id: { type: DataTypes.INTEGER },
    author_name: { type: DataTypes.STRING },
    reading_time: { type: DataTypes.INTEGER },
    tags: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
    view_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.ENUM('draft', 'pending', 'published'), defaultValue: 'draft' },
    content_type: { type: DataTypes.ENUM('article', 'thesis', 'featured_article', 'monthly_article'), defaultValue: 'article' },
  },
  {
    sequelize,
    modelName: 'Article',
    tableName: 'Articles',
    hooks: {
      beforeValidate: (article) => {
        if (article.title && !article.slug) {
          // Generate slug from title with timestamp to ensure uniqueness
          const baseSlug = slugify(article.title, { lower: true });
          const timestamp = Date.now();
          article.slug = `${baseSlug}-${timestamp}`;
        }
        if (article.content) {
          const words = article.content.split(/\s+/).length;
          article.reading_time = Math.ceil(words / 200);
        }
      },
    },
  }
);
