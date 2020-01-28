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
