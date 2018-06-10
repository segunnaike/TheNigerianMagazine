//APPLICATION SETUP

var expressSanitizer    =   require("express-sanitizer"),
    methodOverride      =   require("method-override"),  
    bodyParser          =   require("body-parser"),
    mongoose            =   require("mongoose"),
    flash               =   require("connect-flash"),
    passport            =   require("passport"),
    LocalStrategy       =   require("passport-local"),
    express             =   require("express"), 
    async               =   require("async"),
    app                 =   express();


// requiring models 
var User = require("./models/user");
var Blog = require("./models/blog");

//requiring config file
var config = require("./config/config");

// requiring routes
var indexRoute = require ("./routes/index");
//var headlinesRoute = require("./routes/headlines");
//var fashionRoute = require("./routes/fashion");
var blogRoute = require("./routes/blog");
//var latestRoute = require("./routes/latest");


var isDev = process.env.NODE_ENV !== "production";
var port  = process.env.PORT || 8080;

// APPLICATION CONFIG
//mongoose.connect("mongodb://localhost/tnm_blog_app"); //used to connect to our database
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://olusegunnaike:Nna3k6li5!@18.204.248.137/tnm_blog_app");
app.locals.moment = require("moment"); //used to format dates
app.set("view engine", "ejs"); //used to create page templates
app.use(express.static(__dirname + "/public")); //used to tell the app to use the public directory
app.use(bodyParser.urlencoded({extended: true})); //used to tell the app to use content from the body of the application
app.use(expressSanitizer()); // this line must go after the body parser line above
app.use(methodOverride("_method")); //used to override HTTP methods
app.use(flash());


// PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "Renny, Nancy, Nathan, Neil, my lovies",
    resave: false,
    saveUninitialized: false    
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();    
});

app.use(function(req, res, next){
    res.locals.title = "The Nigerian Magazine";
    next();
});

app.use(indexRoute);
//app.use(headlinesRoute);
//app.use(fashionRoute);
app.use(blogRoute);
//app.use(latestRoute);


// app.config
// ==========
app.listen(8080, function(){
    console.log("The Nigerian Magazine App is being served here!");
});