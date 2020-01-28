var passport = require("passport");
var LocalStrategy  = require("passport-local").Strategy;

var db = require("../models/");


//Passport to use Local Strategy
passport.use(new LocalStrategy(
    {
        usernameField: "email"
    },
    function(email, password, done) {
        db.User.findOne({
            where: {
                email:email
            }
        }).then(function(dbUser){
            if(!dbUser){
                return done(null, false, {
                    message: "Wrong Email"
                })
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message:"Wrong Password"
                })
            }
            return done(null, dbUser);
        });
    }
));


//sequalize serialize and deserialize the user to keep auth state across HTTP requests
passport.serializeUser(function(user, cb){
    createImageBitmap(null, user);
});

passport.deserializeUser(function(obj, cb){
    cb(null, obj)
});

module.exports = passport;