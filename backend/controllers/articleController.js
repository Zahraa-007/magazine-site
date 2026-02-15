import { Article } from '../models/article.js';
import { Categories } from '../models/category.js';
import { Op } from 'sequelize';

// إنشاء مقال جديد
export const createArticle = async (req, res) => {
  try {
    const { title, content, category_id, author_id, author_name, status, image_url } = req.body;
    
    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    // Handle category_id - convert category name to ID if needed
    let finalCategoryId = null;
    if (category_id) {
      // Check if category_id is a number
      if (!isNaN(category_id) && category_id !== '') {
        finalCategoryId = parseInt(category_id);
      } else {
        // Try to find category by name
        const category = await Categories.findOne({
          where: { name: category_id }
        });
        finalCategoryId = category ? category.id : null;
      }
    }
    
    console.log('Creating article with data:', {
      title: title.substring(0, 50),
      author_id,
      category_id: finalCategoryId,
      status,
      hasImage: !!image_url
    });
    
    // Create article with provided data
    const article = await Article.create({
      title,
      content,
      category_id: finalCategoryId,
      author_id: author_id || null,
      author_name: author_name || null,
      status: status || 'draft',
      image_url: image_url || null
    });
    
    console.log('Article created successfully:', article.id);
    res.status(201).json(article);
  } catch (err) {
    console.error('Article creation error:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      sql: err.sql
    });
    res.status(400).json({ 
      error: 'Failed to create article',
      details: err.message 
    });
  }
};

// عرض جميع المقالات
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['createdAt', 'DESC']],
      raw: false
    });
    // Ensure we always return an array
    res.json(Array.isArray(articles) ? articles : []);
  } catch (err) {
    console.error('Error fetching articles:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    // Return error with status code
    res.status(500).json({ 
      error: 'Failed to fetch articles',
      details: err.message 
    });
  }
};

// عرض مقال واحد وزيادة عدد المشاهدات
export const getArticleById = async (req, res) => {
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
export const updateArticle = async (req, res) => {
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
export const deleteArticle = async (req, res) => {
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
export const changeStatus = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const newStatus = req.body.status;
    if (!['draft', 'pending', 'published'].includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    article.status = newStatus;
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin publish any type of content (articles, theses, featured articles, monthly articles)
export const adminPublishContent = async (req, res) => {
  try {
    const { title, content, content_type, category_id, image_url, author_name, tags } = req.body;
    
    // Validation
    if (!title || !content || !content_type) {
      return res.status(400).json({ error: 'Title, content, and content_type are required' });
    }

    const validContentTypes = ['article', 'thesis', 'featured_article', 'monthly_article'];
    if (!validContentTypes.includes(content_type)) {
      return res.status(400).json({ error: 'Invalid content type' });
    }

    // Handle category_id - convert category name to ID if needed (IMPORTANT!)
    let finalCategoryId = null;
    if (category_id) {
      // Check if category_id is a number
      if (!isNaN(category_id) && category_id !== '') {
        finalCategoryId = parseInt(category_id);
      } else {
        // Try to find category by name
        const category = await Categories.findOne({
          where: { name: category_id }
        });
        finalCategoryId = category ? category.id : null;
      }
    }

    console.log('Admin publishing content:', {
      title: title.substring(0, 50),
      content_type,
      category_id_input: category_id,
      category_id_final: finalCategoryId,
      tags: tags ? tags.length : 0
    });

    // Process tags - ensure it's an array
    let processedTags = [];
    if (tags) {
      if (Array.isArray(tags)) {
        processedTags = tags.filter(t => t && t.trim() !== '');
      } else if (typeof tags === 'string') {
        processedTags = tags.split(',').map(t => t.trim()).filter(t => t !== '');
      }
    }

    // Create article with admin publish - status is directly published
    const article = await Article.create({
      title,
      content,
      content_type,
      category_id: finalCategoryId,
      author_id: null,
      author_name: author_name || 'مسؤول النظام',
      status: 'published', // Admin can directly publish
      image_url: image_url || null,
      tags: processedTags && processedTags.length > 0 ? processedTags : []
    });

    console.log('Content published successfully:', {
      id: article.id,
      title: article.title,
      type: content_type,
      status: article.status
    });
    res.status(201).json(article);
  } catch (err) {
    console.error('Admin publish error:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
      sql: err.sql
    });
    res.status(400).json({ 
      error: 'Failed to publish content',
      details: err.message 
    });
  }
};

// Get articles by content type
export const getArticlesByType = async (req, res) => {
  try {
    const { content_type } = req.query;

    let articles;
    if (content_type) {
      const validContentTypes = ['article', 'thesis', 'featured_article', 'monthly_article'];
      if (!validContentTypes.includes(content_type)) {
        return res.status(400).json({ error: 'Invalid content type' });
      }
      articles = await Article.findAll({
        where: { content_type, status: 'published' },
        order: [['createdAt', 'DESC']],
        raw: false
      });
    } else {
      articles = await Article.findAll({
        where: { status: 'published' },
        order: [['createdAt', 'DESC']],
        raw: false
      });
    }

    res.json(Array.isArray(articles) ? articles : []);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch articles',
      details: err.message 
    });
  }
};

// Get only published articles (more efficient than getAllArticles then filtering)
export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { status: 'published' },
      order: [['createdAt', 'DESC']],
      raw: false
    });
    res.json(Array.isArray(articles) ? articles : []);
  } catch (err) {
    console.error('Error fetching published articles:', {
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({ 
      error: 'Failed to fetch published articles',
      details: err.message 
    });
  }
};
