const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/user');
const { forwardAuthenticated } = require('../config/auth');

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
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          name,
          email,
          password,
          location
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          location
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/user/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/user/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/userDashboard',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/user/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/user/login');
});

module.exports = router;
