var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
    
    
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.join(req.user);
    });

    app.post("api/signup", function(req, res){
        db.User.create({
            email:req.body.email,
            password:req.body.password,
            name: req.body.name,
        }).then(function(){
            res.redirect(307, "api/login");
        }).catch(function(err){
            res.status(401).json(err);
        });
    });
    
    app.post("api/artistsignup", function(req, res){
        db.Artist.create({
            email:req.body.email,
            password:req.body.password,
            name: req.body.name,
            genre: req.body.genre,
        }).then(function(){
            res.redirect(307, "api/login");
        }).catch(function(err){
            res.status(401).json(err);
        });
    });
    app.get("./logout", function(req,res){
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function(req, res){
        if(!req.user){
         res.json({});   
        } else {
            res.json({
                email: req.user.email,
                id: req.user.id,
                name: req.user.name
            })
        }
    })
};

