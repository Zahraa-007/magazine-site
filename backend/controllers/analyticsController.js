import { Analytics, Article, User, Comment } from '../models/index.js';
import { Op } from 'sequelize';

// Get analytics data
export const getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    // Get various analytics data
    const [
      totalUsers,
      totalArticles,
      totalComments,
      pageViews,
      userRegistrations,
      articleViews
    ] = await Promise.all([
      User.count(),
      Article.count(),
      Comment.count(),
      Analytics.sum('value', { where: { ...dateFilter, type: 'page_views' } }),
      Analytics.sum('value', { where: { ...dateFilter, type: 'user_registrations' } }),
      Analytics.sum('value', { where: { ...dateFilter, type: 'article_views' } })
    ]);

    // Get recent analytics data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentData = await Analytics.findAll({
      where: {
        date: {
          [Op.gte]: thirtyDaysAgo
        }
      },
      order: [['date', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        totals: {
          users: totalUsers,
          articles: totalArticles,
          comments: totalComments,
          pageViews: pageViews || 0,
          userRegistrations: userRegistrations || 0,
          articleViews: articleViews || 0
        },
        recent: recentData
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'فشل في جلب بيانات التحليلات'
    });
  }
};

// Generate analytics report
export const generateAnalyticsReport = async (req, res) => {
  try {
    const { startDate, endDate, format = 'json' } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.date = {
        [Op.between]: [startDate, endDate]
      };
    }

    // Generate comprehensive report
    const report = {
      generatedAt: new Date(),
      period: { startDate, endDate },
      summary: {},
      details: {}
    };

    // Summary statistics
    const [
      totalUsers,
      totalArticles,
      totalComments,
      pageViews,
      userRegistrations,
      articleViews
    ] = await Promise.all([
      User.count(),
      Article.count(),
      Comment.count(),
      Analytics.sum('value', { where: { ...dateFilter, type: 'page_views' } }),
      Analytics.sum('value', { where: { ...dateFilter, type: 'user_registrations' } }),
      Analytics.sum('value', { where: { ...dateFilter, type: 'article_views' } })
    ]);

    report.summary = {
      totalUsers,
      totalArticles,
      totalComments,
      pageViews: pageViews || 0,
      userRegistrations: userRegistrations || 0,
      articleViews: articleViews || 0
    };

    // Detailed breakdowns
    const articlesByCategory = await Article.findAll({
      include: [{
        model: require('../models/category.js').Category,
        as: 'category'
      }],
      attributes: [
        [require('sequelize').fn('COUNT', require('sequelize').col('Article.id')), 'count'],
        [require('../models/category.js').Category, 'categoryName']
      ],
      group: ['category.id', 'category.name']
    });

    report.details = {
      articlesByCategory,
      topArticles: await Article.findAll({
        limit: 10,
        order: [['views', 'DESC']],
        attributes: ['id', 'title', 'views', 'createdAt']
      }),
      recentActivity: await Analytics.findAll({
        where: dateFilter,
        order: [['date', 'DESC']],
        limit: 50
      })
    };

    if (format === 'pdf') {
      // In a real implementation, you'd generate a PDF here
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=analytics-report.pdf');
      // Return PDF buffer
      res.send(Buffer.from(JSON.stringify(report, null, 2)));
    } else {
      res.json({
        success: true,
        data: report
      });
    }
  } catch (error) {
    console.error('Error generating analytics report:', error);
    res.status(500).json({
      success: false,
      message: 'فشل في إنشاء التقرير'
    });
  }
};

// Record analytics event
export const recordAnalyticsEvent = async (req, res) => {
  try {
    const { type, value, metadata } = req.body;

    if (!type || value === undefined) {
      return res.status(400).json({
        success: false,
        message: 'النوع والقيمة مطلوبان'
      });
    }

    const analytics = await Analytics.create({
      type,
      value,
      date: new Date(),
      metadata
    });

    res.status(201).json({
      success: true,
      data: analytics,
      message: 'تم تسجيل الحدث بنجاح'
    });
  } catch (error) {
    console.error('Error recording analytics event:', error);
    res.status(500).json({
      success: false,
      message: 'فشل في تسجيل الحدث'
    });
  }
};
