const Config = require("./Config");
const handleTimeout = require("./handleTimeout");
const Logger = require("./Logger");

/**
 * Generic command initializations
 * @param {Array} flags Set of flags passed to the tool
 * @param {string} logger_level Level to configure Logger
 * @returns {Array} The app's Config instance and the initialized Logger
 */
const initCommand = (flags) => {
    Config.addFlags(flags);

    if (flags.timeout) {
        handleTimeout(() => process.exit(1), flags.timeout);
    }

    const Log = (new Logger(flags)).getLog();
    return [Config, Log];

};

module.exports = initCommand;
