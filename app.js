var express      =   require("express");
var  app           =   express();
var  bodyParser    = require("body-parser");
var  mongoose       = require("mongoose");
var passport       = require("passport");
var methodOverride = require("method-override");
var flash          = require("connect-flash");
var LocalStrategy = require("passport-local");
var Campground    = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB =  require("./seeds");
var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var ejsLint = require("ejs-lint");
 



// var url = "mongodb+srv://yelpcamp-zn65v.mongodb.net/test  --username linda_1", 
// mongoose.connect("mongodb+srv://yelpcamp-zn65v.mongodb.net/test"); 
// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
mongoose.connect(
    "mongodb+srv://linda_1:lindy@yelpcamp-zn65v.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true})
    .catch((error) => {
        console.log("================",
         error)
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
console.log(__dirname);


seedDB(); 
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
})); 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//middleware 4 d nav bar items: login, etc. runs on every routes

//pass currentUser to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); 
});

// above code is added automatically to all routes. "req.user" contains d logged-in users and ids.

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//above codes are the end points
 
const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log("===========================================")
    console.log(`yelp camp server has started on port ${port}`)
    console.log("===========================================")
    
});

