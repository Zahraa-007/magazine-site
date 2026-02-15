import express from 'express';
import { getAnalytics, generateAnalyticsReport, recordAnalyticsEvent } from '../controllers/analyticsController.js';
import { authenticateToken, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Analytics routes - some public, some admin-only
router.get('/', authenticateToken, requireAdmin, getAnalytics);
router.get('/report', authenticateToken, requireAdmin, generateAnalyticsReport);
router.post('/event', recordAnalyticsEvent); // Public for recording events

export default router;
