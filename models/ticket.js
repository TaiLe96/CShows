module.exports = function(sequelize, DataTypes) {
    var Ticket = sequelize.define("ticket", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    })
 



    Ticket.associate = function(models, UserTickets) {
        Ticket.belongsTo(models.artist, 
            { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        Ticket.hasMany(models.user, 
            {   as: 'tickets',
                foreignKey: "ticket_id",
             });
    }
    
    return Ticket;
}