'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if table exists first
    const tableExists = await queryInterface.tableExists('Articles');
    
    if (!tableExists) {
      // Create table if it doesn't exist
      await queryInterface.createTable('Articles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        slug: {
          type: Sequelize.STRING,
          unique: true
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        image_url: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        category_id: {
          type: Sequelize.STRING,
          allowNull: true
        },
        author_id: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        author_name: {
          type: Sequelize.STRING,
          allowNull: true
        },
        reading_time: {
          type: Sequelize.INTEGER
        },
        tags: {
          type: Sequelize.ARRAY(Sequelize.TEXT),
          allowNull: false,
          defaultValue: []
        },
        view_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        status: {
          type: Sequelize.ENUM('draft', 'pending', 'published'),
          allowNull: false,
          defaultValue: 'draft'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        }
      });
    } else {
      // Add missing columns if they don't exist
      try {
        await queryInterface.addColumn('Articles', 'image_url', {
          type: Sequelize.TEXT,
          allowNull: true
        });
      } catch (err) {
        // Column might already exist
        console.log('image_url column already exists or error:', err.message);
      }

      try {
        await queryInterface.addColumn('Articles', 'category_id', {
          type: Sequelize.STRING,
          allowNull: true
        });
      } catch (err) {
        console.log('category_id column already exists or error:', err.message);
      }

      try {
        await queryInterface.addColumn('Articles', 'author_id', {
          type: Sequelize.INTEGER,
          allowNull: true
        });
      } catch (err) {
        console.log('author_id column already exists or error:', err.message);
      }

      try {
        await queryInterface.addColumn('Articles', 'author_name', {
          type: Sequelize.STRING,
          allowNull: true
        });
      } catch (err) {
        console.log('author_name column already exists or error:', err.message);
      }

      // Update status enum to include 'pending'
      try {
        await queryInterface.changeColumn('Articles', 'status', {
          type: Sequelize.ENUM('draft', 'pending', 'published'),
          allowNull: false,
          defaultValue: 'draft'
        });
      } catch (err) {
        console.log('status enum update already done or error:', err.message);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // Drop the table if needed
    await queryInterface.dropTable('Articles');
  }
};
