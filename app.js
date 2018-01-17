//===============================================================
// DEPEDENCIES 
//===============================================================
const   express                 = require("express"),
        app                     = express(),
        dotenv                  = require('dotenv').config(),
        bodyParser              = require("body-parser"),
        mongoose                = require("mongoose"),
        flash                   = require("connect-flash"),
        Campground              = require("./models/campground"),
        Comment                 = require("./models/comment"),
        passport                = require("passport"),
        LocalStrategy           = require("passport-local"),
        methodOverride          = require("method-override"),
        passportLocalMongoose   = require("passport-local-mongoose"),
        User                    = require("./models/user"),
        seedDB                  = require("./seeds");
        
//===============================================================
// ROUTE DEPEDENCIES 
//===============================================================        
const   commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes = require("./routes/index");
    
//===============================================================
// MONGO SERVER CONNECTION
//===============================================================    
mongoose.connect("mongodb://localhost/yelp_camp_v10");

//===============================================================
// EXPRESS IMPLEMNTATION
//===============================================================
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//===============================================================
// SEED DB 
//===============================================================
// seedDB();
//===============================================================
// AUTH DEPEDENCIES 
//===============================================================
app.use(require("express-session")({
    secret: "Rusty is the best!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");  
   next();
});

//===============================================================
// EXPRESS ROUTE CALLS
//===============================================================
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds",campgroundRoutes);

//===============================================================
// LISTENER
//===============================================================

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});