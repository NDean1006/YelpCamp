var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor amet chillwave brunch hell of farm-to-table humblebrag, thundercats chambray austin. Bushwick green juice lo-fi humblebrag ethical wolf live-edge meh, occupy skateboard fashion axe fam fixie chartreuse glossier. Taxidermy gochujang marfa coloring book, paleo austin pork belly portland franzen vaporware. Small batch taiyaki try-hard squid whatever. Air plant hell of truffaut crucifix authentic mixtape drinking vinegar coloring book kickstarter. Roof party four loko hammock food truck, occupy actually master cleanse crucifix craft beer. Tousled seitan bespoke beard, put a bird on it occupy polaroid vape irony twee pabst portland tattooed copper mug."
    },
    {
        name: "Desert Mesa", 
        image: "https://images.unsplash.com/photo-1430000589629-f04107b5597c?auto=format&fit=crop&w=967&q=80",
        description: "Lorem ipsum dolor amet chillwave brunch hell of farm-to-table humblebrag, thundercats chambray austin. Bushwick green juice lo-fi humblebrag ethical wolf live-edge meh, occupy skateboard fashion axe fam fixie chartreuse glossier. Taxidermy gochujang marfa coloring book, paleo austin pork belly portland franzen vaporware. Small batch taiyaki try-hard squid whatever. Air plant hell of truffaut crucifix authentic mixtape drinking vinegar coloring book kickstarter. Roof party four loko hammock food truck, occupy actually master cleanse crucifix craft beer. Tousled seitan bespoke beard, put a bird on it occupy polaroid vape irony twee pabst portland tattooed copper mug."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor amet chillwave brunch hell of farm-to-table humblebrag, thundercats chambray austin. Bushwick green juice lo-fi humblebrag ethical wolf live-edge meh, occupy skateboard fashion axe fam fixie chartreuse glossier. Taxidermy gochujang marfa coloring book, paleo austin pork belly portland franzen vaporware. Small batch taiyaki try-hard squid whatever. Air plant hell of truffaut crucifix authentic mixtape drinking vinegar coloring book kickstarter. Roof party four loko hammock food truck, occupy actually master cleanse crucifix craft beer. Tousled seitan bespoke beard, put a bird on it occupy polaroid vape irony twee pabst portland tattooed copper mug."
    }
];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
