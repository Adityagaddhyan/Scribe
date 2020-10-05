var express = require("express");
var router = express.Router();
var Blog = require("../models/blogModel");
var User = require("../models/userModel.js").userModel;
const expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
const { populate } = require("../models/blogModel");
mongoose.set('useFindAndModify', false);
var MongoClient = require('mongodb').MongoClient;
var isauth = require("../config/isauth").isauth;
router.use(expressSanitizer());
//NEW ROUTE
router.get("/new", isauth, (req, res) => {
    res.render("new", { curUser: req.user });
});
//CREATE
router.get("/", async (req, res) => {
    await Blog.find({}).limit(10).exec(function (err, result) {
        if (err) {
            console.log("error");
        }
        else {
            res.render("../views/index", { blogs: result, curUser: req.user });
        }

    });

});
//post new blog

router.post("/", isauth, (req, res) => {
    console.log("POST"); req.body
    var Title1 = req.sanitize(req.body.title);
    var Description1 = req.sanitize(req.body.description);
    var Image1 = req.sanitize(req.body.image);
    var newData = new Blog({ title: Title1, image: Image1, description: Description1 });
    newData.save({ w: 1 }, (err, u) => {
        if (err) {
            console.log("Error");
            res.redirect("/");
        }
        else {
            console.log("CREATED new blog");
            console.log(u._id);
            res.redirect("/blogs/" + u._id);
        }
    })
});
//SHOW ONE
router.get("/:id", (req, res) => {
    var comment_ = [];
    console.log(req.params.id);
    Blog.findById(req.params.id).exec((err, found) => {
        // console.log(found.comments);
        if (err) {
            console.log("error in finding blog");
            res.redirect('/blogs');
        }
        else {
            Blog.findById(req.params.id)
                .populate("comments")
                .exec(function (err, blogs) {
                    // console.log(blogs);
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(blogs.comment.length;
                        res.render("show", { element: blogs, curUser: req.user });
                    }
                });
        }
    })
})
//EDIT
router.get("/:id/edit", isauth, (req, res) => {
    var ID = req.params.id;
    Blog.findById(ID, (err, found) => {
        if (err) {
            console.log("cannot find the post");
            res.redirect("/blogs");
        }
        else {
            console.log("post EDIT page")
            res.render("edit", { element: found, curUser: req.user });

        }
    });
});
//new comment
const Comment = require("../models/commentModel").commentModel;
router.post("/:id/newcomment", isauth, (req, res) => {
    console.log(req.body.comment, "new comment")
    var comment_ = req.body.comment;
    var newComment = new Comment({
        text: req.body.comment,
        author: req.user._id,
        authorName: User.findOne({ _id: req.user.id }).name,
        authorName:req.user.name
    });
    newComment.save().then((result) => {
        console.log(result);
        Blog.findById(req.params.id, (err, blog) => {
            blog.comments.push(result._id);
            blog.save();
        });
    })
    res.redirect("/blogs/" + req.params.id);

})
//UPDATE
router.put("/:id", (req, res) => {
    Blog.findByIdAndUpdate(req.sanitize(req.params.id), { $set: req.body.updates }, { returnOriginal: false }, (err, updated) => {
        if (err) {
            console.log("EDIT failed");
            res.redirect("/blogs");
        }
        else {
            console.log("EDIT success");
            res.redirect("/blogs/" + req.params.id);
        }
    });
})
//DELETE
router.delete("/:id", isauth, (req, res) => {
    Blog.findByIdAndDelete(req.params.id, err => {
        if (err) {
            console.log("unable to DELETE");
            res.redirect('/blogs');
        }
        else {
            console.log("succesfully DELETED");
            res.redirect('/blogs')
        }
    });
});

module.exports = router;