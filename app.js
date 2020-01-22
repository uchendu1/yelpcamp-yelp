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
 


 
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
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
 
const port = 3000
app.listen(port, () =>{
    console.log(`yelp camp server has started on port ${port}`)
});

// app.get("/", function(req, res){
//     res.render("campgrounds/landing");
// }); 

// app.get("/campgrounds", function(req, res){
//     // console.log(req.user);
//     //get all campgrounds from DB
//     Campground.find({}, function(err, allCampgrounds){
//         if(err){
//             console.log(err);  
//         } else {
//             res.render("campgrounds/index", {campgrounds:allCampgrounds});

//             // res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
//         }
//     });
// });      

//     app.post("/campgrounds", function(req, res){
//         //get data from form and add to campgrounds array
//         var name = req.body.name;
//         var image = req.body.image;
//         var desc = req.body.description;
//         var newCampground = {name: name, image: image, description: desc}
//         // campgrounds.push(newCampground);
//         // Create a new campground and save to db
//         Campground.create(newCampground, function(err, newlyCreated){
//             if(err){
//                 console.log(err);
//             } else {
//                 res.redirect("/campgrounds");

//             }
//         });

//     });
// //NEW - 
// const campgroundRoutes = require('./routes/campgrounds')
//     app.get("/campgrounds/", campgroundsRoutes);

//     //SHOW - shows more info about one campgrounds
//     app.get("/campgrounds/:id", function(req, res){
//      // find the campground with the provided ID

//         Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {

//             res.render("campgrounds/show", {campground: foundCampground});
//         } 
//     });
// });  

//  //EDIT CAMPGROUND ROUTES
//  app.get("/:id/edit", function(req, res){
//      Campground.findById(req.params.id, function(err, foundCampground){
//          if(err){
//              res.redirect("/campgrounds")
//          } else {
//             res.render("campgrounds/edit", {campground: foundCampground});
//          }
//      });
// });
 
// app.put(":/id", function(req, res){
//     //find and update the correct CG
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//         if(err){
//             res.redirect("/campground");
//         } else {
//             res.redirect("/campground/" + req.params.id);
 
//         }
//     });
// });

// // ====================
// app.get("/campgrounds/:id/comments/new", isloggedIn, function(req, res){
//     //find campground by id. note the campground in the function below    is the one from the DB.
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("comments/new", {campground: campground});
//         }
//     })
// });

// app.post("/campgrounds/:id/comments", isloggedIn, function(req, res){
//     //lookup campground using id
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//             res.redirect("/campgrounds");
//         } else {
//             Comment.create(req.body.comment, function(err, comment){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     campground.comments.push(comment);
//                     campground.save();
//                     console.log('campground', campground)
//                     res.redirect('/campgrounds/' + campground._id);
//                 }
//             });
//         }
//     })
//     //create new comment
//     //   connect new comment to campground
//     //redirect campground show page  
// }); 
// // ==========
// // AUTH ROUTE
// // =========
// // show register form
// app.get("/register", function(req, res){
//     res.render("register");
// });

// //handle sign up logic
// app.post("/register", function(req, res){
//  var newUser = new User({username: req.body.username});
//  User.register(newUser, req.body.password, function(err, user){
//      if(err){
//          console.log(err);
//          return res .render("register");
//      }  
//      //local is the social-media, can be a facebook, twitter, imstagram etc.
//      passport.authenticate("local")(req, res, function(){
//          res.redirect("/campgrounds");
//      });
//  });
// });    
  
// // show login form
// app.get("/login", function(req, res){
//     res.render("login")
// });
// //handling login logic
// // app.post("/login", middleware, callback)
// app.post("/login", 
//     passport.authenticate("local", {
//         successRedirect: "/campgrounds",
//         failureRedirect: "/login"
//     }),
//   function(req, res){
    
// });




//  //UPDATE CAMPGROUND ROUTES


// //logic route
// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/campgrounds");
// });


// //middleware
// function isloggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }




// // SCHEMA SETUP
// var campgroundSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String
// });
// var campground = mongoose.model("Campground", campgroundSchema);

// campground.create(
//     {
//         name: "Mount everest",
//         image: "https://bit.ly/2mhtWwi",
//         description: "This is the highest mountain in the world"

//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground); 
//         }
//     });

// var campgrounds = [
//     {name: "Mount Kilimanjaro", image: "https://bit.ly/2mmx5uR"},
//     {name: "Mount everest", image: "https://bit.ly/2mhtWwi"},
//     {name: "Mount chad", image: "https://bit.ly/2lX14 tc"},
//     {name: "Mount Kilimanjaro", image: "https://bit.ly/2mmx5uR"},
//     {name: "Mount everest", image: "https://bit.ly/2mhtWwi"},
//     {name: "Mount chad", image: "https://bit.ly/2lX14 tc"}
// ];  