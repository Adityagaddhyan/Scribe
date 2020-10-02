var mongoose=require("mongoose");
var Blog=require("./blogModel.js")
var User=require("./userModel.js")
var schema_comment=new mongoose.Schema({
    text:String,
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Blog,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
    },
});
var Comment=mongoose.model("comment",schema_comment);
module.exports.userComment=Comment;