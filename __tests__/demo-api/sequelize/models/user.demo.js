
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        'User',
        {
            username: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal(
                    'CURRENT_TIMESTAMP' 
                    // ' ON UPDATE CURRENT_TIMESTAMP' not supported by SQLite
                )
            }
        },
        { timestamps: true }
    )

    User.associate = function(models) {

        // models.User.hasMany(models.ArtistPreset, {
        //     // onDelete: 'CASCADE',
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })

    }

    return User
}
