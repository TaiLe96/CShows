/**
 * Node.js Program Lifecycle
 * server.js --> Start Script --> Parse Code, Register Variables & Functions --> Event loop (The node Appliction) --> Keep on running as long as there are event listeners registerd
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ehbs = require('express-handlebars');

var passport = './config/passport';
var session = require('express-session');
require('./config/passport');
// setup middleware
const app = express();
const PORT = process.env.PORT || 3000;
var db = require('./models');

// setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// express static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//passport
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
//app.use(passport.initialize());
//app.use(passport.session());


// Register Handlebars Engine
app.engine(
  'hbs',
  ehbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');
app.set('views', 'views');
// add purchase ticket
const adminData = require('./routes/ticket');
// import shop routes
const userRoutes = require('./routes/user');



app.use('/user', adminData.routes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// Setup Handlebars engine
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log('Server listening on: http://localhost: ' + PORT);
  });
});
