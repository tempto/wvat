/**
 * App configuration
 */
class Config {
    /**
     * Config constructor
     */
    constructor() {
        this.flags = {};
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
     * Resets the flags
     */
    resetFlags() {
        this.flags = {};
    }
}

module.exports = new Config();
