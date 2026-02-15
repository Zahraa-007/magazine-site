import express from 'express';
import { createComment, getAllComments, getCommentsByArticle } from '../controllers/commentController.js';

const router = express.Router();

// GET Comments by Article (MUST come before general GET)
router.get('/article/:articleId', getCommentsByArticle);

// GET All Comments
router.get('/', getAllComments);

// POST create a new Comment
router.post('/', createComment);

export default router;
