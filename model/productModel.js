var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Define blog schema
var BlogPost = new Schema({
    author    : String,
    title     : String
});

exports.myModel1 = mongoose.model('blogpost', BlogPost);                  // parameters collection name, schema_name
