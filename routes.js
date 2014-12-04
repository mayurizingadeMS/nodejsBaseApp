var express = require('express');
var router = express.Router();
var logger =require('./logs.js').logger;
var dao = require('./dao/productDao.js');

//REST API
var message = '';

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
			message = "Error to load Blogs";
			response.render('/',{
				message : message
			});
		}else{
			response.render('getAllBlogs',{
				data : docs,
				message : message
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
			message = "Error to Add Blog";
			response.redirect('/');

		}else{
			message = "Blog Added";
			response.redirect('/');
		}
	});
});


router.get('/showUpdateView/:id', function(request, response){
	var id = request.params.id;
	dao.showBlogById(id, function(error, doc){
		if(error){
			logger.error("Error to load Blog with id : " + id);
			message = "Error to load Blog with id : " + id;
			response.redirect('/');
		}else{
			response.render('updateBlog',{
				data : doc
			});
		}
	});
});

router.put('/updateBlog/:id', function(request, response){
	var id = request.params.id;
	var reqJSON = request.body;
	dao.updateBlog(id, reqJSON, function(error, doc){
		if(error){
			logger.error("Error to update Blog with id : " + id);
			message = "Error to Update Blog";
			response.redirect('/');
		}else{
			message = "Blog Updated";
			response.redirect('/');
		}
	});
});

router.get('/showDeleteView/:id', function(request, response){
	var id = request.params.id;
	logger.info(id);
	dao.showBlogById(id, function(error, doc){
		if(error){
			logger.error("Error to load Blog with id : " + id);
			message = "Error to load Blog with id : " + id;
			response.redirect('/');
		}else{
			response.render('deleteBlog',{
				data : doc
			});
		}
	});
});

router.delete('/deleteBlog/:id', function(request, response){
	var id = request.params.id;
	dao.deleteBlog(id, function(error, doc){
		if(error){
			logger.error("Error to delete Blog with id : " + id);
			message = "Error to Delete Blog";
			response.redirect('/');
		}else{
			message = "Blog Deleted";
			response.redirect('/');
		}
	});
});

module.exports = router;