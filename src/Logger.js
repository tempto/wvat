const log4js = require('log4js');


class Logger{
  constructor() {
    this.log = log4js.getLogger()
    this.log.level = 'error'
  }

  //if not specified, the verbose level is 'all'
  setVerbose(verboseMode,level = 'all'){
    if(verboseMode){
      this.log.level=level;
    }else{
      this.log.level='error';
    }
  }
}

module.exports = new Logger()
