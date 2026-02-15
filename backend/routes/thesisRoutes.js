import express from 'express';
import { createThesis, getAllThesis } from '../controllers/thesisController.js';

const router = express.Router();

// GET all thesis
router.get('/', getAllThesis);

// POST new thesis
router.post('/', createThesis);

export default router;
