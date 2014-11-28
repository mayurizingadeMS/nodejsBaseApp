var express = require('express');
var logger =require('./logs.js').logger;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/mongoExample');

//add route
app.use(require('./routes.js'));

logger.info("Number of CPUs : "+numCPUs);
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  //When a new worker is forked the cluster module will emit a 'fork' event
  cluster.on('fork', function(worker) {
    logger.debug("worker is created with worker Id : "+worker.id);
  });

  cluster.on('listening', function(worker, address) {
    logger.debug("A worker is now connected to " + address.address + ":" + address.port);
  });

  //When any of the workers die
  cluster.on('exit', function(worker, code, signal) {
    logger.debug('worker ' + worker.process.pid + ' died');
  });
} else {

  var port = process.env.PORT || 1337;
  app.listen(port, function(){    
    logger.debug('ready on port ' + port); 
  });
}