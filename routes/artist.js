const passport = require("../config/passport");
const db = require("../models");

module.exports = function(app) {

// ARTIST ROUTES
// =========================================================

    // Get all users
    app.get("/api/artists", function(req, res) {
        console.log(req.body);
        db.Artist.findAll({
            include: [db.concerts]
        })
        .then(function(dbArtist) {
            res.json(dbArtist);
        });
    }); 

    // Get one user by id and their playlists+subscriptions and return JSON
    app.get("/api/artists/:id", function(req, res) {
        console.log(req.body);
        db.Artist.findOne({
            where: { id: req.params.id },
            include:[db.Concerts] 
        }).then(function(dbArtist) {
            res.json(dbArtist);
        });
    }); 

    // Add a user
    app.post("/api/artists", function(req, res) {
        db.Artist.create({ 
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            genre: req.body.genre
        }).then(function(dbArtist) {
            res.status(200).end();
        });
    });

    // Get user data
    app.get('/api/artists_data', function(req, res) {
        if (req.artists) {
            // The user is not logged in
            res.json(req.artists);
        } else {
            res.json({});
        }
    });

};