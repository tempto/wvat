const Config = require("../Config");
const Logger = require("../Logger");
const Errors = require("../errors");
const { initToolConfig } = require("../toolConfig");

Logger.level = "all";

const setupToolConfig = ({ path }) => {
    try {
        const tool_config = initToolConfig(path);
        Config.setToolConfiguration(tool_config);
    } catch (e) {
        Logger.print(Errors.TOOL_CONFIG_READING_FAILED.description);
        process.exit(Errors.TOOL_CONFIG_READING_FAILED.code);
    }
};

module.exports = setupToolConfig;
