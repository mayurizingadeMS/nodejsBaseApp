var express = require('express');
var logger =require('./logs.js').logger;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mongoExample');

app.use(require('./routes.js'));

var port = process.env.PORT || 1337;
app.listen(port, function(){            //when it listen to port
	console.log('ready on port ' + port); 
	logger.log('error', 'Hello distributed log files!');
    logger.debug('Hello again distributed logs');
    logger.log('info', 'test message %d', 123);
});




