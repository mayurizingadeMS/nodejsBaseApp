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

router.get('/', function(request, response){
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

router.get('/showAddblog', function(request, response){
	response.render('addBlog');
});

router.post('/AddBlog', function(request, response){
	var reqJSON = request.body;
	dao.addBlog(reqJSON, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.render('addBlog',{
				message : "error to add blog"
			});

		}else{
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
		}
	});
});


router.get('/showUpdateView/:id', function(request, response){
	var id = request.params.id;
	dao.showBlogById(id, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.send(error);
		}else{
			response.render('updateBlog',{
				data : doc
			});
		}
	});
});

router.post('/updateBlog/:id', function(request, response){
	var id = request.params.id;
	var reqJSON = request.body;
	dao.updateBlog(id, reqJSON, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.sendStatus(error);
		}else{
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
		}
	});
});

router.get('/showDeleteView/:id', function(request, response){
	var id = request.params.id;
	logger.info(id);
	dao.showBlogById(id, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.send(error);
		}else{
			response.render('deleteBlog',{
				data : doc
			});
		}
	});
});

router.post('/deleteBlog/:id', function(request, response){
	var id = request.params.id;
	dao.deleteBlog(id, function(error, doc){
		if(error){
			logger.error(error.statusCode);
			response.sendStatus(error);
		}else{
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
		}
	});
});

module.exports = router;