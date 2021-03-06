const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const { static } = require('express');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
//APP CONFIG
const app = express();
app.use(methodOverride("_method"));
const PORT = 3030;
mongoose.connect("mongodb://localhost:27017/blogdb", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.log("Connection to database failed");
    else console.log("Connection to database established")
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
//host public dir
app.use(express.static("public"));


//sessionnstore
const sessionStore = new mongoStore({
    mongooseConnection: mongoose.connection,
    collection: "sessions"
});
// express session
app.use(session({
    secret: "secret message",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 12000000
    }
}));

//passport
const strategy=require("./config/passport.js")
app.use(passport.initialize());
app.use(passport.session());
//serialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
// deserializeUser
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


// MONGOOSE MODEL
const User = require("./models/userModel.js").userModel;
const Comment = require("./models/commentModel").commentModel;
const Blog = require("./models/blogModel.js").blogModel;

//importing routes
var indexRoutes=require('./routes/index.js');
var blogsRoutes=require('./routes/blogs.js');
const { deserializeUser } = require('passport');
app.use('/',indexRoutes);
app.use('/blogs',blogsRoutes);


app.all("*",(req,res)=>{
    res.send("this url cannnot be found");
})
app.listen(PORT, () =>
    console.log("SERVER IS RUNNING"));

