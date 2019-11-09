const log4js = require("log4js");

/**
 * log4js wrapper Singleton
 */
class Logger {
    /**
     * Logger constructor
     * @param {Array} flags Set of flags passed to the tool
     * @param {string} logger_level Level to configure Logger
     */
    constructor(flags, logger_level = "all") {
        if (Logger.instance) {
            return Logger.instance;
        }

        this.log = log4js.getLogger();
        this.log.level = flags.verbose ? logger_level : "error";

        Logger.instance = this;
    }

    /**
     * Gets the log4js logger instance
     * @returns {Logger} log4js logger instance
     */
    getLog() {
        return Logger.instance.log;
    }
}

Logger.instance = null;

module.exports = Logger;
