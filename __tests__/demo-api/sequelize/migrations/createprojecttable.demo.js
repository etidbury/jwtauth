
module.exports = {
    up: (queryInterface, Sequelize) => {
        // return queryInterface.createTable('SpotifyTracks', {
        //     id: {
        //         allowNull: false,
        //         autoIncrement: true,
        //         primaryKey: true,
        //         type: Sequelize.INTEGER // id type
        //     },
        //     /**
        //      * Project title
        //      */
        //     title: {
        //         allowNull: false,
        //         type: Sequelize.STRING
        //     },
        //     createdAt: {
        //         allowNull: false,
        //         type: Sequelize.DATE,
        //         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        //     },
        //     updatedAt: {
        //         allowNull: false,
        //         type: Sequelize.DATE,
        //         defaultValue: Sequelize.literal(
        //             'CURRENT_TIMESTAMP' // ' ON UPDATE CURRENT_TIMESTAMP' not supported by SQLite
        //         )
        //     }
        // })
    },
    down: (queryInterface, Sequelize) => {
        // return queryInterface.dropTable('DemoProjects')
    }
}
