
exports.loadConfig = function(){
    this.currentEnv = "qa";
  
    //  Log Levels
    this.logLevels = {
        DEBUG: "debug",
        INFO: "info",
        WARNING: "warning",
        ERROR: "error"        
    };
    
   this.environments = {
        // Development Environment
        "development": {
            "currentLogLevel" : this.logLevels.DEBUG
        },

        // QA Environment
        "qa":{ 
            "currentLogLevel" : this.logLevels.INFO
        },

        // Production Environment
        "production":{
            "currentLogLevel" : this.logLevels.ERROR
        }
    };
}