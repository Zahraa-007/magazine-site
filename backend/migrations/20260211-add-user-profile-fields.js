export async function up(sequelize) {
    const queryInterface = sequelize.getQueryInterface();
    
    try {
        // Add missing columns to Users table
        
        // Check if avatar column exists
        try {
            await queryInterface.describeTable('users').then((attributes) => {
                if (!attributes.avatar) {
                    return queryInterface.addColumn('users', 'avatar', {
                        type: sequelize.DataTypes.TEXT,
                    });
                }
            });
        } catch (err) {
            console.log('Avatar column check/addition skipped:', err.message);
        }

        // Check if affiliation column exists
        try {
            await queryInterface.describeTable('users').then((attributes) => {
                if (!attributes.affiliation) {
                    return queryInterface.addColumn('users', 'affiliation', {
                        type: sequelize.DataTypes.STRING,
                        allowNull: true,
                    });
                }
            });
        } catch (err) {
            console.log('Affiliation column check/addition skipped:', err.message);
        }

        // Check if website column exists
        try {
            await queryInterface.describeTable('users').then((attributes) => {
                if (!attributes.website) {
                    return queryInterface.addColumn('users', 'website', {
                        type: sequelize.DataTypes.STRING,
                        allowNull: true,
                    });
                }
            });
        } catch (err) {
            console.log('Website column check/addition skipped:', err.message);
        }

        console.log('User profile fields migration completed');
    } catch (error) {
        console.error('Error in migration:', error);
        throw error;
    }
}

export async function down(sequelize) {
    const queryInterface = sequelize.getQueryInterface();
    
    try {
        await queryInterface.removeColumn('users', 'avatar');
        await queryInterface.removeColumn('users', 'affiliation');
        await queryInterface.removeColumn('users', 'website');
    } catch (error) {
        console.error('Error rolling back migration:', error);
    }
}
