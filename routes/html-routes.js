const path = require('path');
var isAuth = require('../config/middleware/isAuthenicated');
const express = require('express');

module.exports = function(app) {

    app.get('/', (req, res) => {
      //if logged in is a user
      if (req.user) {
        res.redirect('/user');
      
      } 
      //if logged in is an artist
      else if (req.artist) {
        res.redirct('/artist')
      }else {
        res.render('login');
      }
    });

    app.get('/user_profile',isAuth, (req,res) => {
      res.render('user_dash');
    });

    app.get("/artist_profile/", isAuth, function(req, res) {
      res.render('artist_dash');
    }); 
};
