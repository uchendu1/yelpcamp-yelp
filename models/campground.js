// var mongoose = require("mongoose");
// var campgroundSchema = new mongoose.Schema({
//    name: String,
//    price: String,
//    image: String,
//    description: String,
//    author: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "User"
//    },
//    comments: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Comment"
//       }
//    ]
// });

// module.exports = mongoose.model("Campground", campgroundSchema);

// { aithor: 8769687696 }
// { aithor: {id: 8769687696, username: lkj;lk}}

var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);