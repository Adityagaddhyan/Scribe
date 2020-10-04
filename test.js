var mongoose = require("mongoose");
var User = require("./models/userModel.js").userModel;
const Comment = require("./models/commentModel").commentModel;
const id = "5f775afb571f51190ec3cfde";
const express = require("express")
var Blog = require("./models/blogModel");
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost:27017/blogdb", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.log("Connection to database failed");
    else console.log("Connection to database established")
});
Blog.findById(id)
    .populate("comments")
    .exec(function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/show", {
                blog
            });
        }
    });