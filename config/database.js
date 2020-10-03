const mongoose = require("mongoose");
const 
module.exports=mongoose.connect("mongodb://localhost:27017/blogdb", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.log("Connection to database failed");
    else console.log("Connection to database established")
});