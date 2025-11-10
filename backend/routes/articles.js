import express from 'express';
import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle, changeStatus } from '../controllers/articleController.js';
import authorize from '../middlewares/auth.js';

const router = express.Router();

// CRUD Routes
router.post('/', authorize('author'), createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', authorize('author'), updateArticle);
router.delete('/:id', authorize('admin'), deleteArticle);
router.patch('/:id/status', authorize('author'), changeStatus);

export default router;
