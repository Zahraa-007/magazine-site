import app from "./app.js";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import { Article } from "./models/article.js";
import { Categories } from "./models/category.js";
import { Comment } from "./models/comment.js";
import { User } from "./models/user.js";
// Import all models from index to ensure associations are loaded
import * as models from "./models/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize database and sync models
async function startServer() {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log("✅ Database authenticated successfully");

    // Sync all models with the database
    await sequelize.sync({ force: false }); // Changed to false to not drop tables on restart
    console.log("✅ Database models synced");

    // Create default categories
    const defaultCategories = [
      { name: 'thought-society', description: 'الفكر والمجتمع' },
      { name: 'business', description: 'ادارة الاعمال' },
      { name: 'technology', description: 'التكنولوجيا' },
      { name: 'sciences', description: 'العلوم' },
      { name: 'general', description: 'عام' }
    ];

    for (const cat of defaultCategories) {
      await Categories.findOrCreate({
        where: { name: cat.name },
        defaults: cat
      });
    }
    console.log("✅ Default categories created");

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Comments API available at http://localhost:${PORT}/api/comments`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
