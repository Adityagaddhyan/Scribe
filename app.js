const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const expressSanitizer=require("express-sanitizer");
const { static } = require('express');
//APP CONFIG
const app=express();
app.use(methodOverride("_method")); 
const PORT=3030;
mongoose.connect("mongodb://localhost:27017/blogdb",{useNewUrlParser:true,useUnifiedTopology:true},err=>{
    if(err)console.log("Connection to database failed1");
    else console.log("Connection to database established")
});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
//host public dir
app.use(express.static("public"));

// MONGOOSE MODEL
var schema_blog=new mongoose.Schema({
    title:String,
    image:String,
    description:String,
    created:{type: Date, default: Date.now}
});
var Blog=mongoose.model("blog",schema_blog);

// RESTful Routes
//INDEX
app.get("/",(req,res)=>{
    console.log("redirecting to /blogs");
    res.redirect("/blogs");
});
app.get("/blogs",(req,res)=>{
    Blog.find().limit(10).exec(function(err,result){
        if(err){
            console.log("error");
        }
        else{
            res.render("index",{blogs:result});
        }
    });
});
//NEW ROUTE
app.get("/blogs/new",(req,res)=>{
    res.render("new");
});
//CREATE
app.post("/blogs",(req,res)=>{
    console.log("POST");req.body
    var Title1=req.sanitize(req.body.title);
    var Description1=req.sanitize(req.body.description);
    var Image1=req.sanitize(req.body.image);
    var newData=new Blog({title:Title1,image:Image1,description:Description1});
    newData.save({w:1},(err,u)=>{
        if(err){
            console.log("Error");
            res.redirect("/blogs");
        }
        else{
            console.log("CREATED new blog");
            res.redirect("/blogs/"+u._id);
        }
    })
});
//SHOW ONE
app.get("/blogs/:id",(req,res)=>{
    Blog.findById(req.params.id,(err,found)=>{
        if(err){
            console.log("error in finding blog");
            res.redirect('/blogs');
        }
        else{
            console.log("VIEWING"+req.params.id)
            res.render("show",{element:found})
        }
    })
})
//EDIT
app.get("/blogs/:id/edit",(req,res)=>{
    var ID=req.params.id;
    Blog.findById(ID,(err,found)=>{
        if(err){
            console.log("cannot find the post");
            res.render("/blogs");
        }
        else{
            console.log("post EDITED")
            res.render("edit",{element:found});

        }
    });
});
//UPDATE
app.put("/blogs/:id",(req,res)=>{
    Blog.findByIdAndUpdate(req.sanitize(req.params.id),{$set: req.sanitize(req.body.updates)},{new:true},(err,updated)=>{
        if(err){
            console.log("EDIT failed");
            res.redirect("/blogs");
        }
        else{
            console.log("EDIT success");
            res.redirect("/blogs/"+req.params.id);
        }
    });
})
//DELETE
app.delete("/blogs/:id",(req,res)=>{
    Blog.findByIdAndDelete(req.params.id,err=>{
        if(err){
            console.log("unable to DELETE");
            res.redirect('/blogs');
        }
        else{
            console.log("succesfully DELETED");
            res.redirect('/blogs')
        }
    });
});
app.listen(PORT,()=>
console.log("SERVER IS RUNNING"));

