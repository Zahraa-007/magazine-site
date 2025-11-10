const { Article } = require('../models');
const { Op } = require('sequelize');

// إنشاء مقال جديد
exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// عرض جميع المقالات
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// عرض مقال واحد وزيادة عدد المشاهدات
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (article.status === 'published') {
      await article.increment('view_count', { by: 1 });
    }

    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تعديل مقال
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    await article.update(req.body);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// حذف مقال
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    await article.destroy();
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تغيير الحالة (draft ↔ published)
exports.changeStatus = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const newStatus = req.body.status;
    if (!['draft', 'published'].includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    article.status = newStatus;
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
