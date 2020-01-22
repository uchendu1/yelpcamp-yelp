var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [{
        name: "Cloud's Rest",
        image: "https://bit.ly/33gmeTq",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        name: "Mountain's Rest",
        image: "https://bit.ly/2M5Zno1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        name: "Flower's Rest",
        image: "https://bit.ly/2BqwlZx",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
]

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
         }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach( (seed) => {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text:"This place is great, but i wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                 campground.save();
                                console.log("Created new comment");
                            }

                        });
                }
            });

        });
    });

}
//add a few comments

module.exports = seedDB;