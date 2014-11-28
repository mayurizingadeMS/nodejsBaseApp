var fs = require('fs');
var winston = require('winston');
var config = require('./config/config.js');

config.loadConfig();
if ( !fs.existsSync( './logs' ) ) {
	// Create the directory if it does not exist
	fs.mkdirSync( './logs' );
}

var customLevels = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  }
};

this.getLogLevel = function(type){
        return config.environments[config.currentEnv].currentLogLevel;
    }

// create the main logger
this.logger = new(winston.Logger)({
    level: 'debug',
    levels: customLevels.levels,
    transports: [
        new(winston.transports.Console)({
            level: this.getLogLevel(), // Only write logs of info level or higher
            levels: customLevels.levels,
            colorize: true,
            timestamp: true
        }),
        new(winston.transports.File)({
            filename: './logs/BaseApp.log',
            maxsize: 1024 * 1024 * 1, // 1MB
            level: this.getLogLevel(),
            levels: customLevels.levels
        })
    ]
});

winston.addColors(customLevels.colors);