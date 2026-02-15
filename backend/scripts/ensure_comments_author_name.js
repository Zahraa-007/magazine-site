import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

async function ensureColumn() {
  try {
    const qi = sequelize.getQueryInterface();
    const table = 'Comments';

    // Check columns
    const tableDesc = await qi.describeTable(table).catch(() => null);
    if (tableDesc && tableDesc.author_name) {
      console.log('author_name column already exists on', table);
      process.exit(0);
    }

    await qi.addColumn(table, 'author_name', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Guest',
    });

    console.log('✅ Added author_name column to', table);
    process.exit(0);
  } catch (err) {
    console.error('Failed to add author_name column:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

ensureColumn();
