var mongoose=require("mongoose");
var Blog=require("./blogModel.js")
var schema_user=new mongoose.Schema({
    
    name:String,
    username:String,
    hash:String,
    salt:String,
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Blog
    }],
    
});
var User=mongoose.model("user",schema_user);
module.exports.userModel=User;