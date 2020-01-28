//require path
var path = require("path");
//check if user is logged in
var isAuthenicated = require("../config/middleware/isAuthenicated");

module.exports = function(app) {
 app.get("/", function(req,res) {
   if(req.user) {
     res.redirect("/dashboard");
   }
   res.sendfile(path.join(__dirname, "../public/assets/welcome.html"))
 });
 app.get("/login", function(req,res) {
  if(req.user) {
    res.redirect("/dashboard");
  }
  res.sendfile(path.join(__dirname, "../public/assets/login.html"))
});
app.get("/signup", function(req,res) {
  if(req.user) {
    res.redirect("/dashboard");
  }
  res.sendfile(path.join(__dirname, "../public/assets/signup.html"))
});
app.get("/artistsignup", function(req,res) {
  if(req.user) {
    res.redirect("/dashboard");
  }
  res.sendfile(path.join(__dirname, "../public/assets/signupArtist.html"))
});
app.get("/dashboard", isAuthenicated, function(req,res) {
  res.sendFile(path.join(__dirname, "../public/assets/dashboard.html"))
})

}