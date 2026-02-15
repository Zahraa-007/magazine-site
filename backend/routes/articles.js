import express from 'express';
import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle, changeStatus, adminPublishContent, getArticlesByType, getPublishedArticles } from '../controllers/articleController.js';
import authorize from '../middlewares/auth.js';

const router = express.Router();

// Specific routes first (before /:id)
router.post('/publish/admin-publish', authorize('admin'), adminPublishContent); // Admin publish any content type
router.get('/published', getPublishedArticles); // Get only published articles
router.get('/type/by-type', getArticlesByType); // Get articles by content type

// Generic CRUD Routes
router.post('/', authorize('author'), createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', authorize('author'), updateArticle);  // admin can also update due to role hierarchy
router.delete('/:id', authorize('admin'), deleteArticle);  // only admin can delete
router.patch('/:id/status', authorize('author'), changeStatus);  // admin can also change status due to role hierarchy

export default router;
