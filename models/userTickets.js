module.exports = function(sequelize, DataTypes){
    const UserTickets = sequelize.define(
        'user-ticket',
        {
            role: DataTypes.STRING
        }
    )
    return UserTickets
}