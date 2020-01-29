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
  if (!user_name || !email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('signup', {
      errors,
      name,
      email,
      password
    });
  } else {
    res.send('pass');
  }
});

module.exports = router;
