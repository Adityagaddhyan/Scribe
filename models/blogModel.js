const { commerce } = require("faker");
var mongoose=require("mongoose");
var Comment=require("./commentModel");
var schema_blog=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:String,
    image:String,
    description:String,
    created:{type: Date, default: Date.now},
    likes: Number,
    dislikes: Number,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }]
});
var Blog=mongoose.model("blog",schema_blog);
module.exports.blogModel=Blog;