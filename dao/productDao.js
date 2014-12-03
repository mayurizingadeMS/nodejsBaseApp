var express = require('express');
var logger =require('./../logs.js').logger;
var models = require('./../model/productModel.js');

var myModel1 = models.myModel1;

//GET method - fetch all blogs from db
exports.showAllBlogs = function(callback){
	myModel1.find({}, function (err, docs) {
	  if(err){
	  	logger.error("Could not fetch blog list");
	  	callback(400, null);
	  }else{
	  	logger.info("fetched blog list");
	  	callback(null, docs);
	  }
	});
}

//GET method - fetch blogs by Id from db
exports.showBlogById = function(id , callback){
	myModel1.findOne({_id : id}, function (err, doc) {
	  if(err){
	  	logger.error("Could not fetch the blog having id : "+request.params.id);
	  	callback(400, null);
	  }else{
	  	if(doc.length == 0){
	  		logger.error("no blog found with id : "+request.params.id);
			callback(404, null);
	  	}else{
	  		logger.info("fetched the blog");
	  		callback(null, doc);
	  	}
	  }
	});
}

//POST method - insert blog in db
exports.addBlog = function(reqJSON, callback){                  //  format {"author" : "abc", "title": "pqr"}
	var blog = new myModel1();
	blog.author = reqJSON.author;
	blog.title = reqJSON.title;
	blog.save(function(err){
		if(err){
			logger.error("Could not add blog");
			callback(400, null);
		}else{
			logger.info("blog added");
			callback(null, 200);
		}
	});
}

//PUT method - update blog in db
exports.updateBlog = function(id, reqJSON, callback){
	myModel1.find({_id : id}, function(err, doc){
		if(err){
			logger.error("Could not fetch the blog having id : "+request.params.id);
	  		callback(400, null);
		}else{
			if(doc.length ==0){
				logger.error("no blog found with id : "+request.params.id);
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
						logger.info("blog updated");
						callback(null, 200);
					}
				});
			}
		}
	});
}

//DELETE method  - remove blog from db
exports.deleteBlog = function(id, callback){
	myModel1.find({_id : id}, function(err, doc){
		if(err){
			logger.error("Could not fetch the blog having id : "+request.params.id);
	  		callback(400, null);
		}else{
			if(doc.length ==0){
				logger.error("no blog found with id : "+request.params.id);
				callback(404, null);
			}else{
				myModel1.remove({_id: id}, function(err){
					if(err){
						logger.error("Could not remove blog");
						callback(400, null);
					}else{
						logger.info("blog removed");
						callback(null, 200);
					}
				});
			}
		}
	});	
}