//Import Config singleton object
const Config = require('./Config')

//Executed in all commands to load configurations and logger
const initCommand = (flags,level='all') => {
    //Set flags to Config, so that they can be accessed from other modules
    Config.addFlags(flags);

    //Sets log level of logger based on the verbose setting
    const Log = require('./Logger')(flags,level).getLog();
    return [Config, Log];
}

module.exports =  initCommand;
