var mongoose = require("mongoose");
var mongooseSlugPlugin = require("mongoose-slug-plugin");
var moment = require("moment");


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

blogSchema.plugin(mongooseSlugPlugin, {
    tmpl: "<%=category%>'/'<%=moment(created).format('YYYY-MM-DD')%>'/'<%=title%>",
    locals: { moment }
});

module.exports = mongoose.model("Blog", blogSchema);
