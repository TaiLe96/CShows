const passport = require("../config/passport");
const db = require("../models");


module.exports = function(app) {

// USER ROUTES

    // Get all users
    app.get("/api/users", function(req, res) {
        console.log(req.body);
        db.User.findAll({
            include: [db.Ticket]
        })
        .then(function(dbUser) {
            res.json(dbUser);
        });
    }); 

    
    app.get("/api/users/:id", function(req, res) {
        console.log(req.body);
        db.User.findOne({
            where: { id: req.params.id },
            include:[db.Ticket] 
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    }); 

  
    app.post("/api/users", function(req, res) {
        db.Users.create({ 
            username: req.body.username,
            password: req.body.password,
            location: req.body.location
        }).then(function(dbUser) {
            res.status(200).end();
        });
    });

    app.get('/api/user_data', function(req, res) {
        if (req.user) {

            res.json(req.user);
        } else {
            res.json({});
        }
    });

}