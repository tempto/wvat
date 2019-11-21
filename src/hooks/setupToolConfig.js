const Config = require("../Config");
const Logger = require("../Logger");
const Errors = require("../errors");
const { toolConfigFileExists, createToolConfigFile, readToolConfigFile } = require("../toolConfig");

Logger.level = "all";

if (!toolConfigFileExists()) {
    try {
        createToolConfigFile();
    } catch (e) {
        Logger.print(Errors.TOOL_CONFIG_WRITING_FAILED.description);
        process.exit(Errors.TOOL_CONFIG_WRITING_FAILED.code);

    }
} else {
    try {
        const tool_config = readToolConfigFile();
        Config.setToolConfiguration(tool_config);
    } catch (e) {
        Logger.print(Errors.TOOL_CONFIG_READING_FAILED.description);
        process.exit(Errors.TOOL_CONFIG_READING_FAILED.code);
    }
}

module.exports = () => {};
