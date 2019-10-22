class TimeoutHandler{
  constructor(flags,command){
    if(flags.TIMEOUT){
      setTimeout(this.timeoutFunction, flags.TIMEOUT,command);
    }
  }

  timeoutFunction(command){
    command.log("TIMEOUT REACHED");
    command.exit(1);
  }
}

let instance

//Creates an instance of the singleton with the constructor parameters if it still doesn't exist
module.exports = (flags,command) => {
  if(!instance){
    instance=new TimeoutHandler(flags,command);
  }

  return instance;
}

module.exports.delete = () =>{
  instance = null;
  return;
}
