var mongoose = require('mongoose')
var commentSchema = require('./comment')
var campgroundSchema = require('./campground')

module.exports = {
    Comment: mongoose.model("Comment", commentSchema),
    Campground: mongoose.model("Campground", campgroundSchema),
}