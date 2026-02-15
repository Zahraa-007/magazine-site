// middleware/auth.js

// محاكاة نظام صلاحيات بسيط لأغراض الاختبار
// في المستقبل يمكن استبداله بـ JWT أو OAuth

const authorize = (roleRequired) => {
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

// Middleware to authenticate token/user
export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] || req.headers['x-auth-token'];
  const userRole = req.headers['x-user-role'];

  // Simple validation - check if user has a role header or token
  if (!token && !userRole) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  next();
};

// Middleware to require admin privileges
export const requireAdmin = (req, res, next) => {
  const userRole = req.headers['x-user-role'] || 'guest';

  if (userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin privileges required' });
  }

  next();
};

export default authorize;
