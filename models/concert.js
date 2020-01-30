module.exports = function(sequelize, DataTypes) {
    var Concert = sequelize.define("Concert", {
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
        Concert.belongsTo(models.Artist, 
            { onDelete: "CASCADE"});
        Concert.hasOne(models.Ticket)
    }
    return Concert;
}

//artist can have many concerts//
//concert has a ticket//
//users have many tickets