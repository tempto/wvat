const log4js = require("log4js");

class Logger {
    constructor(flags, logger_level = "all") {
        if (Logger.instance) {
            return Logger.instance;
        }

        this.log = log4js.getLogger();
        this.log.level = flags.verbose ? logger_level : "error";

        Logger.instance = this;
    }

    getLog() {
        return Logger.instance.log;
    }
}

Logger.instance = null;

module.exports = Logger;
