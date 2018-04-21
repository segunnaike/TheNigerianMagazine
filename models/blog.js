var mongoose = require("mongoose");


var blogSchema = new mongoose.Schema({
    title: String,
    imageOne: String,
    imageTwo: String,
    imageThree: String,
    body: String,  
    created: {type: Date, default: Date.now},
    category: String, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },
        firstName: String,
        lastName: String,
        profilePicture: String        
    }
});

module.exports = mongoose.model("Blog", blogSchema);
