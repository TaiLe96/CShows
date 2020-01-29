const passport = require("../config/passport");
const db = require("../models");

module.exports = function(app) {

// ARTIST ROUTES

    // Get all artists
    app.get("/api/artists", function(req, res) {
        console.log(req.body);
        db.Artist.findAll({
            include: [db.concerts]
        })
        .then(function(dbArtist) {
            res.json(dbArtist);
        });
    }); 

    app.get("/api/artists/:id", function(req, res) {
        console.log(req.body);
        db.Artist.findOne({
            where: { id: req.params.id },
            include:[db.Concerts] 
        }).then(function(dbArtist) {
            res.json(dbArtist);
        });
    }); 

    // Add an artist
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

    app.get('/api/artists_data', function(req, res) {
        if (req.artists) {
        
            res.json(req.artists);
        } else {
            res.json({});
        }
    });

};