var express = require('express');
var router = express.Router();
var logger =require('./logs.js').logger;
var dao = require('./dao/productDao.js');

//REST API

router.get('/blogsAPI', function(request, response){
	dao.showAllBlogs(function(error, docs){
		if(error){
			logger.error(error.statusCode);
			response.sendStatus(error);
		}else{
			response.sendStatus(docs);
		}
	});
});

router.get('/blogAPI/:id', function(request, response){
	var id = request.params.id;
	dao.showBlogById(id, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.sendStatus(error);
		}else{
			response.sendStatus(doc);
		}
	});
});

router.post('/blogAPI', function(request, response){
	var reqJSON = request.body;
	dao.addBlog(reqJSON, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.sendStatus(error);
		}else{
			response.sendStatus(doc);
		}
	});
});

router.put('/blogAPI/:id', function(request, response){
	var id = request.params.id;
	var reqJSON = request.body;
	dao.updateBlog(id, reqJSON, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.sendStatus(error);
		}else{
			response.sendStatus(doc);
		}
	});
});

router.delete('/blogAPI/:id', function(request, response){
	var id = request.params.id;
	dao.deleteBlog(id, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.sendStatus(error);
		}else{
			response.sendStatus(doc);
		}
	});
});



//for UI integration

router.get('/blogs', function(request, response){
	dao.showAllBlogs(function(error, docs){
		if(error){
			logger.error(error.statusCode);
			response.send(error);
		}else{
			response.render('getAllBlogs',{
				data : docs
			});
		}
	});
});

module.exports = router;