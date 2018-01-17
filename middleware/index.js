//===============================================================
// DEPEDENCIES 
//===============================================================
var Campground              = require("../models/campground"),
    Comment                 = require("../models/comment");
//===============================================================
// MIDDLEWARE
//===============================================================
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
 // is user logged in
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campgorund not found");
            res.redirect("back");
        } else {
            // does user own campground
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else{
                req.flash("error", "You dont have the permission to do that");
                res.redirect("back");
            }
        }
    });
        
    } else {
        req.flash("error", "You must be logged in to to that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
// is user logged in
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Comment not found");
            res.redirect("back");
        } else {
            // does user own campground
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } else{
                req.flash("error", "You dont have the permission to do that");
                res.redirect("back");
            }
        }
    });
        
    } else {
        req.flash("error", "You must be logged in to to that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to to that");
    res.redirect("/login");
};

//===============================================================
// EXPORT
//===============================================================
module.exports = middlewareObj;


