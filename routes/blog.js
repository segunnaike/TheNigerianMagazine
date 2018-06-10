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
    fashion: [],
    opinions: [],
    politics: [],
    news: [],
    religion: [],
    entertainment: [],
    business: [],
    culture: [],
    headlines: []
};


// ===============================
// BLOG ROUTES
// ===============================

// INDEX ROUTE - TO DISPLAY ALL BLOG POSTS AND LAY THEM CORRECTLY ON THE HOME PAGE
// -------------------------------------------------------------------------------
router.get("/", function(req, res){    
    output = {
    sports: [],
    fashion: [],
    opinions: [],
    politics: [],
    news: [],
    religion: [],
    entertainment: [],
    business: [],
    culture: [],
    headlines: []
};
    async.parallel([
        function(cb) {
            Blog.find({"category": "headlines"}).sort({"created": -1}).limit(1).exec(function(err, headlinesBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.headlines = headlinesBlogs;
                cb(null, headlinesBlogs);
            }
            });
        }, 
        
        function(cb){
            Blog.find({"category": "sports"}).sort({"created": -1}).limit(1).exec(function(err, sportsBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.sports = sportsBlogs;
                cb(null, sportsBlogs);
            }
            });
        },
        function(cb) {
            Blog.find({"category": "fashion"}).sort({"created": -1}).limit(1).exec(function(err, fashionBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.fashion = fashionBlogs;
                cb(null, fashionBlogs);
            }
            });
        },
        function(cb) {
            Blog.find({"category": "opinions"}).sort({"created": -1}).limit(1).exec(function(err, opinionsBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.opinions = opinionsBlogs;
                cb(null, opinionsBlogs);
            }
            });
        }, 
        function(cb) {
            Blog.find({"category": "politics"}).sort({"created": -1}).limit(1).exec(function(err, politicsBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.politics = politicsBlogs;
                cb(null, politicsBlogs);
            }
            });
        }, 
        function(cb) {
            Blog.find({"category": "news"}).sort({"created": -1}).limit(1).exec(function(err, newsBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.news = newsBlogs;
                cb(null, newsBlogs);
            }
            });
        }, 
        function(cb) {
            Blog.find({"category": "religion"}).sort({"created": -1}).limit(1).exec(function(err, religionBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.religion = religionBlogs;
                cb(null, religionBlogs);
            }
            });
        },
        function(cb) {
            Blog.find({"category": "business"}).sort({"created": -1}).limit(1).exec(function(err, businessBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.business = businessBlogs;
                cb(null, businessBlogs);
            }
            });
        },
        
           function(cb) {
            Blog.find({"category": "culture"}).sort({"created": -1}).limit(1).exec(function(err, cultureBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.culture = cultureBlogs;
                cb(null, cultureBlogs);
            }
            });
        },
        
           function(cb) {
            Blog.find({"category": "entertainment"}).sort({"created": -1}).limit(1).exec(function(err, entertainmentBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.entertainment = entertainmentBlogs;
                cb(null, entertainmentBlogs);
            }
            });
        },        
        ], function(err, results){
        res.render("index", {  // This is the landing page
            sportsBlogs: output.sports,
            politicsBlogs: output.politics,
            newsBlogs: output.news,
            fashionBlogs: output.fashion,
            opinionsBlogs: output.opinions,
            religionBlogs: output.religion,
            entertainmentBlogs: output.entertainment,
            cultureBlogs: output.culture,
            businessBlogs: output.business,
            headlinesBlogs: output.headlines
        });
    });
});

//


//FASHION

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
   



//HEADLINES

router.get("/headlines", function(req, res){    
    output = {    
    headlines: []
};
    async.parallel([
        function(cb) {
            Blog.find({"category": "headlines"}).sort({"created": -1}).exec(function(err, headlinesBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.headlines = headlinesBlogs;
                cb(null, headlinesBlogs);
            }
            });
        },
    ], function(err, results){
        res.render("blogs/headlines", {       
            headlinesBlogs: output.headlines
        });
    });
});

// TO ADD A NEW BLOG POST
// ----------------------

// CREATE ROUTE

// this is to show the form to create a new blog post to the user
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("blogs/new");
});

router.post("/", middleware.isLoggedIn, function(req, res){
    // this is to actually create the blog post
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    var title       = req.body.title;
    var imageOne    = req.body.imageOne;
    var imageTwo    = req.body.imageTwo;
    var imageThree  = req.body.imageThree;
    var body        = req.body.body;
    var category    = req.body.category;
    var author      = {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        profilePicture: req.user.profilePicture
    };
    var newBlog = {title: title, imageOne: imageOne, imageTwo: imageTwo, imageThree: imageThree, body: body, category: category, author: author};
    Blog.create(newBlog, function(err, newlyCreatedBlog){
       if(err){
           res.render("blogs/new");
       } else {
           // once created, you will be redirect to the index page, or
           //to the profile page of the user who created the blog post
           req.flash("success", "Congratulations! You have added a new article.");
           res.redirect("/");
       }
        
    });
    
});

// SHOW ROUTE
// ----------
// this shows more info about a particular blog post, the continue reading logic
router.get("/:slug", function(req, res){
   Blog.findOne({slug: req.params.slug}, function(err, foundBlog){
       if(err || !foundBlog){
//           req.flash("error", "Oopps...something went wrong, please try again");
           res.redirect("back");
       } else {
           res.render("blogs/show", {blog: foundBlog});
       }
   });     
});

// EDIT ROUTE
// ----------
// to edit a blog post, this is available only to the owner of the post or the admin
// authorization: is user logged in? does user own the blogpost? 
//if yes, then you can edit, otherwise, you can't unless you're an admin.
router.get("/:id/edit", middleware.checkBlogPostOwnership, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
           req.flash("error", "Sorry, you are not authorized to do that");
           res.redirect("back");
       } else {
        res.render("blogs/edit", {blog: foundBlog});
       }
    });
});


// UPDATE ROUTE
// ------------
// this is to actualy handle the edit logic, available only to the owner of the post or the admin
router.put("/:id", middleware.checkBlogPostOwnership, function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            req.flash("error", "ooppss...something went wrong");
            res.redirect("/");
        } else {
            req.flash("success", "You have successfully updated the article");
            res.redirect("/" + req.params.id);
        }
    });
});

// DELETE ROUTE
// ------------
router.delete("/:id", middleware.checkBlogPostOwnership, function(req, res){
    // to delete a blog post, available only to post owner or the admin
    //destroy blog     // redirect back to the index page
    Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("error", "Sorry, you are not authorized to do that");
           res.redirect("back");
       } else {
           req.flash("success", "Article deleted successfully!");
           res.redirect("/");
       }
    });
});




module.exports = router;