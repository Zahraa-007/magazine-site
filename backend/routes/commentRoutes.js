import express from 'express';
import { createComment, getAllComments } from '../controllers/commentController.js';

const router = express.Router();

// GET All Comments
router.get('/', getAllComments);

// POST create a new Comment
router.post('/', createComment);

export default router;
