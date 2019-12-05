const fs = require("fs");
const path = require("path");

const TOOL_CONFIG_FILE_NAME = "wvat-config.json";

/**
 * The default schema for the tool's configuration file
 */
const DEFAULT_TOOL_CONFIG_FILE_SCHEMA = {
    allow_data_reporting: false,
    amass_path: path.join(path.dirname(fs.realpathSync(__filename)), "../bin/amass"),
    webtech_command: null,
};

/**
 * Verifies if tool configuration file exists
 * @returns {boolean} true if exists, false otherwise
 */
const toolConfigFileExists = () => fs.existsSync(TOOL_CONFIG_FILE_NAME);

/**
 * Reads the tool's configuration file
 * @throws {Error} Failed to read tool configuration file
 * @returns {Object} Tool configuration file
 */
const readToolConfigFile = () => {
    const file_content = fs.readFileSync(TOOL_CONFIG_FILE_NAME);

    try {
        const tool_config = JSON.parse(file_content);
        if (!tool_config.amass_path) tool_config.amass_path = DEFAULT_TOOL_CONFIG_FILE_SCHEMA.amass_path;
        if (!tool_config.webtech_command) tool_config.webtech_command = DEFAULT_TOOL_CONFIG_FILE_SCHEMA.webtech_command;
        return tool_config;
    } catch (e) {
        throw new Error("Failed to read tool configuration file");
    }
};

/**
 * Creates the tool's configuration file (with default values)
 * @throws {Error} Failed to create tool configuration file
 */
const createToolConfigFile = () => {
    try {
        fs.writeFileSync(TOOL_CONFIG_FILE_NAME, JSON.stringify(DEFAULT_TOOL_CONFIG_FILE_SCHEMA, null, 2));
    } catch (e) {
        throw new Error("Failed to create tool configuration file");
    }
};

module.exports = {
    toolConfigFileExists,
    readToolConfigFile,
    createToolConfigFile,
};
