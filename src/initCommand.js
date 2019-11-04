const Config = require("./Config");
const handleTimeout = require("./handleTimeout");
const Logger = require("./Logger");

const initCommand = (flags, logger_level = "all") => {
    Config.addFlags(flags);

    if (flags.timeout) {
        handleTimeout(() => process.exit(1), flags.timeout);
    }

    const Log = (new Logger(flags, logger_level)).getLog();
    return [Config, Log];

};

module.exports = initCommand;
