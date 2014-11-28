var express = require('express');
var logger =require('./../logs.js').logger;
var models = require('./../model/productModel.js');

var myModel1 = models.myModel1;


exports.showAllBlogs = function(request, response){
	console.log("In show all");
	myModel1.find({}, function (err, docs) {
	  if(err){
	  	logger.error("Could not fetch blog list");
	  	response.sendStatus(400);
	  }else{
	  	logger.info("fetched blog list");
	  	response.send(docs);
	  }
	});
}

exports.showBlogById = function(request, response){
	myModel1.find({_id : request.params.id}, function (err, doc) {
	  if(err){
	  	logger.error("Could not fetch the blog having id : "+request.params.id);
	  	response.sendStatus(400);
	  }else{
	  	if(doc.length == 0){
	  		logger.error("no blog found with id : "+request.params.id);
			response.sendStatus(404);
	  	}else{
	  		logger.info("fetched the blog");
	  		response.send(doc);
	  	}
	  }
	});
}

exports.addBlog = function(request, response){                  // {"author" : "abc", "title": "pqr"}
	var blog = new myModel1();
	blog.author = request.body.author;
	blog.title = request.body.title;
	blog.save(function(err){
		if(err){
			logger.error("Could not add blog");
			response.sendStatus(400);
		}else{
			logger.info("blog added");
			response.sendStatus(200);
		}
	});
}

exports.updateBlog = function(request, response){
	myModel1.find({_id : request.params.id}, function(err, doc){
		if(err){
			logger.error("Could not fetch the blog having id : "+request.params.id);
	  		response.sendStatus(400);
		}else{
			if(doc.length ==0){
				logger.error("no blog found with id : "+request.params.id);
				response.sendStatus(404);
			}else{
				myModel1.findByIdAndUpdate({_id: request.params.id},
				    {
				   	  author : request.body.author,
				 	  title : request.body.title
				   }, function(err){
				 	if(err){
						logger.error("Could not update blog" + err);
						response.sendStatus(400);
					}else{
						logger.info("blog updated");
						response.sendStatus(200);
					}
				});
			}
		}
	});
}

exports.deleteBlog = function(request, response){
	myModel1.find({_id : request.params.id}, function(err, doc){
		if(err){
			logger.error("Could not fetch the blog having id : "+request.params.id);
	  		response.sendStatus(400);
		}else{
			if(doc.length ==0){
				logger.error("no blog found with id : "+request.params.id);
				response.sendStatus(404);
			}else{
				myModel1.remove({_id: request.params.id}, function(err){
					if(err){
						logger.error("Could not remove blog");
						response.sendStatus(400);
					}else{
						logger.info("blog removed");
						response.sendStatus(200);
					}
				});
			}
		}
	});	
}