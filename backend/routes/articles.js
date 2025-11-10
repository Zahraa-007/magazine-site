import express from 'express';
import articleController from '../controllers/articleController.js';
import authorize from '../middlewares/auth.js';

const router = express.Router();

// CRUD Routes
router.post('/', authorize('author'), articleController.createArticle);
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.put('/:id', authorize('author'), articleController.updateArticle);
router.delete('/:id', authorize('admin'), articleController.deleteArticle);
router.patch('/:id/status', authorize('author'), articleController.changeStatus);

export default router;
