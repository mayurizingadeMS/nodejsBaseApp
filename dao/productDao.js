var express = require('express');
var logger =require('./../logs.js').logger;
var models = require('./../model/productModel.js');

var myModel1 = models.myModel1;

//GET method - fetch all blogs from db
exports.showAllBlogs = function(callback){
	logger.debug("In productDao showAllBlogs");
	myModel1.find({}, function (err, docs) {
	  if(err){
	  	logger.error("Could not fetch blog list");
	  	callback(400, null);
	  }else{
	  	logger.info("fetched blog list from database");
	  	callback(null, docs);
	  }
	});
}

//GET method - fetch blogs by Id from db
exports.showBlogById = function(id , callback){
	logger.debug("In productDao showBlogById");
	myModel1.findOne({_id : id}, function (err, doc) {
	  if(err){
	  	logger.error("Could not fetch the blog having id : "+id);
	  	callback(400, null);
	  }else{
	  	if(doc.length == 0){
	  		logger.error("no blog found with id : "+id);
			callback(404, null);
	  	}else{
	  		logger.info("fetched the blog details from database for blog Id : "+id);
	  		callback(null, doc);
	  	}
	  }
	});
}

//POST method - insert blog in db
exports.addBlog = function(reqJSON, callback){                  //  format {"author" : "abc", "title": "pqr"}
logger.debug("In productDao addBlog");
	var blog = new myModel1();
	blog.author = reqJSON.author;
	blog.title = reqJSON.title;
	blog.save(function(err){
		if(err){
			logger.error("Could not add blog");
			callback(400, null);
		}else{
			logger.info("blog added in database");
			callback(null, 200);
		}
	});
}

//PUT method - update blog in db
exports.updateBlog = function(id, reqJSON, callback){
	logger.debug("In productDao updateBlog");
	myModel1.find({_id : id}, function(err, doc){
		if(err){
			logger.error("Could not fetch the blog having id : "+id);
	  		callback(400, null);
		}else{
			if(doc.length ==0){
				logger.error("no blog found with id : "+id);
				callback(404, null);
			}else{
				myModel1.findByIdAndUpdate({_id: id},
				    {
				   	  author : reqJSON.author,
				 	  title : reqJSON.title
				   }, function(err){
				 	if(err){
						logger.error("Could not update blog" + err);
						callback(400, null);
					}else{
						logger.info("blog updated in database having id : "+id);
						callback(null, 200);
					}
				});
			}
		}
	});
}

//DELETE method  - remove blog from db
exports.deleteBlog = function(id, callback){
	logger.debug("In productDao deleteBlog");
	myModel1.find({_id : id}, function(err, doc){
		if(err){
			logger.error("Could not fetch the blog having id : "+id);
	  		callback(400, null);
		}else{
			if(doc.length ==0){
				logger.error("no blog found with id : "+id);
				callback(404, null);
			}else{
				myModel1.remove({_id: id}, function(err){
					if(err){
						logger.error("Could not remove blog " + err);
						callback(400, null);
					}else{
						logger.info("blog removed from database having id : "+id);
						callback(null, 200);
					}
				});
			}
		}
	});	
}