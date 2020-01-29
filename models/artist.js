const bcrypt = require("bcryptjs");
// Creating our Artist model

module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

//method checking encrypted password
  Artist.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  //auto hash artists password
  Artist.addHook("beforeCreate", function(artist) {
    artist.password = bcrypt.hashSync(artist.password, bcrypt.genSaltSync(10), null);
  });
  return Artist;
};
