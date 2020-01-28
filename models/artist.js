// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our Artist model
module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("artist", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
  // Creating a custom method for our Artist model. This will check if an unhashed password entered by the Artist can be compared to the hashed password stored in our database
  Artist.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the Artist Model lifecycle
  // In this case, before a Artist is created, we will automatically hash their password
  Artist.addHook("beforeCreate", function(artist) {
    artist.password = bcrypt.hashSync(artist.password, bcrypt.genSaltSync(10), null);
  });
  return Artist;
};
