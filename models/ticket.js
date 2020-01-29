module.exports = function(sequelize, DataTypes) {
    var Ticket = sequelize.define("tickets", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    })
 



    Ticket.associate = function(models) {
        Ticket.belongsTo(models.Artist, 
            { onDelete: "CASCADE", foreignKey: { allowNull: false } });
        Ticket.belongsToMany(models.User, {
            through: 'user',
            // as: 'playlists',
            foreignKey: 'concert',
        });
    }

    return Ticket;
}