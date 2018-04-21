var express     =   require("express");
var router      =   express.Router();
var async       =   require("async");
var User        =   require("../models/user");
var Blog        =   require("../models/blog");
var middleware  =   require("../middleware");


// ===============================
// BLOG CATEGORY CONTROLLER
// ===============================

var output = {
    fashion: []
};


// ===============================
// BLOG ROUTES
// ===============================

// INDEX ROUTE - TO DISPLAY ALL BLOG POSTS AND LAY THEM CORRECTLY ON THE HOME PAGE
// -------------------------------------------------------------------------------
router.get("/fashion", function(req, res){    
    output = {    
    fashion: []
};
    async.parallel([
        function(cb) {
            Blog.find({"category": "fashion"}).sort({"created": -1}).exec(function(err, fashionBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.fashion = fashionBlogs;
                cb(null, fashionBlogs);
            }
            });
        },
    ], function(err, results){
        res.render("blogs/fashion", {       
            fashionBlogs: output.fashion
        });
    });
});
   

module.exports = router;