module.exports = function(sequelize, DataTypes) {
    var Concert = sequelize.define("concert", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[3,100]
            }
        },
        date: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len:[7]
            }
        }
        
    });
    Concert.associate = function(models) {
        Concert.belongsTo(models.artist, 
            { onDelete: "CASCADE", foreignKey: {allowNull: false}});
        Concert.hasMany(models.user, 
            {   as: 'concerts',
                foreignKey: "concert_id",
                });
    }
    return Concert
}