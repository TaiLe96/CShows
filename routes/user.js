<<<<<<< HEAD
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
=======
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./ticket');

const router = express.Router();

router.get('/', (req, res, next) => {
  const tickets = adminData.tickets;
  res.render('userDashboard', {
    prods: tickets,
    pageTitle: 'User Dashboard',
    path: '/',
    hasProducts: tickets.length > 0,
    activeUserDashboard: true,
    ticketCSS: true
  });
});
//test
router.get('/user/login', (req, res, next) => {
  const tickets = adminData.tickets;
  res.render('login', {
    prods: tickets,
    pageTitle: 'User Login',
    path: '/user/login',
    hasProducts: tickets.length > 0,
    activeLogin: true,
    loginCSS: true
  });
});

module.exports = router;
>>>>>>> master
