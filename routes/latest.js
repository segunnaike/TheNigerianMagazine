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
    sports: [],    
    food: [],
    politics: [],
    news: [],
    religion: [], 
    culture: []  
};


// ===============================
// BLOG ROUTES
// ===============================

// INDEX ROUTE - TO DISPLAY ALL BLOG POSTS AND LAY THEM CORRECTLY ON THE HOME PAGE
// -------------------------------------------------------------------------------
router.get("/", function(req, res){    
    output = {
    sports: [],    
    food: [],
    politics: [],
    news: [],
    religion: [],    
    culture: []   
};
    async.parallel([
        function(cb){
            Blog.find({"category": "sports"}).sort({"created": -1}).exec(function(err, sportsBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.sports = sportsBlogs;
                cb(null, sportsBlogs);
            }
            });
        },
        function(cb) {
            Blog.find({"category": "food"}).sort({"created": -1}).exec(function(err, foodBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.food = foodBlogs;
                cb(null, foodBlogs);
            }
            });
        }, 
        function(cb) {
            Blog.find({"category": "politics"}).sort({"created": -1}).exec(function(err, politicsBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.politics = politicsBlogs;
                cb(null, politicsBlogs);
            }
            });
        }, 
        function(cb) {
            Blog.find({"category": "news"}).sort({"created": -1}).exec(function(err, newsBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.news = newsBlogs;
                cb(null, newsBlogs);
            }
            });
        }, 
        function(cb) {
            Blog.find({"category": "religion"}).sort({"created": -1}).exec(function(err, religionBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.religion = religionBlogs;
                cb(null, religionBlogs);
            }
            });
        },

        
           function(cb) {
            Blog.find({"category": "culture"}).sort({"created": -1}).exec(function(err, cultureBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.culture = cultureBlogs;
                cb(null, cultureBlogs);
            }
            });
        },
        
        ], function(err, results){
        res.render("blogs/latest", {  
            sportsBlogs: output.sports,
            politicsBlogs: output.politics,
            newsBlogs: output.news,         
            religionBlogs: output.religion,            
            foodBlogs: output.food,            
            cultureBlogs: output.culture            
        });
    });
});

module.exports = router;