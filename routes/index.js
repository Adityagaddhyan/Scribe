var express=require("express");
const passport = require("passport");
const { useReducer } = require("react");
var router=express.Router();
const expressSanitizer = require("express-sanitizer");
const strategy=require("../config/passport.js")
const genPassword=require('../config/passportUtils');
const User=require("../models/userModel").userModel;
const bodyParser=require("body-parser");
router.use(expressSanitizer());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}));
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
    console.log(req.body.password);
    let Hash=genPassword(req.body.password);
    Hash.then(function(hashfinal){
        var newUser=new User({
            username:req.body.username,
            name:req.body.name,
            hash:hashfinal,
        });
        console.log(newUser);
        newUser.save().then(function(user){
            console.log("new user registered");
        });
    })
    // console.log(Hash);
    res.redirect("/")
    
});


module.exports=router;