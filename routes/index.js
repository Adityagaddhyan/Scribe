var express=require("express");
const passport = require("passport");
const { useReducer } = require("react");
var router=express.Router();
const strategy=require("../config/passport.js")
const genPassword=require('../config/passportUtils').genPassword;
const User=require("../models/userModel").userModel;
router.get("/", (req, res) => {
    console.log("redirecting to /blogs");
    res.redirect("/blogs");
});
router.get('/login',(req,res)=>{
    console.log("redirecting to login page");
    res.render("login")
});
router.post("/login",passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}));
router.get("/register",(req,res)=>{
    res.render("register");
})
router.post("/register",(req,res)=>{
    let salthash=genPassword(req.body.password);
    var Salt=salthash.salt;
    var Hash=salthash.hash;
    var newUser=new User({
        username:req.body.username,
        name:req.body.name,
        salt:Salt,
        hash:Hash,
    });
    newUser.save().then(function(user){
        console.log(user);
        console.log("new user registered");
    });
});


module.exports=router;