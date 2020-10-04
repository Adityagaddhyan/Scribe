var mongoose=require("mongoose");
var User=require("./userModel.js")
var schema_comment=new mongoose.Schema({
    text:String,
    created:{type: Date, default: Date.now},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
var Comment=mongoose.model("comment",schema_comment);
module.exports.commentModel=Comment;