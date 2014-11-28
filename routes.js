var express = require('express');
var router = express.Router();
var dao = require('./dao/productDao.js');

router.get('/blogs', dao.showAllBlogs);
router.get('/blog/:id', dao.showBlogById);
router.post('/blog', dao.addBlog);
router.put('/blog/:id', dao.updateBlog);
router.delete('/blog/:id', dao.deleteBlog);

module.exports = router;