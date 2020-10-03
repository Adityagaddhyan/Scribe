var mongoose=require("mongoose");
var Blog=require("./blogModel.js")
//no salt is required because ... The rest of the hash string includes the cost parameter,
// a 128-bit salt (Radix-64 encoded as 22 characters), and 184 bits of the resulting hash value 
//(Radix-64 encoded as 31 characters)
var schema_user=new mongoose.Schema({
    name:String,
    username:String,
    hash:String,
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Blog
    }],
    
});
var User=mongoose.model("user",schema_user);
module.exports.userModel=User;