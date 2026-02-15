import { sequelize } from '../config/db.js';

// Run the migration to add created_at column
async function runMigration() {
  try {
    console.log('🔄 Starting migration...');
    
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    const queryInterface = sequelize.getQueryInterface();
    
    // Check if the column already exists
    const tableDescription = await queryInterface.describeTable('Comments');
    
    if (!tableDescription.created_at) {
      await queryInterface.addColumn('Comments', 'created_at', {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.NOW
      });
      console.log('✅ Added created_at column to Comments table');
    } else {
      console.log('ℹ️ created_at column already exists in Comments table');
    }
    
    console.log('✅ Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
