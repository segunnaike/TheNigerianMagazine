
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Blog = require("../models/blog");
    

// to show form to register new user
router.get("/register", function(req, res){
   res.render("users/register"); 
});

// to handle registeration logic
router.post("/register", function(req, res){    
    var newUser = new User({        
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email,
        twitterHandle: req.body.twitterHandle,
        facebookPage: req.body.facebookPage,
        instagramPage: req.body.instagramPage,
        profilePicture: req.body.profilePicture, 
        username: req.body.username,
        bio: req.body.bio        
    });
    if(req.body.adminCode === "admin@tnm_01"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
       if (err){
           req.flash("error", err.message);
           return res.render("users/register");
       } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Congratulations " + user.firstName + ", you are now signed up!");
            res.redirect("/"); 
        });
    });   
});

// LOGIN ROUTES
// ================
// to show login form
router.get("/login", function(req, res){
   res.render("users/login"); 
});

// to handle login logic
//router.post("/login", passport.authenticate("local", {
//    successRedirect: "/",
//    failureRedirect: "/login"
//}), function(req, res){
//});

router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome, " + req.body.username + "!"
    })(req, res);
});


// LOGOUT ROUTES
// ================
// log a user out
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are now logged out!");
    res.redirect("/");    
});

// USER PROFILES
// ================
// user profile
router.get("/users/:id", function(req,res){
   User.findById(req.params.id, function(err, foundUser){
      if(err){
          req.flash("error", "Sorry, user cannot be found");
          res.redirect("back");
      }
       Blog.find().where("author.id").equals(foundUser._id).exec(function(err, blogs){
          if(err){
              req.flash("error", "no articles yet");
              res.redirect("back");             
          }
           res.render("users/show", {user: foundUser, blogs: blogs});
       });
   }); 
});




module.exports = router;