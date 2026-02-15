// utils/articleUtils.js

// دالة لحساب وقت القراءة التقريبي بناءً على عدد الكلمات
function calculateReadingTime(content) {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200); // 200 كلمة في الدقيقة
}

module.exports = { calculateReadingTime };
