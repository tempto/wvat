const log4js = require("log4js");

const VERBOSE_MODE_LOGGER_LEVEL = "ALL";
const STANDARD_MODE_LOGGER_LEVEL = "INFO";

const VERBOSE_MODE_IDENTIFIER = "verbose";
const STANDARD_MODE_IDENTIFIER = "standard";

/**
 * log4js wrapper Singleton
 */
class Logger {
    /**
     * Logger constructor
     */
    constructor() {
        this.logger = log4js.getLogger();
        this.logger.level = STANDARD_MODE_LOGGER_LEVEL;
    }

    /**
     * Sets the logger to verbose mode
     */
    setVerboseMode() {
        this.logger.level = VERBOSE_MODE_LOGGER_LEVEL;
    }

    /**
     * Sets the logger to standard mode
     */
    setStandardMode() {
        this.logger.level = STANDARD_MODE_LOGGER_LEVEL;
    }

    /**
     * Gets the current logger mode
     * @returns {String} The current logger mode
     */
    getLoggerMode() {
        return this.logger.level.levelStr === VERBOSE_MODE_LOGGER_LEVEL ? VERBOSE_MODE_IDENTIFIER : STANDARD_MODE_IDENTIFIER;
    }

    /**
     * Checks if the logger is in verbose mode
     * @returns {boolean} true if logger is in verbose mode, false otherwise
     */
    isVerboseMode() {
        return this.logger.level.levelStr === VERBOSE_MODE_LOGGER_LEVEL;
    }

    /**
     * Checks if the logger is in verbose mode
     * @returns {boolean} true if logger is in verbose mode, false otherwise
     */
    isStandardMode() {
        return this.logger.level.levelStr === STANDARD_MODE_LOGGER_LEVEL;
    }

    /**
     * Prints a line in the screen
     * @param {Object} data Data to print
     * @param {boolean} verbose_only Defines if the print should only be done in verbose mode (defaults to false)
     */
    print(data, verbose_only = false) {
        if (verbose_only) {
            this.logger.trace(data);
        } else {
            this.logger.info(data);
        }
    }

    /**
     * Prints an error in the screen
     * @param {Object} data Error data to print
     */
    error(data) {
        this.logger.error(data);
    }

    /**
     * Prints a warning message in the screen
     * @param {Object} data Data to print
     */
    warning(data) {
        this.logger.warn(data);
    }
}

module.exports = new Logger();
