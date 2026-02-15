import { Comment } from '../models/index.js';
import { Article } from '../models/article.js';

// إنشاء تعليق جديد
export const createComment = async (req, res) => {
  try {
    const { article_id, content, author_name, author_email } = req.body;
    const userId = req.user?.id || null;

    if (!article_id || !content) {
      return res.status(400).json({ message: 'article_id and content are required' });
    }

    const article = await Article.findByPk(article_id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const comment = await Comment.create({
      article_id,
      content,
      user_id: userId,
      author_name: userId ? null : (author_name || 'Guest'),
      author_email: userId ? null : author_email,
      status: 'visible'
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create comment',
      error: error.message
    });
  }
};

// استرجاع كل التعليقات
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// استرجاع التعليقات الخاصة بمقال محدد
export const getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.findAll({
      where: { article_id: articleId, status: 'visible' },
      order: [['createdAt', 'DESC']]
    });
    res.json(comments);
  } catch (err) {
    // If the above fails (e.g., created_at column doesn't exist), try without ordering
    try {
      const comments = await Comment.findAll({
        where: { article_id: articleId, status: 'visible' }
      });
      res.json(comments);
    } catch (fallbackErr) {
      res.status(500).json({ error: fallbackErr.message });
    }
  }
};
