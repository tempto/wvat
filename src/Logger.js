const log4js = require('log4js');

class Logger{
  constructor(flags,level = 'all') {
    this.log = log4js.getLogger()

    //Verbose flag logic (sets the log level accordingly)
    if(flags.VERBOSE){
      this.log.level=level;
    }else{
      this.log.level='error';
    }
  }

  getLog(){
    return this.log;
  }
}


let instance;

//Creates an instance of the singleton with the constructor parameters if it still doesn't exist
module.exports = (flags,level='all') => {
  if(!instance){
    instance=new Logger(flags,level);
  }

  return instance;
}

module.exports.delete = () =>{
  instance = null;
  return;
}
