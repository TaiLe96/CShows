
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

const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./ticket');

const router = express.Router();

//Login
router.get('/', (req, res, next) => {
  const tickets = adminData.tickets;
  res.render('login', {
    prods: tickets,
    pageTitle: 'User Login',
    path: '/',
    hasProducts: tickets.length > 0,
    activeLogin: true,
    ticketCSS: true
  });
});
<<<<<<< HEAD

//Login
// router.get('/user/login', (req, res, next) => {
//   const tickets = adminData.tickets;
//   res.render('login', {
//     prods: tickets,
//     pageTitle: 'User Login',
//     path: '/user/login',
//     hasProducts: tickets.length > 0,
//     activeLogin: true,
//     loginCSS: true
//   });
// });

//Sign Up as Buyer
router.get('/buyer/signup', (req, res, next) => {
=======
//test
router.get('/user/login', (req, res, next) => {
>>>>>>> 087fb9944c9af8b6fbf535ef38273846f6d7b997
  const tickets = adminData.tickets;
  res.render('signup', {
    // prods: tickets,
    // pageTitle: 'Sign Up',
    path: '/buy/signup',
    hasProducts: tickets.length > 0,
    activeSignupBuyer: true,
    loginCSS: true
  });
});

//Buyer dashboard
router.get('/buyer/dashboard', (req, res, next) => {
  const tickets = adminData.tickets;
  res.render('userDashboard', {
    pageTitle: '',
    path: '/buyer/dashboard',
    hasProducts: tickets.length > 0,
    activeBuyerDashboard: true,
    dashboardCSS: true
  })
})

//Sign Up as Artist
router.get('/artist/signup', (req, res, next) => {
  const tickets = adminData.tickets;
  res.render('signupAsArtist', {
    prods: tickets,
    pageTitle: 'Sign Up',
    path: '/artist/signup',
    hasProducts: tickets.length > 0,
    activeSignupArtist: true,
    loginCSS: true
  });
});

// Register Page
router.get('/register', (req, res) => res.render('signup'));

// Resister Handle
router.post('/register', (req, res) => {
  const { user_name, email, password, location } = req.body;
  let errors = [];

  // Check required fields
  if (!user_name || !email || !password || !location) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('signup', {
      errors,
      user_name,
      email,
      password,
      location
    });
  } else {
    res.send('pass');
  }
});

module.exports = router;
