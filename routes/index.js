var express=require("express");
var router=express.Router();

router.get("/", (req, res) => {
    console.log("redirecting to /blogs");
    res.redirect("/blogs");
});

module.exports=router;