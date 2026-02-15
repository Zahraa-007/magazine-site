'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists
    const tableDescription = await queryInterface.describeTable('Comments');
    
    if (!tableDescription.created_at) {
      await queryInterface.addColumn('Comments', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      });
      console.log('✅ Added created_at column to Comments table');
    } else {
      console.log('ℹ️ created_at column already exists in Comments table');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comments', 'created_at');
  }
};
