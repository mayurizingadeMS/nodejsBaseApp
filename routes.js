var express = require('express');
var router = express.Router();
var logger =require('./logs.js').logger;
var dao = require('./dao/productDao.js');

var message = '';
var getAllUpdateBlogChange = 0;

//get all blogs API
router.get('/blogsAPI', function(request, response){
	logger.debug("In router for get url /blogsAPI");
	dao.showAllBlogs(function(error, docs){
		if(error){
			logger.error(error.statusCode);
			response.sendStatus(error);
		}else{
			response.sendStatus(docs);
		}
	});
});

//get blog by Id API
router.get('/blogAPI/:id', function(request, response){
	logger.debug("In router for get url /blogAPI/:id");
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

//add blog API
router.post('/blogAPI', function(request, response){
	logger.debug("In router for post url /blogAPI");
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

//update blog API
router.put('/blogAPI/:id', function(request, response){
	logger.debug("In router for put url /blogAPI/:id");
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

//delete blog API
router.delete('/blogAPI/:id', function(request, response){
	logger.debug("In router for delete url /blogAPI/:id");
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



// now onwords for UI integration

//show getAllBlogs page
router.get('/', function(request, response){
	logger.debug("In router for get url /");
	dao.showAllBlogs(function(error, docs){
		if(error){
			logger.error("Error to load Blogs, Could not connect to database " +error);
			message = "Error to load Blogs, Could not connect to database";
			response.render('getAllBlogs',{
				message : message
			});
		}else{
			if(getAllUpdateBlogChange == 0)
				message = '';
			getAllUpdateBlogChange = 0;
			response.render('getAllBlogs',{
				data : docs,
				message : message
			});
		}
	});
});

//show addBlog page
router.get('/showAddblog', function(request, response){
	logger.debug("In router for get url /showAddblog");
	response.render('addBlog');
});

//add blog to db
router.post('/addBlog', function(request, response){
	logger.debug("In router for post url /addBlog");
	var reqJSON = request.body;
	dao.addBlog(reqJSON, function(error, doc){
		if(error){
			logger.error("Error to load Blogs, Could not connect to database " +error);
			message = "Error to add Blogs, Could not connect to database ";
			response.redirect('/');

		}else{
			message = "Blog Added";
			getAllUpdateBlogChange = 1;
			response.redirect('/');
		}
	});
});

//show update blog page
router.get('/showUpdateView/:id', function(request, response){
	logger.debug("In router for get url /showUpdateView/:id");
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

//update blog to db
router.put('/updateBlog/:id', function(request, response){
	logger.debug("In router for put url /updateBlog/:id");
	var id = request.params.id;
	var reqJSON = request.body;
	dao.updateBlog(id, reqJSON, function(error, doc){
		if(error){
			logger.error("Error to update Blog with id : " + id);
			message = "Error to Update Blog";
			response.redirect('/');
		}else{
			message = "Blog Updated";
			getAllUpdateBlogChange = 1;
			response.redirect('/');
		}
	});
});

//show delete blog page
router.get('/showDeleteView/:id', function(request, response){
	logger.debug("In router for get url /showDeleteView/:id");
	var id = request.params.id;
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

//delete blog from db
router.delete('/deleteBlog/:id', function(request, response){
	logger.debug("In router for delete url /deleteBlog/:id");
	var id = request.params.id;
	dao.deleteBlog(id, function(error, doc){
		if(error){
			logger.error("Error to delete Blog with id : " + id);
			message = "Error to Delete Blog";
			response.redirect('/');
		}else{
			message = "Blog Deleted";
			getAllUpdateBlogChange = 1;
			response.redirect('/');
		}
	});
});

module.exports = router;