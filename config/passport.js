const passport=require("passport");
const localStrategy=require("passport-local");
const bcrypt=require("bcrypt");
var User=require("../models/userModel").userModel;
var mongoose=require("mongoose"),connection;
if(!connection){
    mongoose.connect("mongodb://localhost:27017/blogdb",{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (err) console.log("Connection to database failed");
        else console.log("Connection to database established")
    })
}
const strategy=new localStrategy(
    (Username,password,done)=>{
        User.findOne({username: Username},function(err,user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null,false,{message:"Incorrect username"});
            }
            bcrypt.compare(password,user.hash,(err,result)=>{
                if(err){
                    done(null,false,{message:"Incorrect password"});
                }
                else{
                    done(null,user,{message:"Logging in"});
                }
            });
        });
    }
);
passport.use(strategy);