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

module.exports = router;
