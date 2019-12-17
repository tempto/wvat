const fs = require("fs");
const path = require("path");

/**
 * The default schema for the tool's configuration file
 */
const DEFAULT_CONFIG = Object.freeze({
    allow_data_reporting: false,
    amass_path: path.join(path.dirname(fs.realpathSync(__filename)), "../bin/amass"),
    webtech_command: null,
});

/**
 * Reads the tool's configuration file
 * @throws {Error} Failed to read tool configuration file
 * @returns {Object} Tool configuration file
 */
const initToolConfig = (path) => {
    let configs = DEFAULT_CONFIG;
    try {
        if (path) configs = {
            ...configs,
            ...JSON.parse(fs.readFileSync(path)),
        };

        return configs;
    } catch (e) {
        throw new Error("Failed to read tool configuration file");
    }
};

module.exports = {
    initToolConfig,
};
