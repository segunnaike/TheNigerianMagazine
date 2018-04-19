var Blog = require("../models/blog");

// all middleware codes
var middlewareObj = {};

middlewareObj.checkBlogPostOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err || !foundBlog){
                req.flash("error", "Sorry, I cannot find that article");
                res.redirect("back");
            } else {              
                            
                if(foundBlog.author.id.equals(req.user._id) || req.user.isAdmin) {
                   next();
                } else {
                    req.flash("error", "Sorry, you are not authorized to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Sorry, but you have to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login or signup to submit an article");
    res.redirect("/login");
};
    
    
module.exports = middlewareObj;