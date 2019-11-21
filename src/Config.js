/**
 * App configuration
 */
class Config {
    /**
     * Config constructor
     */
    constructor() {
        this.flags = {};
        this.tool_config = {};
    }

    /**
     * Adds a set of flags to the app's current Configuration
     * @param {flag} flags Flags object
     */
    addFlags(flags) {
        this.flags = {
            ...this.flags,
            ...flags,
        };
    }

    /**
     * Sets the tool configuration object
     * @param {Object} tool_config Configuration read from the tool's configuration JSON file
     */
    setToolConfiguration(tool_config) {
        this.tool_config = tool_config;
    }

    /**
     * Resets the flags
     */
    resetFlags() {
        this.flags = {};
    }

    /**
     * Resets the tool configiguration
     */
    resetToolConfiguration() {
        this.tool_config = {};
    }
}

module.exports = new Config();
