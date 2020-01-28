const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const tickets = [];

// /user/purchaseTicket => GET
router.get('/purchaseTicket', (req, res, next) => {
  res.render('purchaseTicket', {
    pageTitle: 'Purchase Tickt',
    path: '/user/purchaseTicket',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /user/purchaseTicket => POST
router.post('/purchaseTicket', (req, res, next) => {
  tickets.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.tickets = tickets;
