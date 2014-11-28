var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlogPost = new Schema({
    author    : String,
    title     : String
});

exports.myModel1 = mongoose.model('blogpost', BlogPost);                  //collection name, schema_name
