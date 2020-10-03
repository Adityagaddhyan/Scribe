const passport=require("passport");
const localStrategy=require("passport-local");
const bcrypt=require("bcrypt");

const strategy=new localStrategy(
    (username,password,done)=>{
        username.findOne({username: username},function(err,user){
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

module.exports.strategy=strategy;