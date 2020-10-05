const Blog = require("../models/blogModel.js")
const Comment=require("../models/commentModel").commentModel;
module.exports.isauth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ msg: "unauthorized" });
    }
}
module.exports.isadmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}
module.exports.isOwner = (req, res, next) => {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.id, (err, foundBlog) => {
            if (foundBlog.owner.equals(req.user._id)) {
                next();
            }
            else {
                res.redirect("back");
            }
        })
    }
}
module.exports.isCommentOwner=(req,res,next)=>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(req.user._id.equals(foundComment.author)){
                next();
            }
            else{
                res.redirect("back");
            }
        })
        
    }
}