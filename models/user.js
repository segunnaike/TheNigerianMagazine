var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    isAdmin: {type: Boolean, default: false},
    firstName: String,   
    lastName: String,   
    email: String,
    username: String,
    password: String,
    profilePicture: String,
    twitterHandle: String,
    facebookPage: String,
    instagramPage: String,
    bio: String,
    joined: {type: Date, default: Date.now},    
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: "Blog" }]   
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
