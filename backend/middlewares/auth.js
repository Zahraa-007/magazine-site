// middleware/auth.js

// محاكاة نظام صلاحيات بسيط لأغراض الاختبار
// في المستقبل يمكن استبداله بـ JWT أو OAuth

module.exports = (roleRequired) => {
  return (req, res, next) => {
    // افتراضياً نقرأ الدور من الهيدر أو باراميتر
    const userRole = req.headers['x-user-role'] || 'guest'; // guest | author | admin

    const rolesHierarchy = {
      guest: 0,
      author: 1,
      admin: 2
    };

    if (rolesHierarchy[userRole] >= rolesHierarchy[roleRequired]) {
      next();
    } else {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
  };
};
