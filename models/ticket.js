module.exports = function(sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    })
 



    Ticket.associate = function(models) {
        Ticket.belongsTo(models.Concert, 
            { onDelete: "CASCADE", foreignKey: { allowNull: false } });
    }
    
    return Ticket;
}