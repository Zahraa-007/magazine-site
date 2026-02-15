'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add author_name column if it doesn't exist
    try {
      await queryInterface.addColumn('Comments', 'author_name', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Guest',
      });
      console.log('✅ author_name column added to Comments');
    } catch (err) {
      console.warn('author_name column may already exist or failed to add:', err.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Comments', 'author_name');
      console.log('✅ author_name column removed from Comments');
    } catch (err) {
      console.warn('Failed to remove author_name column:', err.message);
    }
  }
};
