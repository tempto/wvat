const Config = require('./Config')

const initCommand = (flags,command,level='all') => {
    Config.addFlags(flags);

    
    const timeoutHandler = require('./TimeoutHandler')(flags,command);

    return [Config, Log];
}

module.exports =  initCommand;

    const Log = (new Logger(flags, level)).getLog();