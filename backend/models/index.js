import { AdminNotification } from './AdminNotification.js';
import { Article } from './article.js';
import { Categories as Category } from './category.js';
import { Comment } from './comment.js';
import { Complaint } from './complaint.js';
import { ComplaintAttachment } from './complaintAttachment.js';
import { ContactMessage } from './contact.js';
import { Thesis } from './thesis.js';
import { User } from './user.js';
import { Analytics } from './Analytics.js';

// Define associations
Article.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
User.hasMany(Article, { foreignKey: 'author_id', as: 'articles' });

Article.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Article, { foreignKey: 'category_id', as: 'articles' });

Comment.belongsTo(Article, { foreignKey: 'article_id', as: 'article' });
Article.hasMany(Comment, { foreignKey: 'article_id', as: 'comments' });

Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });

Complaint.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Complaint, { foreignKey: 'user_id', as: 'complaints' });

ComplaintAttachment.belongsTo(Complaint, { foreignKey: 'complaint_id', as: 'complaint' });
Complaint.hasMany(ComplaintAttachment, { foreignKey: 'complaint_id', as: 'attachments' });

Thesis.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
User.hasMany(Thesis, { foreignKey: 'author_id', as: 'theses' });

AdminNotification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(AdminNotification, { foreignKey: 'user_id', as: 'notifications' });



export {
  AdminNotification,
  Article,
  Category,
  Comment,
  Complaint,
  ComplaintAttachment,
  ContactMessage,
  Thesis,
  User,
  Analytics
};
