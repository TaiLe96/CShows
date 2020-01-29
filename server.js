/**
 * Node.js Program Lifecycle
 * server.js --> Start Script --> Parse Code, Register Variables & Functions --> Event loop (The node Appliction) --> Keep on running as long as there are event listeners registerd
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ehbs = require('express-handlebars');
var passport = require('./config/passport');
var session = require('express-session');




const PORT = process.env.PORT || 3000;
// setup middleware
const app = express();


// setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// express static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//passport
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//routes
require("./routes/passport-routes")(app);
require("./routes/html-routes")(app)


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
//const ticket = require('./routes/ticket');
// import shop routes
//const userRoutes = require('./routes/user');


var db = require('./models');



app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// Setup Handlebars engine
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log('Server listening on: http://localhost: ' + PORT);
  });
});
