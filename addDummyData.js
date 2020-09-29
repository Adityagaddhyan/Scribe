var count=100;
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogdb",{useNewUrlParser:true,useUnifiedTopology:true},err=>{
    if(err)console.log("Connection to database failed1");
    else console.log("Connection to database established")
});

// MONGOOSE MODEL
var schema_blog=new mongoose.Schema({
    title:String,
    image:String,
    description:String,
    created:{type: Date, default: Date.now}
});
var Blog=mongoose.model("blog",schema_blog);


function fakedatafun(){
    const faker=require("faker");
const request = require('request');

    url="http://pixabay.com/api/?key=9862260-348d21d81ef15db5f2985e573&order=latest&per_page="+count+"&pretty=true";
request(url,function(err,res,body){
    fetched=JSON.parse(body);
    // console.log(fetched.hits);
    fetched=fetched.hits;
    fetched.forEach(function(element){
        console.log(element);
        let Urlx=element.largeImageURL;
        let Description=faker.lorem.paragraphs();
        let Title=faker.lorem.sentence();
        var newData=new Blog({title:Title,image:Urlx,description:Description});
        newData.save({w:1},(err,u)=>{
            if(err){
                console.log("Error");
                // res.redirect("/blogs");
            }
            else{
                console.log("CREATED new blog");
                // res.redirect("/blogs/"+u._id);
            }
        })
    });
});
}




fakedatafun();